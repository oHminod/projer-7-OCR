import React from "react";
import { motion } from "framer-motion";
import LoginForm from "../forms/LoginForm";
import LogoOrigin from "../../svg/LogoOrigin";

const MotionLogin = ({ setConnexion }) => {
    return (
        <motion.div
            layout
            initial={{ y: -700 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.3 }}
            className="motionDiv"
        >
            <div className="logo">
                <LogoOrigin />
            </div>
            <p>
                Bienvenue sur le réseau social des employés de
                Groupomania&nbsp;!&nbsp;🚀
            </p>
            <LoginForm />
            <p>ou</p>
            <button className="nav-modal" onClick={() => setConnexion(false)}>
                Créer un compte
            </button>
        </motion.div>
    );
};

export default MotionLogin;
