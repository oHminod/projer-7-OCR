import React, { useEffect, useState } from "react";
import { partagerPost, postSharedPost } from "../../../../../utils/axiosCalls";
import {
    useMyPosts,
    useMyPostsUpdate,
} from "../../../../context/MyPostsContext";
import { usePosts, usePostsUpdate } from "../../../../context/PostsContext";
import { useUser } from "../../../../context/UserContext";
import { usePost, usePostUpdate } from "../../PostContext";

const Partager = () => {
    const [actif, setActif] = useState(false);
    const user = useUser();
    const thisPost = usePost();
    const setThisPost = usePostUpdate();
    const allPosts = usePosts();
    const setAllPosts = usePostsUpdate();
    const allMyPosts = useMyPosts();
    const setAllMyPosts = useMyPostsUpdate();

    useEffect(() => {
        thisPost &&
            user &&
            thisPost.usersShared.includes(user._id) &&
            setActif(true);
    }, [thisPost, user]);

    useEffect(() => {
        thisPost &&
            user &&
            thisPost.usersShared.indexOf(user._id) === -1 &&
            setActif(false);
    }, [thisPost, user]);

    const handelClick = () => {
        setActif(!actif);
        let postObj = { ...thisPost };

        let allPostsCopy = [...allPosts];
        let allMyPostsCopy = [];

        const thisPostIndex = allPostsCopy
            .map((post) => post._id)
            .indexOf(thisPost._id);
        const userIndex = postObj.usersShared.indexOf(user._id);

        if (thisPost && actif) {
            postObj = { ...postObj, shares: thisPost.shares - 1 };
            postObj.usersShared.splice(userIndex, 1);
        } else {
            postObj = { ...postObj, shares: thisPost.shares + 1 };
            postObj.usersShared.push(user._id);
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
        actif ? (obj.share = "0") : (obj.share = "1");

        thisPost && partagerPost(thisPost._id, obj);

        let sharedPost = {};
        if (thisPost && thisPost.hasOwnProperty("sharedUserId")) {
            sharedPost.sharedPostId = thisPost.sharedPostId;
            sharedPost.sharedUserId = thisPost.sharedUserId;
            thisPost.sharedTexte &&
                (sharedPost.sharedTexte = thisPost.sharedTexte);
            thisPost.sharedImage &&
                (sharedPost.sharedImage = thisPost.sharedImage);
            sharedPost.userId = user._id;
            sharedPost.originalPostCreatedAt = thisPost.originalPostCreatedAt;
            postSharedPost(sharedPost);
        } else if (thisPost) {
            sharedPost.sharedPostId = thisPost._id;
            sharedPost.sharedUserId = thisPost.userId;
            thisPost.texte && (sharedPost.sharedTexte = thisPost.texte);
            thisPost.image && (sharedPost.sharedImage = thisPost.image);
            sharedPost.userId = user._id;
            sharedPost.originalPostCreatedAt = thisPost.createdAt;
            postSharedPost(sharedPost);
        }
    };

    return (
        <button
            onClick={handelClick}
            className={actif ? "shares actif" : "shares"}
        >
            {thisPost && (
                <i className="fa-solid fa-retweet">
                    &nbsp;&nbsp;{thisPost.shares !== 0 && thisPost.shares}
                </i>
            )}
        </button>
    );
};

export default Partager;
