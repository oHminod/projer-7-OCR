import React, { useRef, useState } from "react";
import {
    axiosUserChangeInfoWithImage,
    axiosUserChangeInfoWithoutImage,
} from "../../../../utils/axiosCalls";
import verifEmail from "../../../../utils/verifEmail";
import { useAuth } from "../../../context/AuthContext";
import { useEditUpdate } from "./EditContext";
import { useUser, useUserUpdate } from "../../../context/UserContext";
import { motion } from "framer-motion";

const UserChangeInfo = () => {
    const user = useUser();
    const setUser = useUserUpdate();
    const inputPseudo = useRef();
    const inputEmail = useRef();
    const setModifier = useEditUpdate();
    const [selectedImage, setSelectedImage] = useState(null);
    const [dbError, setDbError] = useState();
    const token = useAuth();

    const submitNewInfos = (e) => {
        e.preventDefault();
        const pseudo = inputPseudo.current.value;
        const email = inputEmail.current.value;
        if (email && !verifEmail(email)) return;

        let obj = {};
        selectedImage && (obj.avatar = URL.createObjectURL(selectedImage));
        pseudo && (obj.pseudo = pseudo);
        email && (obj.email = email);

        /**
         * ! !!! Changer également les infos dans les posts de l'utilisateur !!!
         */
        if (selectedImage) {
            const data = new FormData();
            data.append("image", selectedImage);
            data.append("user", JSON.stringify(obj));

            axiosUserChangeInfoWithImage(
                token,
                user,
                data,
                setUser,
                setModifier,
                obj,
                setDbError
            );
        } else {
            axiosUserChangeInfoWithoutImage(
                token,
                user,
                obj,
                setUser,
                setModifier,
                setDbError
            );
        }

        inputPseudo.current.value = "";
        inputEmail.current.value = "";
    };

    const setImage = (e) => {
        setSelectedImage(e.target.files[0]);
    };

    const handleEmailChange = () => {
        verifEmail(inputEmail.current.value, "userEmail");
    };

    return (
        <motion.form
            layout
            animate={{ height: 423, opacity: 1 }}
            initial={{ height: 305, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onSubmit={submitNewInfos}
            method="post"
        >
            {selectedImage ? (
                <img
                    alt="nouvel avatar"
                    width="200"
                    height="200"
                    src={URL.createObjectURL(selectedImage)}
                />
            ) : (
                <img src={user.avatar} alt="avatar" width="200" height="200" />
            )}

            <label htmlFor="file" className="label-file">
                Choisir une image
            </label>
            {dbError && <p className="error">{dbError}</p>}
            <input
                id="file"
                name="file"
                className="input-file"
                type="file"
                onChange={setImage}
            ></input>
            <input
                type="text"
                ref={inputPseudo}
                placeholder={user.pseudo ? user.pseudo : "Pseudo"}
            />
            <input
                id="userEmail"
                type="text"
                ref={inputEmail}
                placeholder={user.email}
                onChange={handleEmailChange}
            />
            <button type="submit" className="success">
                Enregistrer
            </button>
        </motion.form>
    );
};

export default UserChangeInfo;
