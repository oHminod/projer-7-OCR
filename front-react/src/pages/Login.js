import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import LoginSignupModal from "../components/layouts/login/LoginSignupModal";
import { useAuth } from "../components/contexts/AuthContext";
import BackgroundLogoSvg from "../components/layouts/svg/BackgroundLogoSvg";

const Login = () => {
    const token = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        token && navigate("/home");
    }, [token, navigate]);

    return (
        <motion.main
            className="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
                opacity: { duration: 0.3, ease: "easeInOut" },
            }}
            exit={{
                opacity: 0,
            }}
        >
            <div className="loginModal">
                <BackgroundLogoSvg />
                <LoginSignupModal />
            </div>
        </motion.main>
    );
};

export default Login;
