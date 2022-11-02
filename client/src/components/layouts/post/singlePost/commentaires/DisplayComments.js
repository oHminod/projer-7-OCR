import React, { useEffect } from "react";
import { getThisPostComments } from "../../../../../utils/axiosCalls";
import { useAuth } from "../../../../context/AuthContext";
import {
    useComment,
    useCommentaires,
    useCommentairesUpdate,
    usePost,
} from "../../PostContext";
import Commentaire from "./Commentaire";
import "./DisplayComments.scss";

const DisplayComments = () => {
    const token = useAuth();
    const setCommentaires = useCommentairesUpdate();
    const comments = useCommentaires();
    const commentActif = useComment();
    const thisPost = usePost();

    useEffect(() => {
        commentActif &&
            getThisPostComments(token, thisPost._id)
                .then((commentaires) => setCommentaires(commentaires))
                .catch((err) => console.log(err));
    }, [commentActif, setCommentaires, thisPost._id, token]);

    return (
        comments && (
            <div className="commentaires">
                {comments.map((comment, index) => (
                    <Commentaire
                        comment={comment}
                        key={"commentaire-" + index}
                    />
                ))}
            </div>
        )
    );
};

export default DisplayComments;
