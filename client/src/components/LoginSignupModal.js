import React, { useState } from "react";
import LoginForm from "./forms/LoginForm";
import SignUpForm from "./forms/SignUpForm";
import LogoOrigin from "./LogoOrigin";

export const LoginSignupModal = () => {
    const [connexion, setConnexion] = useState(true);

    return (
        <div className="loginSignupModal">
            {connexion ? (
                <>
                    <div className="logo">
                        <LogoOrigin />
                    </div>
                    <p>
                        Bienvenue sur le réseau social des employés de
                        Groupomania ! 🚀
                    </p>
                    <LoginForm />
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
        </div>
    );
};

export default LoginSignupModal;
