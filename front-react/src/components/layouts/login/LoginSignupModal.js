import React, { useState } from "react";
import { motion } from "framer-motion";
import "./loginsignupmodal.scss";
import MotionLogin from "./motion/MotionLogin";
import MotionSignup from "./motion/MotionSignup";

export const LoginSignupModal = () => {
    const [connexion, setConnexion] = useState(true);

    return (
        <motion.div layout className="loginSignupModal">
            {connexion ? (
                <MotionLogin setConnexion={setConnexion} />
            ) : (
                <MotionSignup setConnexion={setConnexion} />
            )}
        </motion.div>
    );
};

export default LoginSignupModal;
