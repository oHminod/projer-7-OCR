import React from "react";
import { deletePost } from "../../../../../utils/axiosCalls";
import { usePost } from "../../PostContext";

const DeletePost = () => {
    const post = usePost();

    const handleClick = () => {
        post && deletePost(post._id);
    };
    return (
        <button className="mod-supp" onClick={handleClick}>
            Supprimer
        </button>
    );
};

export default DeletePost;
