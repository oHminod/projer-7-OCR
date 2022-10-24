import React, { useEffect, useState } from "react";
import localeDateFromDate from "../../../utils/localeDateFromDate";
import "./SinglePost.scss";

const SinglePost = ({ post }) => {
    const [updatedAt, setUpdatedAt] = useState();
    const [createdAt, setCreatedAt] = useState();
    const formatedText = (txt) => {
        return { __html: txt };
    };
    useEffect(() => {
        post.texte &&
            (post.texte = post.texte.trim().split("\u000A").join("</p><p>"));
    });
    useEffect(() => {
        post.createdAt && setCreatedAt(localeDateFromDate(post.createdAt));
        post.updatedAt && setUpdatedAt(localeDateFromDate(post.createdAt));
    }, [post.updatedAt, post.createdAt]);

    return (
        <article className="singlePost" id={post._id}>
            <div className="creatorInfo">
                {post.userAvatar && (
                    <img
                        className="imgUser"
                        src={post.userAvatar}
                        alt="avatar de l'auteur"
                    />
                )}
                {post.userPseudo && (
                    <p>
                        Par <strong>{post.userPseudo}</strong>&nbsp;
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
        </article>
    );
};

export default SinglePost;
