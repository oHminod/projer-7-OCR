import React from "react";

const EditPost = ({ setUpdateMode }) => {
    const handleClick = () => {
        setUpdateMode((prev) => !prev);
    };
    return (
        <button className="mod-supp" onClick={handleClick}>
            Modifer
        </button>
    );
};

export default EditPost;
