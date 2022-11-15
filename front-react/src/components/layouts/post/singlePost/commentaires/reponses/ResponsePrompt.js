import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { postCommentWithoutImage } from "../../../../../../utils/axiosCalls";
import { useUser } from "../../../../../contexts/UserContext";
import { usePost } from "../../../PostContext";
import "../CommentPrompt.scss";
import ResponseTextArea from "./ResponseTextArea";

const ResponsePrompt = ({ thisComment, thisCommentUser }) => {
    const user = useUser();
    const thisPost = usePost();
    const [text, setText] = useState();
    // const inputComment = useRef();
    const [resetTextInput, setResetTextInput] = useState(false);

    const submitComment = (e) => {
        e.preventDefault();
        const commentId = uuidv4();
        const comment = {
            userId: user._id,
            postId: thisPost._id,
            commentId: commentId,
            threadId: thisComment.commentId,
            text: text,
        };
        postCommentWithoutImage(comment);
        setResetTextInput(true);
        setText();
        // inputComment.current.value = "";

        // console.log(comment);
    };
    // const handleChange = () => {
    //     setText(inputComment.current.value);
    // };

    return (
        <div className="commentPrompt">
            {user && <img src={user.avatar} alt={"avatar" + user.pseudo} />}
            <form onSubmit={submitComment} method="post" id="postComment">
                {/* <textArea
                    autoFocus
                    type="text"
                    ref={inputComment}
                    placeholder={
                        thisCommentUser &&
                        `Répondre à ${thisCommentUser.pseudo}`
                    }
                    onChange={handleChange}
                /> */}
                <ResponseTextArea
                    name="texteReponse"
                    setText={setText}
                    resetTextInput={resetTextInput}
                    setResetTextInput={setResetTextInput}
                    submitNewPost={submitComment}
                    placeholder={
                        thisCommentUser &&
                        `Répondre à ${thisCommentUser.pseudo}`
                    }
                />
            </form>
        </div>
    );
};

export default ResponsePrompt;
