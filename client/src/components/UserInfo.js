import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "./context/AuthContext";

const UserInfo = () => {
    const [userID, setUserID] = useState("");
    const token = useAuth();

    useEffect(() => {
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
            .get(`http://localhost:36500/membre/${userId}`, config)
            .then((res) => {
                setUserID(res.data._id);
            })
            .catch((err) => {
                console.log(err.response.data);
            });
    }, [token]);

    return userID && <p>ID du membre : {userID}</p>;
};

export default UserInfo;
