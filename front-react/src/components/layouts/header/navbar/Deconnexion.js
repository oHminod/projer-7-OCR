import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthUpdate } from "../../../contexts/AuthContext";
import { useUserUpdate } from "../../../contexts/UserContext";
// import { useSocket } from "../../context/SocketContext";
import "./Deconnexion.scss";

const Deconnexion = () => {
    const setToken = useAuthUpdate();
    const setUser = useUserUpdate();
    const navigate = useNavigate();
    // const socket = useSocket();

    const deconnexion = () => {
        setToken("");
        setUser("");
        // socket.disconnect();
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
