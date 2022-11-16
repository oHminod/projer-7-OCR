import React, { useState, createContext, useContext, useEffect } from "react";
import { useAuth } from "./AuthContext";
import socketio from "socket.io-client";
const API_URL = process.env.REACT_APP_API_URL;

export const SocketContext = createContext();

export function useSocket() {
    return useContext(SocketContext);
}

export function SocketProvider({ children }) {
    const [socket, setSocket] = useState();
    const [disconnected, setDisconnected] = useState(true);
    const token = useAuth();

    useEffect(() => {
        token &&
            disconnected &&
            setSocket(
                socketio.connect(API_URL, {
                    transportOptions: {
                        polling: {
                            extraHeaders: {
                                Authorization: `Bearer ${token}`,
                            },
                        },
                    },
                })
            );
        token && setDisconnected(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
}

export default SocketProvider;
