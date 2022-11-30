import React from "react";
import { useCommentaires } from "../../../PostContext";
import Response from "./Response";

const DisplayResponses = ({ comment, resTargetPseudo }) => {
    const commentaires = useCommentaires();

    return (
        commentaires &&
        commentaires.map(
            (reponse) =>
                reponse.commentId !== reponse.threadId &&
                comment.commentId === reponse.threadId && (
                    <Response
                        reponse={reponse}
                        key={reponse.commentId}
                        resTargetPseudo={resTargetPseudo}
                    />
                )
        )
    );
};

export default DisplayResponses;
