import React, { useEffect, useState } from "react";
import { likerPost } from "../../../../../utils/axiosCalls";
import { useAuth } from "../../../../context/AuthContext";
import {
    useMyPosts,
    useMyPostsUpdate,
} from "../../../../context/MyPostsContext";
import { usePosts, usePostsUpdate } from "../../../../context/PostsContext";
import { useUser } from "../../../../context/UserContext";
import { usePost, usePostUpdate } from "../../PostContext";
import { io } from "socket.io-client";
let socket = io("http://localhost:36600");

const Likes = () => {
    const [actif, setActif] = useState(false);
    const user = useUser();
    const token = useAuth();
    const thisPost = usePost();
    const setThisPost = usePostUpdate();
    const allPosts = usePosts();
    const setAllPosts = usePostsUpdate();
    const allMyPosts = useMyPosts();
    const setAllMyPosts = useMyPostsUpdate();

    useEffect(() => {
        thisPost &&
            user &&
            thisPost.usersLiked.includes(user._id) &&
            setActif(true);
    }, [thisPost, user]);

    useEffect(() => {
        thisPost && +thisPost.likes === 0 && setActif(false);
    }, [thisPost]);

    const handelClick = () => {
        setActif(!actif);
        let postObj = { ...thisPost };

        let allPostsCopy = [...allPosts];
        let allMyPostsCopy = [];

        const thisPostIndex = allPostsCopy
            .map((post) => post._id)
            .indexOf(thisPost._id);
        let userIndex = postObj.usersLiked.indexOf(user._id);

        if (thisPost && actif) {
            postObj = { ...postObj, likes: thisPost.likes - 1 };
            postObj.usersLiked.splice(userIndex, 1);
        } else {
            postObj = { ...postObj, likes: thisPost.likes + 1 };
            postObj.usersLiked.push(user._id);
        }
        if (thisPost.userId === user._id) {
            allMyPostsCopy = [...allMyPosts];
            const thisMyPostIndex = allMyPostsCopy
                .map((post) => post._id)
                .indexOf(thisPost._id);
            allMyPostsCopy[thisMyPostIndex] = postObj;

            setAllMyPosts(allMyPostsCopy);
        }
        allPostsCopy[thisPostIndex] = postObj;
        setAllPosts(allPostsCopy);
        setThisPost(postObj);
        socket.emit("likeAndLoves", postObj);

        let obj = {};
        actif ? (obj.like = "0") : (obj.like = "1");

        thisPost && actif
            ? likerPost(token, thisPost._id, obj)
            : likerPost(token, thisPost._id, obj);
    };

    return (
        <button
            onClick={handelClick}
            className={actif ? "likes actif" : "likes"}
        >
            {thisPost && (
                <i className="fa-regular fa-thumbs-up">
                    &nbsp;&nbsp;{thisPost.likes !== 0 && thisPost.likes}
                </i>
            )}
        </button>
    );
};

export default Likes;
