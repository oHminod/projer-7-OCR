import React, { useEffect, useState } from "react";
import { sharePost } from "../../../../../utils/axiosCalls";
import { useUser } from "../../../../contexts/UserContext";
import { usePost } from "../../PostContext";

const Share = () => {
    const thisPost = usePost();
    const user = useUser();
    const [actif, setActif] = useState(false);

    useEffect(() => {
        thisPost && user && thisPost.usersShared.includes(user._id)
            ? setActif(true)
            : setActif(false);
    }, [thisPost, user]);

    const handelClick = () => {
        if (!actif) {
            const req = {
                post: thisPost,
                action: 1,
            };
            sharePost(req);
        } else {
            const req = {
                post: thisPost,
                action: 0,
            };
            sharePost(req);
        }
        setActif(!actif);
    };

    return (
        <button
            onClick={handelClick}
            className={
                (thisPost &&
                    user &&
                    thisPost.sharedPostId &&
                    thisPost.userId === user._id &&
                    "shares neutralise") ||
                (actif ? "shares actif" : "shares")
            }
            title="Partager"
        >
            {thisPost && (
                <i className="fa-solid fa-retweet">
                    &nbsp;&nbsp;{thisPost.shares !== 0 && thisPost.shares}
                </i>
            )}
        </button>
    );
};

export default Share;
