import React from "react";
import { useCommentaires } from "../../../PostContext";
import Response from "./Response";

const DisplayResponses = ({ comment }) => {
    const commentaires = useCommentaires();
    return (
        commentaires &&
        commentaires.map(
            (reponse) =>
                reponse.commentId !== reponse.threadId &&
                comment.commentId === reponse.threadId && (
                    <Response reponse={reponse} key={reponse.commentId} />
                )
        )
    );
};

export default DisplayResponses;
