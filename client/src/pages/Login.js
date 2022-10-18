import React from "react";
import BackgroundLogoSvg from "../components/BackgroundLogoSvg";
import LoginSignupModal from "../components/LoginSignupModal";
import { motion } from "framer-motion";

const Login = () => {
    return (
        <motion.div
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
            <BackgroundLogoSvg />
            <div className="loginModal">
                <LoginSignupModal />
            </div>
        </motion.div>
    );
};

export default Login;
