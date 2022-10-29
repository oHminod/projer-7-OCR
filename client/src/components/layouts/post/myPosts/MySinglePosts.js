import React, { useEffect, useState } from "react";
import localeDateFromDate from "../../../../utils/localeDateFromDate";
import { useUser } from "../../../context/UserContext";
import { useComment, usePost } from "../PostContext";
import CommentBlock from "../singlePost/CommentBlock";
import LikeContainer from "../singlePost/LikeContainer";
import "../singlePost/SinglePost.scss";

const MySinglePosts = () => {
    const [updatedAt, setUpdatedAt] = useState();
    const [createdAt, setCreatedAt] = useState();
    const user = useUser();
    const formatedText = (txt) => {
        return { __html: txt };
    };
    const thisPost = usePost();
    const comment = useComment();

    useEffect(() => {
        thisPost &&
            thisPost.texte &&
            (thisPost.texte = thisPost.texte
                .trim()
                .split("\u000A")
                .join("</p><p>"));
    }, [thisPost]);

    useEffect(() => {
        thisPost && setCreatedAt(localeDateFromDate(thisPost.createdAt));
        thisPost && setUpdatedAt(localeDateFromDate(thisPost.updatedAt));
    }, [thisPost]);
    return (
        <article className="singlePost" id={thisPost && thisPost._id}>
            <div className="creatorInfo">
                {user ? (
                    <img
                        className="imgUser"
                        src={user.avatar}
                        alt="avatar de l'auteur"
                    />
                ) : (
                    <img
                        className="imgUser"
                        src="http://localhost:36600/images/avatars/default-avatar.jpg"
                        alt="avatar par défaut"
                    />
                )}
                <div className="legende">
                    {user && (
                        <p>
                            Par <strong>{user.pseudo}</strong>&nbsp;
                        </p>
                    )}
                    <p> {createdAt}</p>
                    {updatedAt !== createdAt && <p>(Modifié {updatedAt})</p>}
                </div>
            </div>
            <div className="postContainer">
                {thisPost && thisPost.texte && (
                    <p
                        dangerouslySetInnerHTML={formatedText(thisPost.texte)}
                    ></p>
                )}
                {thisPost && thisPost.image && (
                    <img
                        className="imgPost"
                        src={thisPost.image}
                        alt="illustration"
                    />
                )}
            </div>
            <LikeContainer />
            {comment && <CommentBlock />}
        </article>
    );
};

export default MySinglePosts;
