import React from "react";
import { motion } from "framer-motion";
import LogoOrigin from "../../svg/LogoOrigin";
import SignUpForm from "../forms/SignUpForm";
import { useLoginUpdate } from "../LoginContext";

const MotionSignup = () => {
    const setConnexion = useLoginUpdate();
    return (
        <motion.div
            layout
            initial={{ y: -700 }}
            animate={{ y: 0 }}
            // exit={{ y: 800 }}
            transition={{ duration: 0.3 }}
            className="motionDiv"
        >
            <div className="logo">
                <LogoOrigin />
            </div>
            <h2>Inscription</h2>
            <SignUpForm />
            <button className="nav-modal" onClick={() => setConnexion(true)}>
                Retour à la connexion
            </button>
        </motion.div>
    );
};

export default MotionSignup;
