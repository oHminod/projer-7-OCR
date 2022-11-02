import React from "react";
import DisplayResponses from "./reponses/DisplayResponses";
import ResponsePrompt from "./reponses/ResponsePrompt";

const Commentaire = ({ comment }) => {
    return (
        <div className="commentaire">
            <p>userId : {comment && comment.userId}</p>
            <p>postId : {comment && comment.postId}</p>
            <p>commentId : {comment && comment.commentId}</p>
            <p>threadId : {comment && comment.threadId}</p>
            <p>text : {comment && comment.text}</p>
            <ResponsePrompt thisComment={comment} />
            <DisplayResponses comment={comment} />
        </div>
    );
};

export default Commentaire;
