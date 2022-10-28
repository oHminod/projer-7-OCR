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

const Likes = () => {
    const [actif, setActif] = useState(false);
    const user = useUser();
    const token = useAuth();
    const thisPost = usePost();
    const setThisPost = usePostUpdate();
    const [countLikes, setCountLikes] = useState();
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
        thisPost && setCountLikes(+thisPost.likes);
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

        if (actif) {
            setCountLikes(countLikes - 1);
            postObj = { ...postObj, likes: countLikes - 1 };
            postObj.usersLiked.splice(userIndex, 1);
        } else {
            setCountLikes(countLikes + 1);
            postObj = { ...postObj, likes: countLikes + 1 };
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
                    &nbsp;&nbsp;{countLikes !== 0 && countLikes}
                </i>
            )}
        </button>
    );
};

export default Likes;
