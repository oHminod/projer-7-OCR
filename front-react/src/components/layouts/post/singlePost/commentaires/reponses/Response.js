import React, { useEffect, useState } from "react";
import ResponsePrompt from "./ResponsePrompt";
import "./response.scss";
import DisplayResponses from "./DisplayResponses";
import { useUsersInfo } from "../../../../../contexts/UsersInfoContext";
import CommentLayout from "../CommentLayout";

const Response = ({ reponse, resTargetPseudo }) => {
    const usersInfo = useUsersInfo();
    const [user, setUser] = useState();
    const [repondre, setRepondre] = useState(false);

    useEffect(() => {
        usersInfo &&
            usersInfo.map(
                (userInf) =>
                    userInf.userId === reponse.userId && setUser(userInf)
            );
    }, [reponse.userId, usersInfo]);

    return (
        <div className="reponse" key={reponse.threadId}>
            <CommentLayout
                comment={reponse}
                setRepondre={setRepondre}
                user={user}
                resTargetPseudo={resTargetPseudo}
            />

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
    );
};

export default Response;
