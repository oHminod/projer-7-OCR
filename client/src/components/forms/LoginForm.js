import axios from "axios";
import React, { useState } from "react";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [emailOk, setEmailOk] = useState();

    const handleLogin = () => {
        // e.preventDefault();
        axios
            .post("http://localhost:36500/login", {
                email: email,
                password: password,
            })
            .then((res) => {
                window.localStorage.setItem(
                    "session_groupomania",
                    JSON.stringify(res.data)
                );
            })
            .catch((err) => {
                return;
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
            document.getElementById("email").style.backgroundColor = "red";
        }
        console.log(emailString);
    };

    return (
        <div>
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
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Se connecter</button>
        </div>
    );
};

export default LoginForm;
