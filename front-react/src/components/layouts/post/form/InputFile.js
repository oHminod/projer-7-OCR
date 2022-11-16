import React from "react";

const InputFile = ({ name, setImage }) => {
    return (
        <>
            <label htmlFor={name} className="label-file">
                <i className="fa-regular fa-image"></i>{" "}
            </label>
            <input
                id={name}
                name={name}
                className="input-file"
                type="file"
                onChange={setImage}
            />
        </>
    );
};

export default InputFile;
