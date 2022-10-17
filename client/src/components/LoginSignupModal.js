import React, { useState } from "react";
import LoginForm from "./forms/LoginForm";
import SignUpForm from "./forms/SignUpForm";
import LogoOrigin from "./LogoOrigin";

export const LoginSignupModal = () => {
    const [connexion, setConnexion] = useState(true);

    return connexion ? (
        <div className="loginSignupModal">
            <div className="logo">
                <LogoOrigin />
            </div>
            <p>
                Bienvenue sur le réseau social des employés de Groupomania ! 🚀
            </p>
            <p>
                Pas encore inscrit ?{" "}
                <button onClick={() => setConnexion(false)}>
                    Cliquer ici !
                </button>
            </p>
            <LoginForm />
        </div>
    ) : (
        <div className="loginSignupModal">
            <div className="logo">
                <LogoOrigin />
            </div>
            <h2>
                Inscription{" - "}
                <button onClick={() => setConnexion(true)}>
                    Retour à la connexion
                </button>
            </h2>
            <SignUpForm />
        </div>
    );
};

export default LoginSignupModal;
