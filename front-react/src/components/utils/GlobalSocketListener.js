import React from "react";
import NewPostsListener from "./socketListeners/NewPostsListener";
import NewUserInfoListener from "./socketListeners/NewUserInfoListener";
import PostDeleted from "./socketListeners/PostDeleted";
import PropageContentDeleteListener from "./socketListeners/PropageContentDeleteListener";
import UpdateMyInfoListener from "./socketListeners/UpdateMyInfoListener";
import UpdatePostsListener from "./socketListeners/UpdatePostListener";

const GlobalSocketListener = () => {
    return (
        <>
            <NewPostsListener />
            <NewUserInfoListener />
            <UpdatePostsListener />
            <PropageContentDeleteListener />
            <PostDeleted />
            <UpdateMyInfoListener />
        </>
    );
};

export default GlobalSocketListener;
