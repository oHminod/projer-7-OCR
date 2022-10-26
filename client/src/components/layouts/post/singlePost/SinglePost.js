import React, { useEffect, useState } from "react";
import localeDateFromDate from "../../../../utils/localeDateFromDate";
import { useUsersInfo } from "../../../context/UsersInfoContext";
import CommentBlock from "./CommentBlock";
import LikeContainer from "./LikeContainer";
import "./SinglePost.scss";

const SinglePost = ({ post }) => {
    const [updatedAt, setUpdatedAt] = useState();
    const [createdAt, setCreatedAt] = useState();
    const [thisUser, setThisUser] = useState();
    const usersInfo = useUsersInfo();
    const formatedText = (txt) => {
        return { __html: txt };
    };

    useEffect(() => {
        const checkedUser = usersInfo.find(
            (findUser) => findUser.userId === post.userId
        );
        if (checkedUser) {
            setThisUser(checkedUser);
        }
    }, [usersInfo, post.userId]);

    useEffect(() => {
        post.texte &&
            (post.texte = post.texte.trim().split("\u000A").join("</p><p>"));
    }, [post]);

    useEffect(() => {
        post.createdAt && setCreatedAt(localeDateFromDate(post.createdAt));
        post.updatedAt && setUpdatedAt(localeDateFromDate(post.createdAt));
    }, [post.updatedAt, post.createdAt]);

    return (
        <article className="singlePost" id={post._id}>
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
                {thisUser && (
                    <p>
                        Par <strong>{thisUser.pseudo}</strong>&nbsp;
                    </p>
                )}
                <p> {createdAt}</p>
                {updatedAt !== createdAt && <p>(Modifié {updatedAt})</p>}
            </div>
            <div className="postContainer">
                {post.texte && (
                    <p dangerouslySetInnerHTML={formatedText(post.texte)}></p>
                )}
                {post.image && (
                    <img
                        className="imgPost"
                        src={post.image}
                        alt="illustration"
                    />
                )}
            </div>
            <LikeContainer />
            <CommentBlock />
        </article>
    );
};

export default SinglePost;
