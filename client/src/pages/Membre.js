import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../components/context/AuthContext";
import Navigation from "../components/Navigation";
import UserInfo from "../components/UserInfo";

const Membre = () => {
    const auth = useAuth();

    return auth ? (
        <div>
            <Navigation />
            <UserInfo />
        </div>
    ) : (
        <Navigate to="/home" />
    );
};

export default Membre;
