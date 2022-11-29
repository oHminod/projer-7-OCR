import React, { useEffect, useRef, useState } from "react";
import useUpdateComment from "../../../../../hooks/useUpdateComment";

const UpdatePrompt = ({ comment, setModifier }) => {
    const inputText = useRef();
    const [updateText, setUpdateText] = useState();
    const { setGoUpdate, setIdUpdate, setQuery } =
        useUpdateComment(setModifier);

    useEffect(() => {
        comment && setUpdateText(comment.text);
    }, [comment]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIdUpdate(comment._id);
        setQuery({ ...comment, text: updateText });
        setGoUpdate(true);
    };

    const handleTextChange = () => {
        setUpdateText(inputText.current.value);
    };

    const handleKeyDown = (e) => {
        if (e.keyCode === 13 && !e.shiftKey) {
            handleSubmit(e);
            return false;
        }
    };

    return (
        <textarea
            name="updatePrompt"
            className="prompt"
            ref={inputText}
            value={updateText}
            onChange={handleTextChange}
            onKeyDown={handleKeyDown}
        ></textarea>
    );
};

export default UpdatePrompt;
