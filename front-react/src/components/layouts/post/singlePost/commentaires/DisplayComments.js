import React, { useMemo, useState } from "react";
import {
    getAvatarAndPseudo,
    getThisPostComments,
} from "../../../../../utils/axiosCalls";

import { useAuth } from "../../../../contexts/AuthContext";
import {
    useUsersInfo,
    useUsersInfoUpdate,
} from "../../../../contexts/UsersInfoContext";
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
    const dispatchUsersInfo = useUsersInfoUpdate();
    const [usersWhoNeedsInfo, setUsersWhoNeedsInfo] = useState([]);

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

    useMemo(() => {
        usersWhoNeedsInfo &&
            usersWhoNeedsInfo.map(
                (ID) =>
                    !usersInfo.find((findUser) => findUser.userId === ID) &&
                    getAvatarAndPseudo(ID, dispatchUsersInfo)
            );
    }, [usersWhoNeedsInfo, usersInfo, dispatchUsersInfo]);

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
