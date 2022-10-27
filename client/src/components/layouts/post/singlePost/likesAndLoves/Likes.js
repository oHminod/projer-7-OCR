import React, { useEffect, useState } from "react";
import { likerPost } from "../../../../../utils/axiosCalls";
import { useAuth } from "../../../../context/AuthContext";
import { useUser } from "../../../../context/UserContext";
import { usePost } from "../../PostContext";

const Likes = () => {
    const [actif, setActif] = useState(false);
    const user = useUser();
    const token = useAuth();
    const thisPost = usePost();
    const [countLikes, setCountLikes] = useState();

    useEffect(() => {
        thisPost &&
            user &&
            thisPost.usersLiked.includes(user._id) &&
            setActif(true);
    }, [thisPost, user]);

    useEffect(() => {
        thisPost && setCountLikes(+thisPost.likes);
    }, [thisPost]);

    const handelClick = () => {
        setActif(!actif);

        actif ? setCountLikes(countLikes - 1) : setCountLikes(countLikes + 1);

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
