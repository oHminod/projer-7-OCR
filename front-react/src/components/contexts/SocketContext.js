import React, { useState, createContext, useContext, useEffect } from "react";
import { useAuth } from "./AuthContext";
import socketio from "socket.io-client";
import { useUser } from "./UserContext";
const API_URL = process.env.REACT_APP_API_URL;

export const SocketContext = createContext();

export function useSocket() {
    return useContext(SocketContext);
}

export function SocketProvider({ children }) {
    const [socket, setSocket] = useState();
    const [disconnected, setDisconnected] = useState(true);
    const token = useAuth();
    const user = useUser();

    useEffect(() => {
        token !== "" &&
            user &&
            disconnected &&
            setSocket(
                socketio.connect(API_URL, {
                    transportOptions: {
                        polling: {
                            extraHeaders: {
                                Authorization: `Bearer ${token}`,
                                userid: user._id,
                            },
                        },
                    },
                })
            );
    }, [token, user, disconnected]);

    useEffect(() => {
        token === "" ? setDisconnected(true) : setDisconnected(false);
    }, [token]);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
}

export default SocketProvider;
