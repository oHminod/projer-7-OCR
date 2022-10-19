import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthUpdate } from "../context/AuthContext";
import { motion } from "framer-motion";
import { useUserUpdate } from "../context/UserContext";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [dbError, setDbError] = useState("");
    // const [emailOk, setEmailOk] = useState();
    const setAuthToken = useAuthUpdate();
    const navigate = useNavigate();
    const setUser = useUserUpdate();

    const handleLogin = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:36600/login", {
                email: email,
                password: password,
            })
            .then((res) => {
                window.localStorage.setItem(
                    "token_groupomania",
                    JSON.stringify(res.data.token)
                );
                window.localStorage.setItem(
                    "userId_groupomania",
                    JSON.stringify(res.data.userId)
                );
                setUser(res.data.user);
                setAuthToken(res.data.token);
                navigate("/home");
            })
            .catch((err) => {
                setDbError(err.response.data);
            });
    };

    const verifEmail = (emailString) => {
        let re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/;
        if (re.test(emailString) && emailString !== "") {
            // setEmailOk(true);
            document.getElementById("email").style.backgroundColor =
                "lightgreen";
        } else if (emailString === "") {
            document.getElementById("email").style.backgroundColor =
                "transparent";
        } else {
            // setEmailOk(false);
            document.getElementById("email").style.backgroundColor = "#ffab9b";
        }
    };

    return (
        <motion.div layout>
            {dbError && <p className="error">{dbError}</p>}
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    name="email"
                    placeholder="email"
                    value={email}
                    id="email"
                    onChange={(e) => {
                        setEmail(e.target.value);
                        verifEmail(e.target.value);
                    }}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="password"
                    value={password}
                    autoComplete="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handleLogin}>Se connecter</button>
            </form>
        </motion.div>
    );
};

export default LoginForm;
