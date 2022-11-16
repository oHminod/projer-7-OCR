import React, { useEffect } from "react";
import { useSocket } from "../contexts/SocketContext";
import NewPostsListener from "./socketListeners/NewPostsListener";
import NewUserInfoListener from "./socketListeners/NewUserInfoListener";
import PostDeleted from "./socketListeners/PostDeleted";
import PropageContentDeleteListener from "./socketListeners/PropageContentDeleteListener";
import UpdatePostsListener from "./socketListeners/UpdatePostListener";

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
            <UpdatePostsListener />
            <PropageContentDeleteListener />
            <PostDeleted />
        </>
    );
};

export default GlobalSocketListener;
