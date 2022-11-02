import React from "react";
import CommentPrompt from "./CommentPrompt";
import DisplayComments from "./DisplayComments";

const CommentBlock = () => {
    return (
        <div>
            <DisplayComments />
            <CommentPrompt />
        </div>
    );
};

export default CommentBlock;
