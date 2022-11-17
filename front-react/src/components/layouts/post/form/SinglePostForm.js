import React, { useState } from "react";
import { useAxiosPostPost } from "../../../../utils/axiosCalls";
import { useUser } from "../../../contexts/UserContext";
import InputFile from "./InputFile";
import "./SinglePostForm.scss";
import TextArea from "./TextArea";

const SinglePostForm = () => {
    const user = useUser();
    const [resetTextInput, setResetTextInput] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [dbError, setDbError] = useState();
    const [text, setText] = useState();
    const [newPost, setNewPost] = useState({});
    const [go, setGo] = useState(false);

    useAxiosPostPost(newPost, setDbError, go, setGo);

    const submitNewPost = (e) => {
        e.preventDefault();
        if (!text && !selectedImage) return;

        let obj = {};
        obj.userId = user._id;
        obj.userAvatar = user.avatar;
        obj.userPseudo = user.pseudo;
        selectedImage && (obj.image = URL.createObjectURL(selectedImage));
        text && (obj.texte = text);

        if (selectedImage) {
            const data = new FormData();
            data.append("imagePost", selectedImage);
            data.append("post", JSON.stringify(obj));

            setNewPost(data);
        } else {
            setNewPost(obj);
        }
        setGo(true);
        setText();
        setResetTextInput(true);
        setSelectedImage(null);
    };

    const setImage = (e) => {
        setSelectedImage(e.target.files[0]);
    };

    return (
        <form onSubmit={submitNewPost} method="post" id="postForm">
            <TextArea
                name="textePost"
                setText={setText}
                resetTextInput={resetTextInput}
                setResetTextInput={setResetTextInput}
                submitNewPost={submitNewPost}
                placeholder="Publier un statut"
            />
            <button type="submit" className="success">
                Envoyer
            </button>
            {selectedImage && (
                <img
                    alt="post"
                    width="200"
                    height="200"
                    src={URL.createObjectURL(selectedImage)}
                />
            )}
            <InputFile name="imagePost" setImage={setImage} />
            {dbError && <p className="error">{dbError}</p>}
        </form>
    );
};

export default SinglePostForm;
