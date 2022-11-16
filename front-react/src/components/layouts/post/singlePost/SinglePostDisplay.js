import React, { useEffect, useState } from "react";
import localeDateFromDate from "../../../../utils/localeDateFromDate";
import { useUser } from "../../../contexts/UserContext";
import { useUsersInfo } from "../../../contexts/UsersInfoContext";
import { useComment } from "../PostContext";
import ModifierOuSupprimer from "./modifierOuSupprimer/ModifierOuSupprimer";
import LikeContainer from "./LikeContainer";
import CommentBlock from "./commentaires/CommentBlock";

const SinglePostDisplay = ({ thisPost, thisUser, lastItemElementRef }) => {
    const [updatedAt, setUpdatedAt] = useState();
    const [createdAt, setCreatedAt] = useState();
    const [originalPostCreatedAt, setOriginalPostCreatedAt] = useState();
    const [sharedUser, setSharedUser] = useState();
    const [editModal, setEditModal] = useState(false);
    const usersInfo = useUsersInfo();
    const my = useUser();
    const comment = useComment();
    const formatedText = (txt) => {
        return { __html: txt };
    };

    useEffect(() => {
        usersInfo &&
            thisPost &&
            thisPost.hasOwnProperty("sharedUserId") &&
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
            thisPost.texte &&
            (thisPost.texte = thisPost.texte
                .trim()
                .split("\u000A")
                .join("</p><p>"));
    }, [thisPost]);

    useEffect(() => {
        thisPost &&
            thisPost.createdAt &&
            setCreatedAt(localeDateFromDate(thisPost.createdAt));
        thisPost &&
            thisPost.originalPostCreatedAt &&
            setOriginalPostCreatedAt(
                localeDateFromDate(thisPost.originalPostCreatedAt)
            );
        thisPost &&
            thisPost.updatedAt &&
            setUpdatedAt(localeDateFromDate(thisPost.createdAt));
    }, [thisPost]);

    const handleEdit = () => {
        setEditModal(!editModal);
    };

    return (
        <article
            ref={lastItemElementRef}
            className="singlePost"
            id={thisPost && thisPost._id}
        >
            <div className="creatorInfo">
                <div className="wrapper">
                    {thisUser ? (
                        <img
                            className="imgUser"
                            src={thisUser.avatar}
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
                        {thisUser && (
                            <p>
                                Par <strong>{thisUser.pseudo}</strong>&nbsp;
                            </p>
                        )}
                        <p> {createdAt}</p>
                        {updatedAt !== createdAt && (
                            <p>(Modifié {updatedAt})</p>
                        )}
                    </div>
                </div>
                {thisPost && my && thisPost.userId === my._id && (
                    <div className="wrapper">
                        {editModal && (
                            <ModifierOuSupprimer setEditModal={setEditModal} />
                        )}
                        <button
                            className="modifierOuSupprimer"
                            onClick={handleEdit}
                        >
                            <i className="fa-solid fa-ellipsis"></i>
                        </button>
                    </div>
                )}
            </div>
            <div className="postContainer">
                {thisPost && thisPost.texte && (
                    <p
                        dangerouslySetInnerHTML={formatedText(thisPost.texte)}
                    ></p>
                )}
                {thisPost && thisPost.image && (
                    <img
                        className="imgPost"
                        src={thisPost.image}
                        alt="illustration"
                    />
                )}
            </div>
            {sharedUser && (
                <>
                    <div className="creatorInfo shared">
                        <div className="wrapper">
                            {sharedUser ? (
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
                                {sharedUser && (
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
                        {sharedUser && thisPost.sharedTexte && (
                            <p
                                dangerouslySetInnerHTML={formatedText(
                                    thisPost.sharedTexte
                                )}
                            ></p>
                        )}
                        {sharedUser && thisPost.sharedImage && (
                            <img
                                className="imgPost"
                                src={thisPost.sharedImage}
                                alt="illustration"
                            />
                        )}
                    </div>
                </>
            )}
            <LikeContainer />
            {comment && <CommentBlock />}
        </article>
    );
};

export default SinglePostDisplay;
