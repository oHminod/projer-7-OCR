import React from "react";
import { useAuthUpdate } from "./context/AuthContext";

const Deconnexion = () => {
    const setToken = useAuthUpdate();

    const deconnexion = () => {
        window.localStorage.removeItem("token_groupomania");
        window.localStorage.removeItem("userId_groupomania");
        setToken();
    };

    return (
        <button className="Deconnexion" onClick={deconnexion}>
            Deconnexion
        </button>
    );
};

export default Deconnexion;
