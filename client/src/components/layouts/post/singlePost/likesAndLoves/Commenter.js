import React from "react";
import { useComment, useCommentUpdate } from "../../PostContext";

const Commenter = () => {
    const setComment = useCommentUpdate();
    const comment = useComment();
    const handleClick = () => {
        setComment(!comment);
    };
    return (
        <button onClick={handleClick} className="commenter">
            commentaires
        </button>
    );
};

export default Commenter;
