import React, { useMemo, useState } from "react";
import useGetUsersInfo from "../../../../../hooks/useGetUsersInfo";
import { getThisPostComments } from "../../../../../utils/axiosCalls";

import { useAuth } from "../../../../contexts/AuthContext";
import { useUsersInfo } from "../../../../contexts/UsersInfoContext";
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
    const usersInfo = useUsersInfo();
    const [usersWhoNeedsInfo, setUsersWhoNeedsInfo] = useState([]);

    useGetUsersInfo(usersWhoNeedsInfo);

    useMemo(() => {
        commentActif &&
            token &&
            getThisPostComments(thisPost._id)
                .then((commentaires) => setCommentaires(commentaires))
                .catch((err) => console.log(err));
    }, [commentActif, setCommentaires, thisPost._id, token]);

    useMemo(() => {
        if (comments && usersInfo) {
            comments.map(
                (comment) =>
                    !usersInfo.find(
                        (findUser) => findUser.userId === comment.userId
                    ) &&
                    usersWhoNeedsInfo.indexOf(comment.userId) === -1 &&
                    setUsersWhoNeedsInfo((prev) => [...prev, comment.userId])
            );
            return usersWhoNeedsInfo;
        }
    }, [comments, usersWhoNeedsInfo, usersInfo]);

    if (!comments) return null;
    return (
        <div className="commentaires">
            {comments.map(
                (comment, index) =>
                    comment.commentId === comment.threadId && (
                        <Commentaire
                            comment={comment}
                            key={"commentaire-" + index}
                        />
                    )
            )}
        </div>
    );
};

export default DisplayComments;
