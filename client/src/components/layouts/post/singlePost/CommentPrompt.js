import React, { useState } from "react";
import { useUser } from "../../../context/UserContext";
import InputText from "../form/InputText";
import "./CommentPrompt.scss";

const CommentPrompt = () => {
    const user = useUser();
    const [text, setText] = useState();

    const submitComment = (e) => {
        e.preventDefault();
        console.log(text);
    };

    return (
        <div className="commentPrompt">
            {user && <img src={user.avatar} alt={"avatar" + user.pseudo} />}
            <form onSubmit={submitComment} method="post" id="postComment">
                <InputText
                    placeholder="Votre commentaire..."
                    setText={setText}
                />{" "}
            </form>
        </div>
    );
};

export default CommentPrompt;
