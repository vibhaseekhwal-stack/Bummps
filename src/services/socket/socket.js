import { io } from "socket.io-client";

const SOCKET_URL = "https://datingapp-oz22.onrender.com";

let socket = null;

export const connectSocket = () => {
    const token = localStorage.getItem("token");

    if (!token) {
        console.error("[socket] No token found");
        return null;
    }

    if (socket) {
        return socket;
    }

    socket = io(SOCKET_URL, {
        auth: {
            token,
        },
        transports: ["polling"],
        upgrade: false,
        timeout: 20000,
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
    });

    socket.on("connect", () => {
        console.log("[socket] connected:", socket.id);
    });

    socket.on("connect_error", (err) => {
        console.error("[socket] connect_error:", err.message);
    });

    socket.on("disconnect", (reason) => {
        console.warn("[socket] disconnected:", reason);

        if (reason === "io server disconnect") {
            socket = null;
        }
    });

    socket.on("reconnect_failed", () => {
        console.error("[socket] reconnect_failed");
        socket = null;
    });

    return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
    if (socket) {
        socket.removeAllListeners();
        socket.disconnect();
        socket = null;
    }
};

export const emitWithTimeout = (event, data, timeoutMs = 15000) => {
    return new Promise((resolve, reject) => {
        const s = getSocket();

        if (!s) {
            reject(new Error("Socket not initialized"));
            return;
        }

        const emitEvent = () => {
            let settled = false;

            const timer = setTimeout(() => {
                if (!settled) {
                    settled = true;
                    reject(
                        new Error(
                            `"${event}" timed out after ${timeoutMs}ms`
                        )
                    );
                }
            }, timeoutMs);

            s.emit(event, data, (response) => {
                if (!settled) {
                    settled = true;
                    clearTimeout(timer);
                    resolve(response);
                }
            });
        };

        if (s.connected) {
            emitEvent();
        } else {
            const onConnect = () => {
                s.off("connect", onConnect);
                emitEvent();
            };

            s.once("connect", onConnect);

            const onError = (err) => {
                s.off("connect_error", onError);
                s.off("connect", onConnect);
                reject(err);
            };

            s.once("connect_error", onError);
        }
    });
};