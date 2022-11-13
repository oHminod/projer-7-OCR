import React, { useRef, useState } from "react";
import verifEmail from "../../../../utils/verifEmail";
import { motion } from "framer-motion";
import { useUser, useUserUpdate } from "../../../contexts/UserContext";
import { useAxiosSetUser } from "../../../../utils/axiosCalls";

const UserChangeInfo = ({ setModifier }) => {
    const user = useUser();
    const setUser = useUserUpdate();
    const inputPseudo = useRef("");
    const inputEmail = useRef("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [newInfos, setNewInfos] = useState({});
    const [go, setGo] = useState(false);
    const [dbError, setDbError] = useState();

    let obj = {};
    useAxiosSetUser(newInfos, setDbError, go, setGo, setModifier);

    const submitNewInfos = (e) => {
        e.preventDefault();
        const pseudo = inputPseudo.current.value;
        const email = inputEmail.current.value;
        if (email && !verifEmail(email)) return;
        selectedImage && (obj.avatar = URL.createObjectURL(selectedImage));
        pseudo && (obj.pseudo = pseudo);
        email && (obj.email = email);
        setUser((prevUser) => {
            return { ...prevUser, ...obj };
        });

        if (selectedImage) {
            const data = new FormData();
            data.append("image", selectedImage);
            data.append("user", JSON.stringify(obj));
            setNewInfos(data);
            setGo(() => true);
        } else if (pseudo || email) {
            let userInfo = {};
            userInfo.userId = user._id;
            userInfo.avatar = obj.avatar || user.avatar;
            userInfo.pseudo = pseudo || user.pseudo;
            setNewInfos(userInfo);
            setGo(() => true);
        }

        // let usersInfoCopy = [...usersInfo];
        // const thisUserIndex = usersInfoCopy
        //     .map((user) => user.userId)
        //     .indexOf(user._id);
        // usersInfoCopy[thisUserIndex] = userInfo;
        // thisUserIndex !== -1 && setUsersInfo(usersInfoCopy);
        // setModifier(false);

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
        >
            {selectedImage ? (
                <img
                    alt="nouvel avatar"
                    width="200"
                    height="200"
                    src={URL.createObjectURL(selectedImage)}
                />
            ) : (
                <img
                    src={user && user.avatar}
                    alt="avatar"
                    width="200"
                    height="200"
                />
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
                placeholder={user ? user.pseudo : "Pseudo"}
            />
            <input
                id="userEmail"
                type="text"
                ref={inputEmail}
                placeholder={user && user.email}
                onChange={handleEmailChange}
            />
            <button onClick={submitNewInfos} className="success">
                Enregistrer
            </button>
        </motion.form>
    );
};

export default UserChangeInfo;
