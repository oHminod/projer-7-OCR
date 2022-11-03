import React, { useEffect, useState } from "react";
import { getAvatarAndPseudo } from "../../../../../utils/axiosCalls";
import { shortDateFromDate } from "../../../../../utils/localeDateFromDate";
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
    const [repondre, setRepondre] = useState(false);
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
        comment && setCreatedAt(shortDateFromDate(comment.createdAt));
        comment && setUpdatedAt(shortDateFromDate(comment.createdAt));
    }, [comment]);

    const handleCommenter = () => {
        setRepondre(!repondre);
    };

    return (
        <>
            <div className="commentaire">
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
                        <div className="comment">
                            {comment && <p>{comment.text}</p>}
                        </div>
                    </div>
                </div>
                <div className="blockActions">
                    <div>
                        {user && (
                            <p>
                                <strong>{user.pseudo}</strong>
                            </p>
                        )}
                        <p>{createdAt}</p>
                        {updatedAt !== createdAt && (
                            <p> (Modifié {updatedAt})</p>
                        )}
                    </div>
                    <p onClick={handleCommenter} className="commenter">
                        répondre
                    </p>
                </div>
                {repondre && (
                    <ResponsePrompt
                        thisComment={comment}
                        thisCommentUser={user}
                    />
                )}
                <DisplayResponses
                    comment={comment}
                    resTargetPseudo={user && user.pseudo}
                />
            </div>
        </>
    );
};

export default Commentaire;
