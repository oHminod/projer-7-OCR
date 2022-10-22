import React from "react";
import { motion } from "framer-motion";
import "./loginSignupModal.scss";
import MotionLogin from "./motion/MotionLogin";
import MotionSignup from "./motion/MotionSignup";
import { useLogin } from "./LoginContext";

export const LoginSignupModal = () => {
    const connexion = useLogin();

    return (
        <motion.div layout className="loginSignupModal">
            {connexion ? <MotionLogin /> : <MotionSignup />}
        </motion.div>
    );
};

export default LoginSignupModal;
