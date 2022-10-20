import React, { useState } from "react";
import LoginForm from "./forms/LoginForm";
import SignUpForm from "./forms/SignUpForm";
import LogoOrigin from "./LogoOrigin";
import { motion } from "framer-motion";

export const LoginSignupModal = () => {
    const [connexion, setConnexion] = useState(true);

    return (
        <motion.div layout className="loginSignupModal">
            {connexion ? (
                <>
                    <div className="logo">
                        <LogoOrigin />
                    </div>
                    <p>
                        Bienvenue sur le réseau social des employés de
                        Groupomania&nbsp;!&nbsp;🚀
                    </p>
                    <LoginForm />
                    <p>ou</p>
                    <button
                        className="nav-modal"
                        onClick={() => setConnexion(false)}
                    >
                        Créer un compte
                    </button>
                </>
            ) : (
                <>
                    <div className="logo">
                        <LogoOrigin />
                    </div>
                    <h2>Inscription</h2>
                    <SignUpForm />
                    <button
                        className="nav-modal"
                        onClick={() => setConnexion(true)}
                    >
                        Retour à la connexion
                    </button>
                </>
            )}
        </motion.div>
    );
};

export default LoginSignupModal;
