import React from "react";
import CommentPrompt from "./CommentPrompt";
import DisplayComments from "./DisplayComments";

const CommentBlock = () => {
    return (
        <div>
            <CommentPrompt />
            <DisplayComments />
        </div>
    );
};

export default CommentBlock;
