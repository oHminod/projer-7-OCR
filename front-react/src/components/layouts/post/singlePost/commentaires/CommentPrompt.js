import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { postCommentWithoutImage } from "../../../../../utils/axiosCalls";
import { useUser } from "../../../../contexts/UserContext";
import { usePost } from "../../PostContext";
import "./CommentPrompt.scss";
import ResponseTextArea from "./reponses/ResponseTextArea";

const CommentPrompt = () => {
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
            threadId: commentId,
            text: text,
        };
        postCommentWithoutImage(comment);
        // inputComment.current.value = "";
        setText();
        setResetTextInput(true);

        // console.log(comment);
    };
    // const handleChange = () => {
    //     setText(inputComment.current.value);
    // };

    return (
        <div className="commentPrompt">
            {user && <img src={user.avatar} alt={"avatar" + user.pseudo} />}
            <form onSubmit={submitComment} method="post" id="postComment">
                {/* <input
                    autoFocus
                    type="text"
                    ref={inputComment}
                    placeholder="Votre commentaire..."
                    onChange={handleChange}
                /> */}
                <ResponseTextArea
                    name="texteReponse"
                    setText={setText}
                    resetTextInput={resetTextInput}
                    setResetTextInput={setResetTextInput}
                    submitNewPost={submitComment}
                    placeholder="Votre commentaire"
                />
            </form>
        </div>
    );
};

export default CommentPrompt;
