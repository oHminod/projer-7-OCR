import React, { useEffect, useState } from "react";
import localeDateFromDate from "../../../../utils/localeDateFromDate";
import { useUsersInfo } from "../../../contexts/UsersInfoContext";

const SharedPostPart = ({ thisPost }) => {
    const [sharedUser, setSharedUser] = useState();
    const [originalPostCreatedAt, setOriginalPostCreatedAt] = useState();
    const [tabTexte, setTabTexte] = useState([]);
    const usersInfo = useUsersInfo();

    useEffect(() => {
        thisPost &&
            thisPost.sharedTexte &&
            setTabTexte(
                thisPost.sharedTexte
                    .trim()
                    .split("\u000A")
                    .filter((p) => p !== "")
            );
        thisPost &&
            thisPost.sharedTexte &&
            (thisPost.sharedTexte = thisPost.sharedTexte.trim());
    }, [thisPost]);

    useEffect(() => {
        usersInfo &&
            thisPost &&
            thisPost.sharedUserId !== "" &&
            usersInfo.find(
                (findUser) => findUser.userId === thisPost.sharedUserId
            ) &&
            setSharedUser(
                usersInfo.find(
                    (findUser) => findUser.userId === thisPost.sharedUserId
                )
            );
    }, [thisPost, usersInfo]);

    useEffect(() => {
        thisPost &&
            thisPost.originalPostCreatedAt &&
            setOriginalPostCreatedAt(
                localeDateFromDate(thisPost.originalPostCreatedAt)
            );
    }, [thisPost]);

    return (
        <>
            <div className="creatorInfo shared">
                <div className="wrapper">
                    {thisPost && thisPost.sharedUserId !== "" && sharedUser ? (
                        <img
                            className="imgUser"
                            src={sharedUser.avatar}
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
                        {thisPost &&
                            thisPost.sharedUserId !== "" &&
                            sharedUser && (
                                <p>
                                    Publication originale par{" "}
                                    <strong>{sharedUser.pseudo}</strong>
                                    &nbsp;
                                </p>
                            )}
                        <p>{originalPostCreatedAt}</p>
                    </div>
                </div>
            </div>
            <div className="postContainer">
                {thisPost &&
                thisPost.sharedUserId !== "" &&
                thisPost.sharedTexte &&
                tabTexte.length > 0
                    ? tabTexte.map((paragraphe, index) => (
                          <p key={index}>{paragraphe}</p>
                      ))
                    : thisPost &&
                      thisPost.sharedTexte && <p>{thisPost.sharedTexte}</p>}
                {thisPost &&
                    thisPost.sharedUserId !== "" &&
                    thisPost.sharedImage && (
                        <img
                            className="imgPost"
                            src={thisPost.sharedImage}
                            alt="illustration"
                        />
                    )}
            </div>
        </>
    );
};

export default SharedPostPart;
