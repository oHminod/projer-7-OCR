import React from "react";
import ResponsePrompt from "./ResponsePrompt";
import "./response.scss";
import DisplayResponses from "./DisplayResponses";

const Response = ({ reponse }) => {
    return (
        <div className="reponse" key={reponse.threadId}>
            <p>userId : {reponse && reponse.userId}</p>
            <p>postId : {reponse && reponse.postId}</p>
            <p>commentId : {reponse && reponse.commentId}</p>
            <p>threadId : {reponse && reponse.threadId}</p>
            <p>text : {reponse && reponse.text}</p>
            <ResponsePrompt thisComment={reponse} />
            <DisplayResponses comment={reponse} />
        </div>
    );
};

export default Response;
