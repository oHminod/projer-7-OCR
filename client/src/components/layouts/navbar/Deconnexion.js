import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthUpdate } from "../../context/AuthContext";
import { useSocket } from "../../context/SocketContext";
import "./Deconnexion.scss";

const Deconnexion = () => {
    const setToken = useAuthUpdate();
    const navigate = useNavigate();
    const socket = useSocket();

    const deconnexion = () => {
        window.localStorage.removeItem("token_groupomania");
        window.localStorage.removeItem("userId_groupomania");
        window.localStorage.removeItem("groupomania-newUsersInfo");
        setToken();
        socket.disconnect();
        navigate("/login");
    };

    return (
        <button
            className="Deconnexion"
            onClick={deconnexion}
            title="Déconnexion"
        >
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
        </button>
    );
};

export default Deconnexion;
