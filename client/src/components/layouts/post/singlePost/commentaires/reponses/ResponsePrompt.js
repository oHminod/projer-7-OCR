import React, { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { postCommentWithoutImage } from "../../../../../../utils/axiosCalls";
import { useAuth } from "../../../../../context/AuthContext";
import { useUser } from "../../../../../context/UserContext";
import { usePost } from "../../../PostContext";
import "../CommentPrompt.scss";

const ResponsePrompt = ({ thisComment }) => {
    const user = useUser();
    const thisPost = usePost();
    const token = useAuth();
    const [text, setText] = useState();
    const inputComment = useRef();

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
        postCommentWithoutImage(token, comment);
        inputComment.current.value = "";

        // console.log(comment);
    };
    const handleChange = () => {
        setText(inputComment.current.value);
    };

    return (
        <div className="commentPrompt">
            {user && <img src={user.avatar} alt={"avatar" + user.pseudo} />}
            <form onSubmit={submitComment} method="post" id="postComment">
                <input
                    type="text"
                    ref={inputComment}
                    placeholder="Votre commentaire..."
                    onChange={handleChange}
                />
            </form>
        </div>
    );
};

export default ResponsePrompt;
