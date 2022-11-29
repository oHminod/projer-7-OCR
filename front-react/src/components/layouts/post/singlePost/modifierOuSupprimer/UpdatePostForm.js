import React, { useEffect, useRef, useState } from "react";
import useUpdatePost from "../../../../../hooks/useUpdatePost";
import "../../form/SinglePostForm.scss";
import { usePost } from "../../PostContext";

const UpdatePostForm = ({ setUpdateMode, setEditModal }) => {
    const thisPost = usePost();
    const inputText = useRef();
    const [text, setText] = useState("");
    const { setGoUpdate, setIdUpdate, setQuery } = useUpdatePost(
        setEditModal,
        setUpdateMode
    );

    useEffect(() => {
        setText(thisPost.texte);
    }, [thisPost.texte]);

    const handleTextChange = (e) => {
        setText(inputText.current.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIdUpdate(thisPost._id);
        setQuery({ ...thisPost, texte: text });
        setGoUpdate(true);
    };

    const handleKeyDown = (e) => {
        if (e.keyCode === 13 && !e.shiftKey) {
            handleSubmit(e);
            return false;
        }
    };

    return (
        <form onSubmit={handleSubmit} className="postForm">
            <textarea
                name="updatePost"
                id="updatePost"
                ref={inputText}
                value={text}
                onChange={handleTextChange}
                onKeyDown={handleKeyDown}
            ></textarea>
            <button type="submit" className="success">
                Envoyer
            </button>
        </form>
    );
};

export default UpdatePostForm;
