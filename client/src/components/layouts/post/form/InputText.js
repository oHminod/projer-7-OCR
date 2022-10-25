import React, { useRef } from "react";

const InputText = ({ placeholder, setText }) => {
    const inputText = useRef();
    const handleChange = () => {
        const text = inputText.current.value;
        setText(text);
    };
    return (
        <input
            type="text"
            ref={inputText}
            placeholder={placeholder}
            onChange={handleChange}
        />
    );
};

export default InputText;
