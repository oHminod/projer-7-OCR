import React, { useEffect, useState } from "react";
import { getAvatarAndPseudo } from "../../../../utils/axiosCalls";
import localeDateFromDate from "../../../../utils/localeDateFromDate";
import { useAuth } from "../../../context/AuthContext";
import { useUserInfo, useUserInfoUpdate } from "../UserInfoContext";
import CommentBlock from "./CommentBlock";
import LikeContainer from "./LikeContainer";
import "./SinglePost.scss";

const SinglePost = ({ post }) => {
    const [updatedAt, setUpdatedAt] = useState();
    const [createdAt, setCreatedAt] = useState();
    const [thisUser, setThisUser] = useState();
    const userInfo = useUserInfo();
    const setUserInfo = useUserInfoUpdate();
    const token = useAuth();
    const formatedText = (txt) => {
        return { __html: txt };
    };

    // useEffect(() => {
    //     token &&
    //         getAvatarAndPseudo(token, post.userId).then((user) =>
    //             setThisUser(user)
    //         );
    // }, [post.userId, token]);

    useEffect(() => {
        if (userInfo.length <= 0) {
            getAvatarAndPseudo(token, post.userId).then((user) => {
                setThisUser(user);
                setUserInfo([...userInfo, user]);
                // console.log("coucou1");
            });
        } else {
            for (const user of userInfo) {
                if (user.userId === post.userId) {
                    setThisUser(user);
                    // console.log("coucou3");
                }
            }
            if (!thisUser) {
                // console.log(Array.isArray(userInfo));
                getAvatarAndPseudo(token, post.userId).then((user) => {
                    setThisUser(user);
                    setUserInfo([...userInfo, user]);
                    // console.log("coucou2");
                });
            }
        }
    }, []);

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
