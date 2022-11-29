import React, { useEffect, useState } from "react";
import ResponsePrompt from "./ResponsePrompt";
import "./response.scss";
import DisplayResponses from "./DisplayResponses";
import { useUsersInfo } from "../../../../../contexts/UsersInfoContext";
import { shortDateFromDate } from "../../../../../../utils/localeDateFromDate";
import UpdatePrompt from "../UpdatePrompt";
import { useUser } from "../../../../../contexts/UserContext";

const Response = ({ reponse, resTargetPseudo }) => {
    const usersInfo = useUsersInfo();
    const [user, setUser] = useState();
    const [updatedAt, setUpdatedAt] = useState();
    const [createdAt, setCreatedAt] = useState();
    const [repondre, setRepondre] = useState(false);
    const [tabTexte, setTabTexte] = useState([]);
    const [modifier, setModifier] = useState(false);
    const [fakeCurrentDate, setFakeCurrentDate] = useState(new Date());
    const my = useUser();

    useEffect(() => {
        setTimeout(() => setFakeCurrentDate(new Date()), 9000);
    }, [fakeCurrentDate]);

    useEffect(() => {
        usersInfo &&
            usersInfo.map(
                (userInf) =>
                    userInf.userId === reponse.userId && setUser(userInf)
            );
    }, [reponse.userId, usersInfo]);

    useEffect(() => {
        reponse &&
            reponse.text &&
            setTabTexte(
                reponse.text
                    .trim()
                    .split("\u000A")
                    .filter((p) => p !== "")
            );
        reponse && reponse.text && (reponse.text = reponse.text.trim());
    }, [reponse]);

    useEffect(() => {
        reponse && setCreatedAt(shortDateFromDate(reponse.createdAt));
        reponse && setUpdatedAt(shortDateFromDate(reponse.createdAt));
    }, [reponse, fakeCurrentDate]);

    const handleCommenter = () => {
        setRepondre(!repondre);
    };

    const handleModifier = () => {
        setModifier((prev) => !prev);
    };

    const text =
        tabTexte.length > 0
            ? tabTexte.map((paragraphe, index) => (
                  <p key={index}>{paragraphe}</p>
              ))
            : reponse && reponse.text && <p>{reponse.text}</p>;

    return (
        <>
            <div className="reponse" key={reponse.threadId}>
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
                                        <strong>{user.pseudo}</strong> pour{" "}
                                        <strong>{resTargetPseudo}</strong>
                                    </p>
                                )}
                                {modifier ? (
                                    <UpdatePrompt
                                        comment={reponse}
                                        setModifier={setModifier}
                                    />
                                ) : (
                                    <div className="comment">{text}</div>
                                )}
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
                    <div>
                        {(reponse.userId === my._id || my.role === "admin") && (
                            <p onClick={handleModifier} className="commenter">
                                modifier
                            </p>
                        )}
                        <p onClick={handleCommenter} className="commenter">
                            répondre
                        </p>
                    </div>
                </div>
                {repondre && (
                    <ResponsePrompt
                        thisComment={reponse}
                        thisCommentUser={user}
                        setRepondre={setRepondre}
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
