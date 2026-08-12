import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PiChatCircleFill, PiMapPinFill, PiArrowClockwiseBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { connectSocket, emitWithTimeout } from "../services/socket/socket";

export default function ChatList() {
    const [newMatches, setNewMatches] = useState([]);
    const [chats, setChats] = useState([]);
    const [onlineMap, setOnlineMap] = useState({});
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState("");
    const [timedOut, setTimedOut] = useState(false);
    const [retryTick, setRetryTick] = useState(0);
    const navigate = useNavigate();

    const retry = useCallback(() => {
        setRetryTick((t) => t + 1);
    }, []);

    useEffect(() => {
        const socket = connectSocket();
        if (!socket) {
            setErrorMsg("You are not logged in.");
            setLoading(false);
            return;
        }

        let cancelled = false;
        setLoading(true);
        setErrorMsg("");
        setTimedOut(false);

        const fetchChats = async () => {
            if (cancelled) return;
            setErrorMsg("");
            setTimedOut(false);
            setLoading(true);

            const [matchesResult, chatsResult] = await Promise.allSettled([
                emitWithTimeout("getNewMatches", {}, 10000),
                emitWithTimeout("getChats", {}, 10000),
            ]);

            if (cancelled) return;

            let anyTimeout = false;

            if (matchesResult.status === "fulfilled") {
                setNewMatches(matchesResult.value?.matches || []);
            } else {
                console.error("[getNewMatches]", matchesResult.reason?.message);
                anyTimeout = true;
            }

            if (chatsResult.status === "fulfilled") {
                setChats(chatsResult.value?.chats || []);
            } else {
                console.error("[getChats]", chatsResult.reason?.message);
                anyTimeout = true;
            }

            // Don't show a scary "backend broke" message in the UI — log the
            // real reason for debugging, but present something the person
            // can act on (retry) instead of an error that implies the app
            // is broken.
            setTimedOut(anyTimeout);
            setLoading(false);
        };

        // Named handler so it can be removed in cleanup — an anonymous
        // function passed straight to socket.on() can never be off()'d,
        // which was leaking a new connect_error listener on every
        // remount/retry.
        const handleConnectError = () => {
            if (cancelled) return;
            setErrorMsg("Could not connect to the server. Please check your connection and try again.");
            setLoading(false);
        };

        // Handler for when the underlying transport reconnects after a
        // drop (see socket.js reconnection settings). Re-fetches data so
        // the list doesn't go stale while the connection was down.
        const handleReconnect = () => {
            if (cancelled) return;
            console.log("[ChatList] socket reconnected, refreshing data");
            fetchChats();
        };

        if (socket.connected) {
            fetchChats();
        } else {
            // once(), not on(): this socket instance is a module-level
            // singleton that can go through multiple connect/disconnect
            // cycles over its lifetime. Using on() here meant fetchChats
            // re-fired on every single reconnect, on top of already being
            // triggered by handleReconnect below — causing duplicate
            // in-flight requests and UI flicker.
            socket.once("connect", fetchChats);
            socket.on("connect_error", handleConnectError);
        }

        // socket.io (the Manager) emits "reconnect" after a drop, separate
        // from the per-socket "connect" event used for the very first
        // handshake above.
        socket.io.on("reconnect", handleReconnect);

        const handleReceiveMessage = (message) => {
            setChats((prev) => {
                const idx = prev.findIndex((c) => c._id === message.chatId);
                if (idx === -1) return prev;
                const updated = [...prev];
                updated[idx] = {
                    ...updated[idx],
                    lastMessage: message.message,
                    updatedAt: new Date().toISOString(),
                };
                return updated;
            });
        };

        const handleStatusChange = (data) => {
            setOnlineMap((prev) => ({
                ...prev,
                [data.userId]: { isOnline: data.isOnline, lastSeen: data.lastSeen },
            }));
        };

        socket.on("receiveMessage", handleReceiveMessage);
        socket.on("userStatusChanged", handleStatusChange);

        return () => {
            cancelled = true;
            socket.off("receiveMessage", handleReceiveMessage);
            socket.off("userStatusChanged", handleStatusChange);
            socket.off("connect", fetchChats);
            socket.off("connect_error", handleConnectError);
            socket.io.off("reconnect", handleReconnect);
        };
    }, [retryTick]);

    const openChatWithMatch = (match) => {
        navigate("/chat", { state: { targetUser: match } });
    };

    const openExistingChat = (chat) => {
        const otherUser = chat.participant || chat.user || chat.otherUser;
        navigate("/chat", { state: { chatId: chat._id, targetUser: otherUser } });
    };

    const showEmptyMatches = newMatches.length === 0;
    const showEmptyChats = chats.length === 0;

    return (
        <section className="relative min-h-screen overflow-hidden bg-[#000000] text-white px-4 py-16 sm:py-20">
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -top-24 -left-24 h-72 w-72 sm:h-96 sm:w-96 rounded-full bg-[#DAB25A]/10 blur-3xl animate-pulse" />
                <div className="absolute top-40 -right-20 h-80 w-80 sm:h-96 sm:w-96 rounded-full bg-[#DAB25A]/15 blur-3xl animate-pulse [animation-delay:2s]" />
            </div>

            <div className="relative max-w-2xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                        Chats
                    </h1>
                    {!loading && (
                        <motion.button
                            whileHover={{ scale: 1.06, rotate: 90 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={retry}
                            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-gray-300 hover:border-[#DAB25A] hover:text-[#DAB25A] transition-colors"
                            title="Refresh"
                        >
                            <PiArrowClockwiseBold />
                        </motion.button>
                    )}
                </div>

                {errorMsg && (
                    <p className="mb-6 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-2.5 text-center text-sm text-red-400">
                        {errorMsg}
                    </p>
                )}

                {loading ? (
                    <div className="flex flex-col items-center gap-3 py-10">
                        <motion.div
                            className="h-6 w-6 rounded-full border-2 border-[#DAB25A]/30 border-t-[#DAB25A]"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                        />
                        <p className="text-gray-400 text-sm">Loading chats...</p>
                    </div>
                ) : (
                    <>
                        {timedOut && showEmptyMatches && showEmptyChats && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mb-8 rounded-2xl border border-[#DAB25A]/20 bg-neutral-950/70 px-6 py-8 text-center"
                            >
                                <p className="text-gray-300 mb-1">Taking longer than usual to load.</p>
                                <p className="text-gray-500 text-sm mb-4">
                                    Your connection is fine — the server's just slow to respond.
                                </p>
                                <motion.button
                                    whileHover={{ scale: 1.04 }}
                                    whileTap={{ scale: 0.94 }}
                                    onClick={retry}
                                    className="inline-flex items-center gap-2 rounded-full bg-[#DAB25A] text-black font-semibold px-5 py-2.5 text-sm"
                                >
                                    <PiArrowClockwiseBold /> Try again
                                </motion.button>
                            </motion.div>
                        )}

                        {!showEmptyMatches && (
                            <div className="mb-10">
                                <h2 className="text-sm font-bold text-[#DAB25A] uppercase tracking-wider mb-4">
                                    New Matches
                                </h2>
                                <div className="flex gap-4 overflow-x-auto pb-2">
                                    {newMatches.map((match) => (
                                        <motion.button
                                            key={match._id}
                                            whileHover={{ y: -4 }}
                                            onClick={() => openChatWithMatch(match)}
                                            className="flex flex-col items-center gap-2 shrink-0 w-20"
                                        >
                                            <div className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-[#DAB25A]">
                                                <img
                                                    src={match.profilePic || "https://via.placeholder.com/100"}
                                                    alt={match.name || match.fullName}
                                                    className="h-full w-full object-cover"
                                                />
                                                {onlineMap[match._id]?.isOnline && (
                                                    <span className="absolute bottom-0.5 right-0.5 h-3 w-3 rounded-full bg-green-400 border-2 border-black" />
                                                )}
                                            </div>
                                            <p className="text-xs text-gray-300 truncate w-full text-center">
                                                {match.name || match.fullName}
                                            </p>
                                        </motion.button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {!(timedOut && showEmptyMatches && showEmptyChats) && (
                            <div>
                                <h2 className="text-sm font-bold text-[#DAB25A] uppercase tracking-wider mb-4">
                                    Messages
                                </h2>

                                {showEmptyChats ? (
                                    <p className="text-center text-gray-400 py-10">No conversations yet.</p>
                                ) : (
                                    <div className="flex flex-col gap-2">
                                        {chats.map((chat) => {
                                            const otherUser = chat.participant || chat.user || chat.otherUser || {};
                                            const isOnline = onlineMap[otherUser._id]?.isOnline;
                                            return (
                                                <motion.button
                                                    key={chat._id}
                                                    whileHover={{ x: 4 }}
                                                    onClick={() => openExistingChat(chat)}
                                                    className="flex items-center gap-4 rounded-2xl border border-[#DAB25A]/15 bg-neutral-950/70 hover:bg-neutral-900 px-4 py-3 text-left transition-all"
                                                >
                                                    <div className="relative h-12 w-12 rounded-full overflow-hidden shrink-0">
                                                        <img
                                                            src={otherUser.profilePic || "https://via.placeholder.com/100"}
                                                            alt={otherUser.name || otherUser.fullName}
                                                            className="h-full w-full object-cover"
                                                        />
                                                        {isOnline && (
                                                            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-400 border-2 border-black" />
                                                        )}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="font-semibold text-white truncate">
                                                            {otherUser.name || otherUser.fullName}
                                                        </p>
                                                        <p className="text-sm text-gray-400 truncate">
                                                            {chat.lastMessage || "Say hello 👋"}
                                                        </p>
                                                    </div>
                                                    <PiChatCircleFill className="text-[#DAB25A] text-lg shrink-0" />
                                                </motion.button>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        )}
                    </>
                )}
            </div>
        </section>
    );
}