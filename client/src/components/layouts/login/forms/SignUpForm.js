import React, { useState } from "react";
import { useAuthUpdate } from "../../../context/AuthContext";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useUserUpdate } from "../../../context/UserContext";
import { axiosSignup } from "../../../../utils/axiosCalls";
import verifEmail from "../../../../utils/verifEmail";

const SignUpForm = () => {
    const [email, setEmail] = useState("");
    const [pseudo, setPseudo] = useState("");
    const [emailOk, setEmailOk] = useState(false);
    const [password, setPassword] = useState("");
    const [dbError, setDbError] = useState("");
    const setAuthToken = useAuthUpdate();
    const navigate = useNavigate();
    const setUser = useUserUpdate();

    const handleSignup = (e) => {
        e.preventDefault();
        if (!verifEmail(email)) return;
        axiosSignup(
            email,
            pseudo,
            password,
            setUser,
            setAuthToken,
            navigate,
            setDbError
        );
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        verifEmail(e.target.value, "email-inscription", setEmailOk);
    };

    const handlePseudoChange = (e) => {
        setPseudo(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    return (
        <motion.div layout>
            {dbError && <p className="error">{dbError}</p>}
            <form onSubmit={handleSignup}>
                <input
                    type="email"
                    name="email-inscription"
                    placeholder="email"
                    value={email}
                    id="email-inscription"
                    onChange={handleEmailChange}
                />
                <input
                    type="text"
                    name="pseudo-inscription"
                    placeholder="pseudo"
                    value={pseudo}
                    id="pseudo-inscription"
                    onChange={handlePseudoChange}
                />
                <input
                    type="password"
                    name="password-inscription"
                    placeholder="password"
                    autoComplete="password-inscription"
                    value={password}
                    onChange={handlePasswordChange}
                />
                {emailOk && <button onClick={handleSignup}>S'inscrire</button>}
            </form>
        </motion.div>
    );
};

export default SignUpForm;
