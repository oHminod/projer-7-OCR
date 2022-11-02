import React, { useState, createContext, useContext, useEffect } from "react";
import { useAuth } from "./AuthContext";
import socketio from "socket.io-client";

export const SocketContext = createContext();

export function useSocket() {
    return useContext(SocketContext);
}

export function SocketProvider({ children }) {
    const [socket, setSocket] = useState();
    const token = useAuth();

    useEffect(() => {
        token &&
            setSocket(
                socketio.connect("http://localhost:36600", {
                    transportOptions: {
                        polling: {
                            extraHeaders: {
                                Authorization: `Bearer ${token}`,
                            },
                        },
                    },
                })
            );
    }, [token]);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
}

export default SocketProvider;
