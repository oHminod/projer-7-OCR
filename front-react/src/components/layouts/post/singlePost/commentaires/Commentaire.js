import React, { useEffect, useState } from "react";
import { shortDateFromDate } from "../../../../../utils/localeDateFromDate";
import { useUsersInfo } from "../../../../contexts/UsersInfoContext";
import DisplayResponses from "./reponses/DisplayResponses";
import ResponsePrompt from "./reponses/ResponsePrompt";

const Commentaire = ({ comment }) => {
    const usersInfo = useUsersInfo();
    const [user, setUser] = useState();
    const [updatedAt, setUpdatedAt] = useState();
    const [createdAt, setCreatedAt] = useState();
    const [repondre, setRepondre] = useState(false);
    const [tabTexte, setTabTexte] = useState([]);

    useEffect(() => {
        usersInfo &&
            usersInfo.map(
                (userInf) =>
                    userInf.userId === comment.userId && setUser(userInf)
            );
    }, [comment.userId, usersInfo]);

    useEffect(() => {
        comment &&
            comment.text &&
            setTabTexte(
                comment.text
                    .trim()
                    .split("\u000A")
                    .filter((p) => p !== "")
            );
        comment && comment.text && (comment.text = comment.text.trim());
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
                        <div className="wrapper">
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
                                        <strong>{user.pseudo}</strong>
                                    </p>
                                )}
                                <div className="comment">
                                    {tabTexte.length > 0
                                        ? tabTexte.map((paragraphe, index) => (
                                              <p key={index}>{paragraphe}</p>
                                          ))
                                        : comment &&
                                          comment.text && <p>{comment.text}</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="blockActions">
                    <div className="heure">
                        <p>{createdAt}</p>
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
                        thisComment={comment}
                        thisCommentUser={user}
                    />
                )}
                <div className="reponses">
                    <DisplayResponses
                        comment={comment}
                        resTargetPseudo={user && user.pseudo}
                    />
                </div>
            </div>
        </>
    );
};

export default Commentaire;
