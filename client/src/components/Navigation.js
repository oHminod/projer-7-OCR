import React from "react";
import { NavLink } from "react-router-dom";
import Deconnexion from "./Deconnexion";

const Navigation = () => {
    return (
        <div className="navigation">
            <ul>
                <NavLink
                    to="/home"
                    className={(nav) => (nav.isActive ? "nav-active" : "")}
                >
                    <li>Fil d'actu</li>
                </NavLink>
                <NavLink
                    to="/membre"
                    className={(nav) => (nav.isActive ? "nav-active" : "")}
                >
                    <li>Page membre</li>
                </NavLink>
                <NavLink to="/">
                    <li>
                        <Deconnexion />
                    </li>
                </NavLink>
            </ul>
        </div>
    );
};

export default Navigation;
