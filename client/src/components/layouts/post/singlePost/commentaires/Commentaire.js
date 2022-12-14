import React, { useEffect, useState } from "react";
import { shortDateFromDate } from "../../../../../utils/localeDateFromDate";
import { useNewUsersInfo } from "../../../../context/NewUsersInfoContext";
import DisplayResponses from "./reponses/DisplayResponses";
import ResponsePrompt from "./reponses/ResponsePrompt";

const Commentaire = ({ comment }) => {
    const usersInfo = useNewUsersInfo();
    const [user, setUser] = useState();
    const [updatedAt, setUpdatedAt] = useState();
    const [createdAt, setCreatedAt] = useState();
    const [repondre, setRepondre] = useState(false);
    const [commentText, setCommentText] = useState("");
    const formatedText = (txt) => {
        return { __html: txt };
    };

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
            setCommentText(
                "<p>" +
                    comment.text.trim().split("\u000A").join("</p><p>") +
                    "</p>"
            );
    }, [comment, commentText]);

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
                                    alt="avatar par d??faut"
                                />
                            )}
                            <div className="legendeCom">
                                {user && (
                                    <p>
                                        <strong>{user.pseudo}</strong>
                                    </p>
                                )}
                                <div className="comment">
                                    {commentText && (
                                        <div
                                            dangerouslySetInnerHTML={formatedText(
                                                commentText
                                            )}
                                        ></div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="blockActions">
                    <div className="heure">
                        <p>{createdAt}</p>
                        {updatedAt !== createdAt && (
                            <p>(Modifi?? {updatedAt})</p>
                        )}
                    </div>
                    <p onClick={handleCommenter} className="commenter">
                        r??pondre
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
