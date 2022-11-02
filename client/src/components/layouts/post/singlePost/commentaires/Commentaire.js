import React, { useEffect, useState } from "react";
import { getAvatarAndPseudo } from "../../../../../utils/axiosCalls";
import localeDateFromDate from "../../../../../utils/localeDateFromDate";
import { useAuth } from "../../../../context/AuthContext";
import {
    useUsersInfo,
    useUsersInfoUpdate,
} from "../../../../context/UsersInfoContext";
import DisplayResponses from "./reponses/DisplayResponses";
import ResponsePrompt from "./reponses/ResponsePrompt";

const Commentaire = ({ comment }) => {
    const usersInfo = useUsersInfo();
    const setUsersInfo = useUsersInfoUpdate();
    const [user, setUser] = useState();
    const [updatedAt, setUpdatedAt] = useState();
    const [createdAt, setCreatedAt] = useState();
    const token = useAuth();

    useEffect(() => {
        if (usersInfo) {
            const thisUserIndex = usersInfo
                .map((userInf) => userInf.userId)
                .indexOf(comment.userId);
            thisUserIndex !== -1
                ? usersInfo.map(
                      (userInf) =>
                          userInf.userId === comment.userId && setUser(userInf)
                  )
                : getAvatarAndPseudo(token, comment.userId).then((user) => {
                      setUsersInfo([...usersInfo, user]);
                      setUser(user);
                  });
        }
    }, [comment.userId, setUsersInfo, token, usersInfo]);
    useEffect(() => {
        comment &&
            comment.texte &&
            (comment.texte = comment.texte
                .trim()
                .split("\u000A")
                .join("</p><p>"));
    }, [comment]);

    useEffect(() => {
        comment && setCreatedAt(localeDateFromDate(comment.createdAt));
        comment && setUpdatedAt(localeDateFromDate(comment.createdAt));
    }, [comment]);

    return (
        <>
            <div className="commentaire">
                <div className="creatorInfo">
                    {user ? (
                        <img
                            className="imgUser"
                            src={user.avatar}
                            alt="avatar de l'auteur"
                        />
                    ) : (
                        <img
                            className="imgUser"
                            src="http://localhost:36600/images/avatars/default-avatar.jpg"
                            alt="avatar par défaut"
                        />
                    )}
                    <div className="legende">
                        {user && (
                            <p>
                                Par <strong>{user.pseudo}</strong>&nbsp;
                            </p>
                        )}
                        <p> {createdAt}</p>
                        {updatedAt !== createdAt && (
                            <p>(Modifié {updatedAt})</p>
                        )}
                    </div>
                </div>
                {comment && <p>{comment.text}</p>}
                <ResponsePrompt thisComment={comment} thisCommentUser={user} />
            </div>
            <DisplayResponses
                comment={comment}
                resTargetPseudo={user && user.pseudo}
            />
        </>
    );
};

export default Commentaire;
