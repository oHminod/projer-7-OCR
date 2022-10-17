import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth, useAuthUpdate } from "./context/AuthContext";

const UserInfo = () => {
    const [userID, setUserID] = useState("");
    const token = useAuth();
    const setToken = useAuthUpdate();

    useEffect(() => {
        const deconnexion = () => {
            window.localStorage.removeItem("token_groupomania");
            window.localStorage.removeItem("userId_groupomania");
            setToken();
        };
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const userId = JSON.parse(
            window.localStorage.getItem("userId_groupomania")
        );
        if (!userId) {
            return;
        }
        axios
            .get(`http://localhost:36600/membre/${userId}`, config)
            .then((res) => {
                setUserID(res.data._id);
            })
            .catch((err) => {
                console.log(err.response.data);
                deconnexion();
            });
    }, [token, setToken]);

    return userID && <p className="UserInfo">ID du membre : {userID}</p>;
};

export default UserInfo;
