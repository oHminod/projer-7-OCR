import React, { useEffect } from "react";
import LoginSignupModal from "../components/layouts/login/LoginSignupModal";
import { motion } from "framer-motion";
import { useAuth } from "../components/context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const token = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        token && navigate("/home");
    }, [token, navigate]);
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
            <div className="loginModal">
                <LoginSignupModal />
            </div>
        </motion.div>
    );
};

export default Login;
