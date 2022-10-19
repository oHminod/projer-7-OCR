import axios from "axios";
import React, { useState } from "react";
import { useAuthUpdate } from "../context/AuthContext";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useUserUpdate } from "../context/UserContext";

const SignUpForm = () => {
    const [email, setEmail] = useState("");
    const [emailOk, setEmailOk] = useState(false);
    const [password, setPassword] = useState("");
    const [dbError, setDbError] = useState("");
    const setAuthToken = useAuthUpdate();
    const navigate = useNavigate();
    const setUser = useUserUpdate();

    const handleSignup = (e) => {
        e.preventDefault();
        if (!verifEmail(email)) return;
        axios
            .post("http://localhost:36600/signup", {
                email: email,
                password: password,
            })
            .then(() => {
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
            })
            .catch((err) => {
                setDbError(err.response.data);
            });
    };

    const verifEmail = (emailString) => {
        let re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/;
        if (re.test(emailString) && emailString !== "") {
            // setEmailOk(true);
            document.getElementById("email-inscription").style.backgroundColor =
                "lightgreen";
        } else if (emailString === "") {
            document.getElementById("email-inscription").style.backgroundColor =
                "transparent";
        } else {
            // setEmailOk(false);
            document.getElementById("email-inscription").style.backgroundColor =
                "#ffab9b";
        }
        setEmailOk(re.test(emailString));
        return re.test(emailString);
    };

    return (
        <motion.div layout>
            {dbError && <p className="error">{dbError}</p>}
            <form onSubmit={handleSignup}>
                <input
                    type="text"
                    name="email-inscription"
                    placeholder="email"
                    value={email}
                    id="email-inscription"
                    onChange={(e) => {
                        setEmail(e.target.value);
                        verifEmail(e.target.value);
                    }}
                />
                <input
                    type="password"
                    name="password-inscription"
                    placeholder="password"
                    autoComplete="password-inscription"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {emailOk && <button onClick={handleSignup}>S'inscrire</button>}
            </form>
        </motion.div>
    );
};

export default SignUpForm;
