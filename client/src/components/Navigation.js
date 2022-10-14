import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Deconnexion from "./Deconnexion";

const Navigation = () => {
    const authToken = useAuth();

    return (
        <div className="navigation">
            <ul>
                <NavLink
                    to="/home"
                    className={(nav) => (nav.isActive ? "nav-active" : "")}
                >
                    <li>Accueil</li>
                </NavLink>
                {authToken && (
                    <NavLink
                        to="/membre"
                        className={(nav) => (nav.isActive ? "nav-active" : "")}
                    >
                        <li>Page membre</li>
                    </NavLink>
                )}
            </ul>
            {authToken && <Deconnexion />}
        </div>
    );
};

export default Navigation;
