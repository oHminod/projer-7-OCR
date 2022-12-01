import React, { useEffect, useState } from "react";
import CommentBlockActions from "./CommentBlockActions";
import UpdatePrompt from "./UpdatePrompt";

const CommentLayout = ({ comment, setRepondre, user, resTargetPseudo }) => {
    const [tabTexte, setTabTexte] = useState([]);
    const [modifier, setModifier] = useState(false);

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

    const text =
        comment.text &&
        tabTexte.map((paragraphe, index) => <p key={index}>{paragraphe}</p>);

    if (!user) return null;
    return (
        <>
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
                            <p>
                                <strong>{user.pseudo}</strong>
                                {resTargetPseudo && (
                                    <strong>
                                        <span> pour </span>
                                        {resTargetPseudo}
                                    </strong>
                                )}
                            </p>
                            {modifier ? (
                                <UpdatePrompt
                                    comment={comment}
                                    setModifier={setModifier}
                                />
                            ) : (
                                <div className="comment">{text}</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <CommentBlockActions
                comment={comment}
                setRepondre={setRepondre}
                setModifier={setModifier}
            />
        </>
    );
};

export default CommentLayout;
