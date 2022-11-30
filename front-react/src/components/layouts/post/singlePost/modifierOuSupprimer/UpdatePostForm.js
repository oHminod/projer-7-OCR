import React, { useEffect, useRef, useState } from "react";
import useUpdatePost from "../../../../../hooks/useUpdatePost";
import InputFile from "../../form/InputFile";
import "../../form/SinglePostForm.scss";
import { usePost } from "../../PostContext";

const UpdatePostForm = ({ setUpdateMode, setEditModal }) => {
    const thisPost = usePost();
    const inputText = useRef();
    const [text, setText] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
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
        if (selectedImage) {
            const data = new FormData();
            data.append("imageUpdatePost", selectedImage);
            data.append("post", JSON.stringify({ ...thisPost, texte: text }));

            setIdUpdate(thisPost._id);
            setQuery(data);
            setGoUpdate(true);
        } else {
            setIdUpdate(thisPost._id);
            setQuery({ ...thisPost, texte: text });
            setGoUpdate(true);
        }
    };

    const handleKeyDown = (e) => {
        if (e.keyCode === 13 && !e.shiftKey) {
            handleSubmit(e);
            return false;
        }
    };

    const setImage = (e) => {
        setSelectedImage(e.target.files[0]);
    };

    return (
        <form onSubmit={handleSubmit} className="postForm">
            <textarea
                className="updatePost"
                name="updatePost"
                ref={inputText}
                value={text}
                onChange={handleTextChange}
                onKeyDown={handleKeyDown}
            ></textarea>
            <button type="submit" className="success">
                Envoyer
            </button>
            {selectedImage ? (
                <img
                    alt="post"
                    width="200"
                    height="200"
                    src={URL.createObjectURL(selectedImage)}
                />
            ) : (
                thisPost.image && (
                    <img
                        alt="post"
                        width="200"
                        height="200"
                        src={thisPost.image}
                    />
                )
            )}
            <InputFile name="imageUpdatePost" setImage={setImage} />
        </form>
    );
};

export default UpdatePostForm;
