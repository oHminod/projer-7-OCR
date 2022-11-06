import React, { useEffect, useState } from "react";
import localeDateFromDate from "../../../../utils/localeDateFromDate";
import { useNewUsersInfo } from "../../../context/NewUsersInfoContext";
// import { useUsersInfo } from "../../../context/UsersInfoContext";
import { useComment, usePost } from "../PostContext";
import CommentBlock from "./commentaires/CommentBlock";
import LikeContainer from "./LikeContainer";
import "./SinglePost.scss";

const SinglePost = () => {
    const [updatedAt, setUpdatedAt] = useState();
    const [createdAt, setCreatedAt] = useState();
    const [thisUser, setThisUser] = useState();
    const [checkedUser, setCheckedUser] = useState();
    const thisPost = usePost();
    const usersInfo = useNewUsersInfo();
    const comment = useComment();
    const formatedText = (txt) => {
        return { __html: txt };
    };

    useEffect(() => {
        usersInfo &&
            thisPost &&
            setCheckedUser(
                usersInfo.find(
                    (findUser) => findUser.userId === thisPost.userId
                )
            );
        checkedUser && setThisUser(checkedUser);
    }, [usersInfo, checkedUser, thisPost]);

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
            thisPost.updatedAt &&
            setUpdatedAt(localeDateFromDate(thisPost.createdAt));
    }, [thisPost]);

    return (
        <article className="singlePost" id={thisPost && thisPost._id}>
            <div className="creatorInfo">
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
                    {updatedAt !== createdAt && <p>(Modifié {updatedAt})</p>}
                </div>
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
            <LikeContainer />
            {comment && <CommentBlock />}
        </article>
    );
};

export default SinglePost;
