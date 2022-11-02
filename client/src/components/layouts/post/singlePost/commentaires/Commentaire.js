import React from "react";

const Commentaire = ({ comment }) => {
    return (
        <div className="commentaire">
            <p>userId : {comment && comment.userId}</p>
            <p>postId : {comment && comment.postId}</p>
            <p>commentId : {comment && comment.commentId}</p>
            <p>threadId : {comment && comment.threadId}</p>
            <p>text : {comment && comment.text}</p>
        </div>
    );
};

export default Commentaire;
