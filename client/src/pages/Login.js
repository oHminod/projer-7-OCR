import React from "react";
import BackgroundLogoSvg from "../components/BackgroundLogoSvg";
import LoginSignupModal from "../components/LoginSignupModal";

const Login = () => {
    return (
        <div className="login">
            <BackgroundLogoSvg />
            <div className="loginModal">
                <LoginSignupModal />
            </div>
        </div>
    );
};

export default Login;
