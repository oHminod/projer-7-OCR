import React from "react";
import BackgroundLogoSvg from "../components/BackgroundLogoSvg";
import { useAuth } from "../components/context/AuthContext";
import Header from "../components/Header";
import LoginSignupModal from "../components/LoginSignupModal";
// import Navigation from "../components/Navigation";

const Home = () => {
    const authToken = useAuth();

    return (
        <div className="home">
            <BackgroundLogoSvg />
            {authToken ? (
                <div className="content">
                    <Header />
                    <h2>Fil d'actu</h2>
                </div>
            ) : (
                <div className="loginModal">
                    <LoginSignupModal />
                </div>
            )}
        </div>
    );
};

export default Home;
