import React from "react";
import NewPostsListener from "./socketListeners/NewPostsListener";
import NewUserInfoListener from "./socketListeners/NewUserInfoListener";
import PostDeleted from "./socketListeners/PostDeleted";
import PropageContentDeleteListener from "./socketListeners/PropageContentDeleteListener";
import TestListener from "./socketListeners/TestListener";
import UpdatePostsListener from "./socketListeners/UpdatePostListener";

const GlobalSocketListener = () => {
    return (
        <>
            <NewPostsListener />
            <NewUserInfoListener />
            <UpdatePostsListener />
            <PropageContentDeleteListener />
            <PostDeleted />
            <TestListener />
        </>
    );
};

export default GlobalSocketListener;
