import axios from "axios";
import React, { useRef, useState } from "react";
import { useAuth } from "./context/AuthContext";
import { useEditUpdate } from "./context/EditContext";
import { useUser, useUserUpdate } from "./context/UserContext";

const UserChangeInfo = () => {
    const user = useUser();
    const setUser = useUserUpdate();
    const inputPseudo = useRef();
    const inputEmail = useRef();
    const setModifier = useEditUpdate();
    const [selectedImage, setSelectedImage] = useState(null);
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
        // selectedImage && (obj.file = selectedImage);
        setUser({ ...user, ...obj });

        if (selectedImage) {
            const data = new FormData();
            data.append("file", selectedImage);
            data.append("user", JSON.stringify(obj));
            console.log(data.getAll("file"));
            const headers = {
                Authorization: `Bearer ${token}`,
                // accept: "application/json",
                "Content-Type": `multipart/form-data`,
            };
            axios
                .post(`http://localhost:36600/setuser/${user._id}`, data, {
                    headers,
                })
                .then(() => {})
                .catch((err) => {
                    console.log(err.response.data);
                });
        } else {
            const headers = {
                Authorization: `Bearer ${token}`,
            };
            axios
                .post(`http://localhost:36600/setuser/${user._id}`, obj, {
                    headers,
                })
                .then(() => {})
                .catch((err) => {
                    console.log(err.response.data);
                });
        }

        inputPseudo.current.value = "";
        inputEmail.current.value = "";
        setModifier(false);
    };

    const setImage = (e) => {
        setSelectedImage(e.target.files[0]);
    };

    const verifEmail = (emailString) => {
        let re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/;
        if (re.test(emailString) && emailString !== "") {
            // setEmailOk(true);
            document.getElementById("userEmail").style.backgroundColor =
                "lightgreen";
        } else if (emailString === "") {
            document.getElementById("userEmail").style.backgroundColor =
                "transparent";
        } else {
            // setEmailOk(false);
            document.getElementById("userEmail").style.backgroundColor =
                "#ffab9b";
        }
        return re.test(emailString);
    };

    return (
        <>
            <form onSubmit={submitNewInfos} method="post">
                {selectedImage ? (
                    <img
                        alt="not fount"
                        width="200"
                        height="200"
                        src={URL.createObjectURL(selectedImage)}
                    />
                ) : (
                    <img
                        src={user.avatar}
                        alt="avatar"
                        width="200"
                        height="200"
                    />
                )}

                <label htmlFor="file" className="label-file">
                    Choisir une image
                </label>
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
                />
                <button type="submit" className="success">
                    Enregistrer
                </button>
            </form>
        </>
    );
};

export default UserChangeInfo;
