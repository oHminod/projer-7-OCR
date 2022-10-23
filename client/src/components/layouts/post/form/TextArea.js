import React, { useEffect, useRef } from "react";

const TextArea = ({
    name,
    setText,
    resetTextInput,
    setResetTextInput,
    submitNewPost,
}) => {
    const inputText = useRef();

    const handleChange = () => {
        setResetTextInput(false);
        const text = inputText.current.value;
        setText(text);
    };

    const handleKeyDown = (e) => {
        if (e.keyCode === 13 && !e.shiftKey) {
            submitNewPost(e);
            return false;
        }
    };

    useEffect(() => {
        resetTextInput && (inputText.current.value = "");
    }, [resetTextInput]);

    return (
        <textarea
            name={name}
            id={name}
            ref={inputText}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            cols="30"
            rows="10"
        ></textarea>
    );
};

export default TextArea;
