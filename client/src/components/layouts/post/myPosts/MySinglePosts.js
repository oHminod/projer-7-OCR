import React, { useEffect, useState } from "react";
import localeDateFromDate from "../../../../utils/localeDateFromDate";
import { useUser } from "../../../context/UserContext";
import CommentBlock from "../singlePost/CommentBlock";
import LikeContainer from "../singlePost/LikeContainer";
import "../singlePost/SinglePost.scss";

const MySinglePosts = ({ post }) => {
    const [updatedAt, setUpdatedAt] = useState();
    const [createdAt, setCreatedAt] = useState();
    const user = useUser();
    const formatedText = (txt) => {
        return { __html: txt };
    };
    useEffect(() => {
        post.texte &&
            (post.texte = post.texte.trim().split("\u000A").join("</p><p>"));
    }, [post]);

    useEffect(() => {
        post.createdAt && setCreatedAt(localeDateFromDate(post.createdAt));
        post.updatedAt && setUpdatedAt(localeDateFromDate(post.createdAt));
    }, [post.updatedAt, post.createdAt]);
    return (
        <article className="singlePost" id={post._id}>
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
                {user && (
                    <p>
                        Par <strong>{user.pseudo}</strong>&nbsp;
                    </p>
                )}
                <p> {createdAt}</p>
                {updatedAt !== createdAt && <p>(Modifié {updatedAt})</p>}
            </div>
            <div className="postContainer">
                {post.texte && (
                    <p dangerouslySetInnerHTML={formatedText(post.texte)}></p>
                )}
                {post.image && (
                    <img
                        className="imgPost"
                        src={post.image}
                        alt="illustration"
                    />
                )}
            </div>
            <LikeContainer />
            <CommentBlock />
        </article>
    );
};

export default MySinglePosts;
