import React, { useState } from "react";
import {
    axiosPostPostWithImage,
    axiosPostPostWithoutImage,
} from "../../../../utils/axiosCalls";
import { useAuth } from "../../../context/AuthContext";
import { useUser } from "../../../context/UserContext";
import InputFile from "./InputFile";
import "./SinglePostForm.scss";
import TextArea from "./TextArea";

const SinglePostForm = () => {
    const user = useUser();
    const [resetTextInput, setResetTextInput] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [dbError, setDbError] = useState();
    const token = useAuth();
    const [text, setText] = useState();

    const submitNewPost = (e) => {
        e.preventDefault();
        // const pseudo = inputPseudo.current.value;
        if (!text && !selectedImage) return;

        let obj = {};
        obj.userId = user._id;
        obj.userAvatar = user.avatar;
        obj.userPseudo = user.pseudo;
        selectedImage && (obj.image = URL.createObjectURL(selectedImage));
        text && (obj.texte = text);
        console.log(obj);

        if (selectedImage) {
            const data = new FormData();
            data.append("imagePost", selectedImage);
            data.append("post", JSON.stringify(obj));

            axiosPostPostWithImage(token, data, setDbError);
        } else {
            axiosPostPostWithoutImage(token, obj, setDbError);
        }
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
