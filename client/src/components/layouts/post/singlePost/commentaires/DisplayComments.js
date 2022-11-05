import React, { useMemo } from "react";
import {
    getAvatarAndPseudo,
    getThisPostComments,
} from "../../../../../utils/axiosCalls";
import { useAuth } from "../../../../context/AuthContext";
import {
    useUsersInfo,
    useUsersInfoUpdate,
} from "../../../../context/UsersInfoContext";
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
    const setUsersInfo = useUsersInfoUpdate();

    useMemo(() => {
        commentActif &&
            token &&
            getThisPostComments(token, thisPost._id)
                .then((commentaires) => setCommentaires(commentaires))
                .catch((err) => console.log(err));
    }, [commentActif, setCommentaires, thisPost._id, token]);

    useMemo(() => {
        if (comments && usersInfo) {
            let tempTab = [];
            comments.map(
                (comment) =>
                    !usersInfo.find(
                        (findUser) => findUser.userId === comment.userId
                    ) &&
                    tempTab.indexOf(comment.userId) === -1 &&
                    (tempTab = [...tempTab, comment.userId])
            );
            tempTab &&
                tempTab.map((ID) =>
                    getAvatarAndPseudo(token, ID).then((user) => {
                        setUsersInfo([...usersInfo, user]);
                    })
                );

            return tempTab;
        }
    }, [comments, setUsersInfo, token, usersInfo]);

    // useEffect(() => {
    //     getIDs&&
    //     getIDs.map(ID=>getAvatarAndPseudo(token, ID).then((user) => {
    //         setUsersInfo([...usersInfo, user]);
    //     }))
    // }, [getIDs, setUsersInfo, token, usersInfo]);

    return (
        comments && (
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
        )
    );
};

export default DisplayComments;
