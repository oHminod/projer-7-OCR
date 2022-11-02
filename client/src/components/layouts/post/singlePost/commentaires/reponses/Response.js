import React, { useEffect, useState } from "react";
import ResponsePrompt from "./ResponsePrompt";
import "./response.scss";
import DisplayResponses from "./DisplayResponses";
import {
    useUsersInfo,
    useUsersInfoUpdate,
} from "../../../../../context/UsersInfoContext";
import { getAvatarAndPseudo } from "../../../../../../utils/axiosCalls";
import { useAuth } from "../../../../../context/AuthContext";
import localeDateFromDate from "../../../../../../utils/localeDateFromDate";

const Response = ({ reponse, resTargetPseudo }) => {
    const usersInfo = useUsersInfo();
    const [user, setUser] = useState();
    const setUsersInfo = useUsersInfoUpdate();
    const [updatedAt, setUpdatedAt] = useState();
    const [createdAt, setCreatedAt] = useState();
    const token = useAuth();

    useEffect(() => {
        if (usersInfo) {
            const thisUserIndex = usersInfo
                .map((userInf) => userInf.userId)
                .indexOf(reponse.userId);
            thisUserIndex !== -1
                ? usersInfo.map(
                      (userInf) =>
                          userInf.userId === reponse.userId && setUser(userInf)
                  )
                : getAvatarAndPseudo(token, reponse.userId).then((user) => {
                      setUsersInfo([...usersInfo, user]);
                      setUser(user);
                  });
        }
    }, [reponse.userId, setUsersInfo, token, usersInfo]);
    useEffect(() => {
        reponse &&
            reponse.texte &&
            (reponse.texte = reponse.texte
                .trim()
                .split("\u000A")
                .join("</p><p>"));
    }, [reponse]);

    useEffect(() => {
        reponse && setCreatedAt(localeDateFromDate(reponse.createdAt));
        reponse && setUpdatedAt(localeDateFromDate(reponse.createdAt));
    }, [reponse]);

    return (
        <>
            <div className="reponse" key={reponse.threadId}>
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
                                Par <strong>{user.pseudo}</strong> en réponse à{" "}
                                <strong>{resTargetPseudo}</strong>
                            </p>
                        )}
                        <p> {createdAt}</p>
                        {updatedAt !== createdAt && (
                            <p>(Modifié {updatedAt})</p>
                        )}
                    </div>
                </div>
                {reponse && <p>{reponse.text}</p>}
                <ResponsePrompt thisComment={reponse} thisCommentUser={user} />
            </div>
            <DisplayResponses
                comment={reponse}
                resTargetPseudo={user && user.pseudo}
            />
        </>
    );
};

export default Response;
