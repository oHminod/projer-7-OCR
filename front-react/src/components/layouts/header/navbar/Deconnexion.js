import React from "react";
import useLogout from "../../../utils/useLogout";
import "./Deconnexion.scss";

const Deconnexion = () => {
    const { logout } = useLogout();

    return (
        <button className="Deconnexion" onClick={logout} title="Déconnexion">
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
        </button>
    );
};

export default Deconnexion;
