import React, { useEffect, useRef, useState } from "react";
import verifEmail from "../../../../utils/verifEmail";
import { useUser } from "../../../contexts/UserContext";
import { useAxiosSetUser } from "../../../../utils/axiosCalls";
/**
 * Composant gérant le formulaire de modification de l'utilisateur
 * @param {bool} setModifier permet de désactiver le formulaire de
 * modification quand la requête est complétée.
 * @returns le formulaire de modification de l'utilisateur
 */
const UserChangeInfo = ({ setModifier }) => {
    /**
     * utilisateur actif tiré du UserContext
     */
    const user = useUser();
    /**
     * input où l'utilisateur entre son pseudo
     */
    const inputPseudo = useRef("");
    const inputEmail = useRef("");
    const inputBio = useRef("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [bio, setBio] = useState("");
    const [newInfos, setNewInfos] = useState({});
    const [go, setGo] = useState(false);
    const [dbError, setDbError] = useState();

    let obj = {};
    useAxiosSetUser(newInfos, setDbError, go, setGo, setModifier);

    const submitNewInfos = (e) => {
        e.preventDefault();
        const pseudo = inputPseudo.current.value || user.pseudo;
        const email = inputEmail.current.value || user.email;
        const bio = inputBio.current.value || user.bio;
        if (email && !verifEmail(email)) return;
        selectedImage && (obj.avatar = URL.createObjectURL(selectedImage));
        pseudo && (obj.pseudo = pseudo);
        email && (obj.email = email);
        bio && (obj.bio = bio);

        if (selectedImage) {
            const data = new FormData();
            data.append("image", selectedImage);
            data.append("user", JSON.stringify(obj));
            setNewInfos(data);
            setGo(() => true);
        } else if (pseudo || email || bio) {
            let userInfo = {};
            userInfo.userId = user._id;
            userInfo.avatar = user.avatar;
            userInfo.email = email || user.email;
            userInfo.pseudo = pseudo || user.pseudo;
            userInfo.bio = bio || user.bio;
            setNewInfos(userInfo);
            setGo(() => true);
        }

        inputPseudo.current.value = "";
        inputEmail.current.value = "";
        inputBio.current.value = "";
    };
    /**
     * Attribut l'image sélectionnée par l'utilisateur au state selectedImage
     * @param {image} e
     */
    const setImage = (e) => {
        setSelectedImage(e.target.files[0]);
    };

    const handleEmailChange = () => {
        verifEmail(inputEmail.current.value, "userEmail");
    };

    const handleBioChange = () => {
        setBio(inputBio.current.value);
    };

    useEffect(() => {
        setBio(user.bio);
    }, [user.bio]);

    if (!user) return null;
    return (
        <form onSubmit={submitNewInfos}>
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
            <textarea
                ref={inputBio}
                placeholder="Bio"
                value={bio}
                onChange={handleBioChange}
            />
            <button onClick={submitNewInfos} className="success">
                Enregistrer
            </button>
        </form>
    );
};

export default UserChangeInfo;
