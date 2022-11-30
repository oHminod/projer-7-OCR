import React, { useEffect, useState } from "react";
import { useUsersInfo } from "../../../../contexts/UsersInfoContext";
import CommentLayout from "./CommentLayout";
import DisplayResponses from "./reponses/DisplayResponses";
import ResponsePrompt from "./reponses/ResponsePrompt";

const Commentaire = ({ comment }) => {
    const usersInfo = useUsersInfo();
    const [user, setUser] = useState();
    const [repondre, setRepondre] = useState(false);

    useEffect(() => {
        usersInfo &&
            usersInfo.map(
                (userInf) =>
                    userInf.userId === comment.userId && setUser(userInf)
            );
    }, [comment.userId, usersInfo]);

    return (
        <div className="commentaire">
            <CommentLayout
                comment={comment}
                setRepondre={setRepondre}
                user={user}
            />
            {repondre && (
                <ResponsePrompt
                    thisComment={comment}
                    thisCommentUser={user}
                    setRepondre={setRepondre}
                />
            )}
            <div className="reponses">
                <DisplayResponses
                    comment={comment}
                    resTargetPseudo={user && user.pseudo}
                />
            </div>
        </div>
    );
};

export default Commentaire;
