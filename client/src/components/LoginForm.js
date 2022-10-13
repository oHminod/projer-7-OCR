import axios from "axios";
import React, { useState } from "react";

const LoginForm = () => {
    const [body, setBody] = useState({});
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (email, password) => {
        // e.preventDefault();
        axios
            .post("http://localhost:36500/login", {
                email: email,
                password: password,
            })
            .then((res) => {
                console.log(res.data);
                setBody(res.data);
            })
            .catch((err) => console.log(err));
    };

    return (
        <div>
            <input
                type="text"
                name="email"
                id="email"
                placeholder="email"
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                name="password"
                id="password"
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={() => handleLogin(email, password)}>
                Se connecter
            </button>
            {body !== {} ? (
                <div>
                    <p>userID: {body.userId}</p>
                    <p>token: {body.token}</p>
                </div>
            ) : null}
        </div>
    );
};

export default LoginForm;
