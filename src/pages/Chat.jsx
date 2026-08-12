import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { PiPaperPlaneRightFill, PiArrowLeftBold, PiArrowClockwiseBold } from "react-icons/pi";
import { useLocation, useNavigate } from "react-router-dom";
import { connectSocket, emitWithTimeout } from "../services/socket/socket";

function decodeJwtPayload(token) {
    try {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split("")
                .map((c) => "%" + c.charCodeAt(0).toString(16).padStart(2, "0"))
                .join("")
        );
        return JSON.parse(jsonPayload);
    } catch {
        return null;
    }
}

function getOwnUserIdFromToken() {
    const token = localStorage.getItem("token");
    if (!token) return null;
    const payload = decodeJwtPayload(token);
    if (!payload) return null;
    return payload.id || payload._id || payload.userId || payload.sub || null;
}

export default function Chat() {
    const location = useLocation();
    const navigate = useNavigate();
    const targetUser = location.state?.targetUser;
    const initialChatId = location.state?.chatId || null;

    const [chatId, setChatId] = useState(initialChatId);
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [loadTimedOut, setLoadTimedOut] = useState(false);
    const [isOnline, setIsOnline] = useState(false);
    const [lastSeen, setLastSeen] = useState(null);
    const [retryTick, setRetryTick] = useState(0);
    const bottomRef = useRef(null);
    const socketRef = useRef(null);
    const ownUserId = useRef(getOwnUserIdFromToken());

    // Mirrors `chatId` state into a ref so socket event handlers registered
    // inside the effect below always read the CURRENT chatId instead of
    // the value that was in scope when the effect last ran. Without this,
    // handleReceiveMessage's `chatId` comparison went stale as soon as
    // setChatId() fired from an incoming message, because chatId is
    // intentionally left out of the effect's dependency array (re-running
    // it would re-subscribe listeners and re-fetch messages every time).
    const chatIdRef = useRef(chatId);
    useEffect(() => {
        chatIdRef.current = chatId;
    }, [chatId]);

    const retryLoad = () => setRetryTick((t) => t + 1);

    useEffect(() => {
        if (!targetUser?._id) {
            setErrorMsg("No conversation selected.");
            setLoading(false);
            return;
        }

        const socket = connectSocket();
        if (!socket) {
            setErrorMsg("You are not logged in.");
            setLoading(false);
            return;
        }
        socketRef.current = socket;

        let cancelled = false;
        setLoading(true);
        setErrorMsg("");
        setLoadTimedOut(false);

        const loadMessages = () => {
            if (!chatIdRef.current) {
                setLoading(false);
                return;
            }
            setLoading(true);
            setLoadTimedOut(false);
            emitWithTimeout("getMessages", { chatId: chatIdRef.current }, 10000)
                .then((response) => {
                    if (!cancelled) setMessages(response?.messages || []);
                })
                .catch((err) => {
                    console.error("[getMessages]", err.message);
                    // A timeout here doesn't mean the chat is broken — it
                    // usually clears up on its own. Offer a retry instead
                    // of a hard error so the person isn't stuck.
                    if (!cancelled) setLoadTimedOut(true);
                })
                .finally(() => {
                    if (!cancelled) setLoading(false);
                });
        };

        const loadStatus = () => {
            emitWithTimeout("getUserStatus", { targetUserId: targetUser._id }, 10000)
                .then((res) => {
                    if (cancelled) return;
                    setIsOnline(!!res?.isOnline);
                    setLastSeen(res?.lastSeen || null);
                })
                .catch((err) => console.error("[getUserStatus]", err.message));
        };

        loadMessages();
        loadStatus();

        const handleReceiveMessage = (message) => {
            const currentChatId = chatIdRef.current;
            const belongsHere =
                message.senderId === targetUser._id ||
                message.receiverId === targetUser._id ||
                (currentChatId && message.chatId === currentChatId);
            if (!belongsHere) return;

            setMessages((prev) => {
                if (message._id && prev.some((m) => m._id === message._id)) {
                    return prev;
                }
                return [...prev, message];
            });

            if (!currentChatId && message.chatId) {
                setChatId(message.chatId);
            }
        };

        const handleStatusChange = (data) => {
            if (data.userId !== targetUser._id) return;
            setIsOnline(!!data.isOnline);
            setLastSeen(data.lastSeen || null);
        };

        // Re-fetch messages/status after the underlying transport drops and
        // reconnects (see socket.js reconnection options), so nothing sent
        // while the connection was down is silently missed.
        const handleReconnect = () => {
            if (cancelled) return;
            console.log("[Chat] socket reconnected, refreshing data");
            loadMessages();
            loadStatus();
        };

        socket.on("receiveMessage", handleReceiveMessage);
        socket.on("userStatusChanged", handleStatusChange);
        socket.io.on("reconnect", handleReconnect);

        return () => {
            cancelled = true;
            socket.off("receiveMessage", handleReceiveMessage);
            socket.off("userStatusChanged", handleStatusChange);
            socket.io.off("reconnect", handleReconnect);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [targetUser?._id, retryTick]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = () => {
        const trimmed = text.trim();
        if (!trimmed || sending || !targetUser?._id) return;

        const socket = socketRef.current;
        if (!socket) return;

        setSending(true);
        emitWithTimeout("sendMessage", { receiverId: targetUser._id, message: trimmed }, 10000)
            .then((response) => {
                if (response?.success === false) {
                    setErrorMsg(response?.message || "Could not send message.");
                    return;
                }
                const sentMessage = response?.data || response?.message || {
                    message: trimmed,
                    senderId: ownUserId.current,
                    createdAt: new Date().toISOString(),
                };
                setMessages((prev) => {
                    if (sentMessage._id && prev.some((m) => m._id === sentMessage._id)) {
                        return prev;
                    }
                    return [...prev, sentMessage];
                });
                if (!chatIdRef.current && response?.chatId) {
                    setChatId(response.chatId);
                }
                setText("");
            })
            .catch((err) => {
                console.error("[sendMessage]", err.message);
                // Keep the typed text in the input so nothing is lost —
                // the person can just hit send again once the server
                // catches up.
                setErrorMsg("Message didn't go through. Your text is still here — try sending again.");
            })
            .finally(() => setSending(false));
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const formatLastSeen = (iso) => {
        if (!iso) return "";
        try {
            return new Date(iso).toLocaleString();
        } catch {
            return "";
        }
    };

    if (errorMsg && !targetUser) {
        return (
            <section className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-4 px-4">
                <p className="text-gray-300">{errorMsg}</p>
                <button
                    onClick={() => navigate("/chats")}
                    className="rounded-full bg-[#DAB25A] hover:bg-[#c99f47] text-black font-bold px-6 py-2.5 transition-all active:scale-95"
                >
                    Back to Chats
                </button>
            </section>
        );
    }

    return (
        <section className="relative min-h-screen overflow-hidden bg-[#000000] text-white flex flex-col">
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[#DAB25A]/10 blur-3xl animate-pulse" />
            </div>

            <div className="flex items-center gap-3 border-b border-[#DAB25A]/15 bg-black/80 backdrop-blur-md px-4 py-4 sticky top-0 z-10 mt-16">
                <button
                    onClick={() => navigate("/chats")}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-gray-300 hover:border-[#DAB25A] hover:text-[#DAB25A] transition-all"
                >
                    <PiArrowLeftBold />
                </button>

                <div className="relative h-10 w-10 rounded-full overflow-hidden shrink-0">
                    <img
                        src={targetUser?.profilePic || "https://via.placeholder.com/100"}
                        alt={targetUser?.name || targetUser?.fullName}
                        className="h-full w-full object-cover"
                    />
                    {isOnline && (
                        <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-400 border-2 border-black" />
                    )}
                </div>

                <div className="flex-1 min-w-0">
                    <p className="font-semibold text-white truncate">
                        {targetUser?.name || targetUser?.fullName}
                    </p>
                    <p className="text-xs text-gray-400 truncate">
                        {isOnline ? "Online" : lastSeen ? `Last seen ${formatLastSeen(lastSeen)}` : ""}
                    </p>
                </div>
            </div>

            {errorMsg && targetUser && (
                <p className="relative mx-4 mt-3 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-2.5 text-center text-sm text-red-400">
                    {errorMsg}
                </p>
            )}

            <div className="relative flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
                {loading ? (
                    <div className="flex flex-col items-center gap-3 mt-10">
                        <motion.div
                            className="h-6 w-6 rounded-full border-2 border-[#DAB25A]/30 border-t-[#DAB25A]"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                        />
                        <p className="text-gray-400 text-sm">Loading messages...</p>
                    </div>
                ) : loadTimedOut ? (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mx-auto mt-10 max-w-xs rounded-2xl border border-[#DAB25A]/20 bg-neutral-950/70 px-6 py-8 text-center"
                    >
                        <p className="text-gray-300 mb-1">Taking longer than usual to load.</p>
                        <p className="text-gray-500 text-sm mb-4">
                            Your connection is fine — the server's just slow to respond.
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.94 }}
                            onClick={retryLoad}
                            className="inline-flex items-center gap-2 rounded-full bg-[#DAB25A] text-black font-semibold px-5 py-2.5 text-sm"
                        >
                            <PiArrowClockwiseBold /> Try again
                        </motion.button>
                    </motion.div>
                ) : messages.length === 0 ? (
                    <p className="text-center text-gray-500 mt-6">Say hello to start the conversation 👋</p>
                ) : (
                    messages.map((msg, i) => {
                        const isMine =
                            !!ownUserId.current && msg.senderId === ownUserId.current;
                        return (
                            <motion.div
                                key={msg._id || i}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm ${isMine
                                    ? "self-end bg-[#DAB25A] text-black"
                                    : "self-start bg-neutral-900 text-gray-200 border border-white/10"
                                    }`}
                            >
                                {msg.message}
                            </motion.div>
                        );
                    })
                )}
                <div ref={bottomRef} />
            </div>

            <div className="relative border-t border-[#DAB25A]/15 bg-black/80 backdrop-blur-md px-4 py-3 flex items-center gap-3">
                <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a message..."
                    className="flex-1 bg-neutral-900 border border-white/10 focus:border-[#DAB25A]/60 outline-none text-white placeholder-gray-500 px-4 py-2.5 rounded-full transition-colors"
                />
                <button
                    onClick={handleSend}
                    disabled={sending || !text.trim()}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#DAB25A] hover:bg-[#c99f47] text-black transition-all active:scale-90 disabled:opacity-60"
                >
                    {sending ? (
                        <motion.span
                            className="h-4 w-4 rounded-full border-2 border-black/30 border-t-black"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}
                        />
                    ) : (
                        <PiPaperPlaneRightFill />
                    )}
                </button>
            </div>
        </section>
    );
}