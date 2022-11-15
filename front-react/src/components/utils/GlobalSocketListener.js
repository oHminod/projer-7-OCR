import React, { useEffect } from "react";
import { useSocket } from "../contexts/SocketContext";
import NewPostsListener from "./socketListeners/NewPostsListener";
import NewUserInfoListener from "./socketListeners/NewUserInfoListener";

const GlobalSocketListener = () => {
    const socket = useSocket();

    useEffect(() => {
        socket &&
            socket.on("connect", () => {
                console.log(`connecté avec l'id ${socket.id}`);
            });
    }, [socket]);
    return (
        <>
            <NewPostsListener />
            <NewUserInfoListener />
        </>
    );
};

export default GlobalSocketListener;
