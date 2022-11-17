import React, { useEffect, useState } from "react";
import localeDateFromDate from "../../../../utils/localeDateFromDate";
import { useUser } from "../../../contexts/UserContext";
import { useUsersInfo } from "../../../contexts/UsersInfoContext";
import { usePost } from "../PostContext";
import ModifierOuSupprimer from "./modifierOuSupprimer/ModifierOuSupprimer";

const PostPart = () => {
    const [updatedAt, setUpdatedAt] = useState();
    const [createdAt, setCreatedAt] = useState();
    const [thisUser, setThisUser] = useState();
    const [editModal, setEditModal] = useState(false);
    const [tabTexte, setTabTexte] = useState([]);
    const usersInfo = useUsersInfo();
    const my = useUser();
    const thisPost = usePost();

    useEffect(() => {
        usersInfo &&
            thisPost &&
            setThisUser(
                usersInfo.find(
                    (findUser) => findUser.userId === thisPost.userId
                )
            );
    }, [usersInfo, thisPost]);

    useEffect(() => {
        thisPost &&
            thisPost.texte &&
            setTabTexte(
                thisPost.texte
                    .trim()
                    .split("\u000A")
                    .filter((p) => p !== "")
            );
        thisPost && thisPost.texte && (thisPost.texte = thisPost.texte.trim());
    }, [thisPost]);

    useEffect(() => {
        thisPost &&
            thisPost.createdAt &&
            setCreatedAt(localeDateFromDate(thisPost.createdAt));
        thisPost &&
            thisPost.updatedAt &&
            setUpdatedAt(localeDateFromDate(thisPost.createdAt));
    }, [thisPost]);
    const handleEdit = () => {
        setEditModal(!editModal);
    };
    return (
        <>
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
                {thisPost && thisPost.texte && tabTexte.length > 0 ? (
                    tabTexte.map((paragraphe, index) => (
                        <p key={index}>{paragraphe}</p>
                    ))
                ) : (
                    <p>{thisPost && thisPost.texte}</p>
                )}
                {thisPost && thisPost.image && (
                    <img
                        className="imgPost"
                        src={thisPost.image}
                        alt="illustration"
                    />
                )}
            </div>
        </>
    );
};

export default PostPart;
