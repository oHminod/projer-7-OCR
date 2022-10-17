import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthUpdate } from "../context/AuthContext";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [dbError, setDbError] = useState("");
    // const [emailOk, setEmailOk] = useState();
    const setAuthToken = useAuthUpdate();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:36500/login", {
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
        <div>
            {dbError && <p className="error">{dbError}</p>}
            <form method="post">
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
                <button onClick={(e) => handleLogin(e)}>Se connecter</button>
            </form>
        </div>
    );
};

export default LoginForm;
