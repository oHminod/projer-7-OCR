import React, { useEffect, useState } from "react";
import "./SinglePost.scss";

const SinglePost = ({ post }) => {
    const [updatedAt, setUpdatedAt] = useState();
    const [createdAt, setCreatedAt] = useState();
    const formatedText = (txt) => {
        return { __html: txt };
    };
    useEffect(() => {
        post.texte && (post.texte = post.texte.split("\u000A"));
        post.texte && (post.texte = post.texte.join("</p><p>"));
    });
    useEffect(() => {
        post.createdAt &&
            setCreatedAt(
                "le " +
                    new Date(post.createdAt).toLocaleDateString() +
                    " à " +
                    new Date(post.createdAt).toLocaleTimeString()
            );

        post.updatedAt &&
            setUpdatedAt(
                "le " +
                    new Date(post.updatedAt).toLocaleDateString() +
                    " à " +
                    new Date(post.updatedAt).toLocaleTimeString()
            );
    }, [post.updatedAt, post.createdAt]);

    return (
        <div className="singlePost" id={post._id}>
            <div className="creatorInfo">
                {post.userAvatar && (
                    <img
                        className="imgUser"
                        src={post.userAvatar}
                        alt="avatar de l'auteur"
                    />
                )}
                {post.userPseudo && <p>Par {post.userPseudo}&nbsp;</p>}
                <p> {createdAt}</p>
                {updatedAt !== createdAt && <p>(Modifié {updatedAt})</p>}
            </div>
            {post.texte && (
                <p dangerouslySetInnerHTML={formatedText(post.texte)}></p>
            )}
            {post.image && (
                <img className="imgPost" src={post.image} alt="illustration" />
            )}
        </div>
    );
};

export default SinglePost;
