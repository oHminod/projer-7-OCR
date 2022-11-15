import React, { useEffect, useState } from "react";
import { loverPost } from "../../../../../utils/axiosCalls";
import {
    useMyPosts,
    useMyPostsUpdate,
} from "../../../../contexts/MyPostsContext";
import { usePosts, usePostsUpdate } from "../../../../contexts/PostsContext";
import { useUser } from "../../../../contexts/UserContext";
import { usePost, usePostUpdate } from "../../PostContext";

const Loves = () => {
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
            thisPost.usersLoved.includes(user._id) &&
            setActif(true);
    }, [thisPost, user]);

    useEffect(() => {
        thisPost && +thisPost.loves === 0 && setActif(false);
    }, [thisPost]);

    const handelClick = () => {
        setActif(!actif);
        let postObj = { ...thisPost };

        let allPostsCopy = [...allPosts];
        let allMyPostsCopy = [];

        const thisPostIndex = allPostsCopy
            .map((post) => post._id)
            .indexOf(thisPost._id);
        let userIndex = postObj.usersLoved.indexOf(user._id);

        if (thisPost && actif) {
            postObj = { ...postObj, loves: thisPost.loves - 1 };
            postObj.usersLoved.splice(userIndex, 1);
        } else {
            postObj = { ...postObj, loves: thisPost.loves + 1 };
            postObj.usersLoved.push(user._id);
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
        actif ? (obj.love = "0") : (obj.love = "1");

        thisPost && loverPost(thisPost._id, obj);
    };

    return (
        <button
            onClick={handelClick}
            className={actif ? "loves actif" : "loves"}
            title="J'adore"
        >
            {thisPost && (
                <i className="fa-regular fa-heart">
                    &nbsp;&nbsp;{thisPost.loves !== 0 && thisPost.loves}
                </i>
            )}
        </button>
    );
};

export default Loves;
