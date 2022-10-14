import React, { useState } from "react";
import LoginForm from "./forms/LoginForm";
import SignUpForm from "./forms/SignUpForm";

export const LoginSignupModal = () => {
    const [connexion, setConnexion] = useState(true);

    return connexion ? (
        <div>
            <h2>Connexion</h2>
            <LoginForm />
            <button onClick={() => setConnexion(false)}>
                Pas encore inscrit ? Cliquer ici.
            </button>
        </div>
    ) : (
        <div>
            <h2>Inscription</h2>
            <SignUpForm />
            <button onClick={() => setConnexion(true)}>
                Retour à la connexion
            </button>
        </div>
    );
};

export default LoginSignupModal;
