import React, { useEffect, useState } from "react";
import { loverPost } from "../../../../../utils/axiosCalls";
import { useAuth } from "../../../../context/AuthContext";
import {
    useMyPosts,
    useMyPostsUpdate,
} from "../../../../context/MyPostsContext";
import { usePosts, usePostsUpdate } from "../../../../context/PostsContext";
import { useUser } from "../../../../context/UserContext";
import { usePost, usePostUpdate } from "../../PostContext";

const Loves = () => {
    const [actif, setActif] = useState(false);
    const user = useUser();
    const token = useAuth();
    const thisPost = usePost();
    const setThisPost = usePostUpdate();
    const [countLoves, setCountLoves] = useState();
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
        thisPost && setCountLoves(+thisPost.loves);
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

        if (actif) {
            setCountLoves(countLoves - 1);
            postObj = { ...postObj, loves: countLoves - 1 };
            postObj.usersLoved.splice(userIndex, 1);
        } else {
            setCountLoves(countLoves + 1);
            postObj = { ...postObj, loves: countLoves + 1 };
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

        thisPost && actif
            ? loverPost(token, thisPost._id, obj)
            : loverPost(token, thisPost._id, obj);
    };

    return (
        <button
            onClick={handelClick}
            className={actif ? "loves actif" : "loves"}
        >
            {/* {console.log("button = " + actif)} */}
            {thisPost && (
                <i className="fa-regular fa-heart">
                    &nbsp;&nbsp;{countLoves !== 0 && countLoves}
                </i>
            )}
        </button>
    );
};

export default Loves;
