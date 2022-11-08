import React from "react";
import { deletePost, deleteSharedPost } from "../../../../../utils/axiosCalls";
import { usePost } from "../../PostContext";

const DeletePost = () => {
    const post = usePost();

    const handleClick = () => {
        if (post && post.hasOwnProperty("sharedPostId") && post.sharedPostId) {
            deleteSharedPost(post._id);
        } else {
            post && deletePost(post._id);
        }
    };
    return (
        <button className="mod-supp" onClick={handleClick}>
            Supprimer
        </button>
    );
};

export default DeletePost;
