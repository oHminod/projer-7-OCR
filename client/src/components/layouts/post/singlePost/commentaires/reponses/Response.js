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
import { shortDateFromDate } from "../../../../../../utils/localeDateFromDate";

const Response = ({ reponse, resTargetPseudo }) => {
    const usersInfo = useUsersInfo();
    const [user, setUser] = useState();
    const setUsersInfo = useUsersInfoUpdate();
    const [updatedAt, setUpdatedAt] = useState();
    const [createdAt, setCreatedAt] = useState();
    const [repondre, setRepondre] = useState(false);
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
        reponse && setCreatedAt(shortDateFromDate(reponse.createdAt));
        reponse && setUpdatedAt(shortDateFromDate(reponse.createdAt));
    }, [reponse]);

    const handleCommenter = () => {
        setRepondre(!repondre);
    };

    return (
        <>
            <div className="reponse" key={reponse.threadId}>
                <div className="card">
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
                        <div className="legendeCom">
                            {user && (
                                <p>
                                    <strong>{user.pseudo}</strong> pour{" "}
                                    <strong>{resTargetPseudo}</strong>
                                </p>
                            )}
                            <div className="comment">
                                {reponse && <p>{reponse.text}</p>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="blockActions">
                    <div className="heure">
                        <p> {createdAt}</p>
                        {updatedAt !== createdAt && (
                            <p>(Modifié {updatedAt})</p>
                        )}
                    </div>
                    <p onClick={handleCommenter} className="commenter">
                        répondre
                    </p>
                </div>
                {repondre && (
                    <ResponsePrompt
                        thisComment={reponse}
                        thisCommentUser={user}
                    />
                )}
                <DisplayResponses
                    comment={reponse}
                    resTargetPseudo={user && user.pseudo}
                />
            </div>
        </>
    );
};

export default Response;
