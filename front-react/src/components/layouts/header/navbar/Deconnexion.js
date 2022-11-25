import React from "react";
import { useNavigate } from "react-router-dom";
import { MPACTIONS } from "../../../contexts/actions/myPosts";
import { NPACTIONS } from "../../../contexts/actions/newPosts";
import { PACTIONS } from "../../../contexts/actions/posts";
import { UIACTIONS } from "../../../contexts/actions/usersInfo";
import { useAuthUpdate } from "../../../contexts/AuthContext";
import { useMyPostsUpdate } from "../../../contexts/MyPostsContext";
import { useNewPostsUpdate } from "../../../contexts/NewPostsContext";
import {
    useMyOldestPostUpdate,
    useOldestPostUpdate,
} from "../../../contexts/OldestPostContext";
import { usePostsUpdate } from "../../../contexts/PostsContext";
import { useSocket } from "../../../contexts/SocketContext";
import { useUserUpdate } from "../../../contexts/UserContext";
import { useUsersInfoUpdate } from "../../../contexts/UsersInfoContext";
import "./Deconnexion.scss";

const Deconnexion = () => {
    const setToken = useAuthUpdate();
    const setUser = useUserUpdate();
    const dispatchMyPosts = useMyPostsUpdate();
    const dispatchPosts = usePostsUpdate();
    const dispatchNewPosts = useNewPostsUpdate();
    const dispatchUsersInfo = useUsersInfoUpdate();
    const setMyOldestPost = useMyOldestPostUpdate();
    const setOldestPost = useOldestPostUpdate();

    const navigate = useNavigate();
    const socket = useSocket();

    const deconnexion = () => {
        setToken("");
        setUser("");
        dispatchNewPosts({
            type: NPACTIONS.DELETE_NEW_POSTS,
        });
        dispatchMyPosts({
            type: MPACTIONS.DELETE_MY_POSTS,
        });
        dispatchPosts({
            type: PACTIONS.DELETE_POSTS,
        });
        dispatchUsersInfo({
            type: UIACTIONS.DELETE_USERS,
        });
        setMyOldestPost("");
        setOldestPost("");
        socket.disconnect();
        navigate("/login");
    };

    return (
        <button
            className="Deconnexion"
            onClick={deconnexion}
            title="Déconnexion"
        >
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
        </button>
    );
};

export default Deconnexion;
