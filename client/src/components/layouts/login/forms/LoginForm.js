import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthUpdate } from "../../../context/AuthContext";
import { motion } from "framer-motion";
import { useUserUpdate } from "../../../context/UserContext";
import { axiosLogin } from "../../../../utils/axiosCalls";
import verifEmail from "../../../../utils/verifEmail";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [dbError, setDbError] = useState("");
    const setAuthToken = useAuthUpdate();
    const navigate = useNavigate();
    const setUser = useUserUpdate();

    const handleLogin = (e) => {
        e.preventDefault();
        axiosLogin(email, password, setDbError).then((data) => {
            window.localStorage.setItem(
                "token_groupomania",
                JSON.stringify(data.token)
            );
            window.localStorage.setItem(
                "userId_groupomania",
                JSON.stringify(data.userId)
            );
            setUser(data.user);
            setAuthToken(data.token);
            navigate("/home");
        });
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        verifEmail(e.target.value, "email");
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    return (
        <motion.div layout>
            {dbError && <p className="error">{dbError}</p>}
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    name="email"
                    placeholder="email"
                    value={email}
                    id="email"
                    onChange={handleEmailChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="password"
                    value={password}
                    autoComplete="password"
                    onChange={handlePasswordChange}
                />
                <button onClick={handleLogin}>Se connecter</button>
            </form>
        </motion.div>
    );
};

export default LoginForm;
