import React, { useEffect, useState } from "react";
import { useComment, useCommentUpdate, usePost } from "../../PostContext";

const Commenter = () => {
    const setComment = useCommentUpdate();
    const comment = useComment();
    const thisPost = usePost();
    const [nbComments, setNbComments] = useState();
    const handleClick = () => {
        setComment(!comment);
    };
    useEffect(() => {
        thisPost && setNbComments(thisPost.commentaires.length);
    }, [thisPost]);
    return (
        <button onClick={handleClick} className="commenter">
            {nbComments > 0 && nbComments}&nbsp;&nbsp;
            {nbComments === 0 && "Commenter"}
            {nbComments === 1 && "Commentaire"}
            {nbComments > 1 && "Commentaires"}
        </button>
    );
};

export default Commenter;
