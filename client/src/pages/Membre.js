import React from "react";
import { Navigate } from "react-router-dom";
import BackgroundLogoSvg from "../components/BackgroundLogoSvg";
import { useAuth } from "../components/context/AuthContext";
import Header from "../components/Header";
// import Navigation from "../components/Navigation";
import UserInfo from "../components/UserInfo";

const Membre = () => {
    const auth = useAuth();

    return auth ? (
        <div className="membre">
            <BackgroundLogoSvg />
            <div className="content">
                <Header />
                <UserInfo />
            </div>
        </div>
    ) : (
        <Navigate to="/home" />
    );
};

export default Membre;
