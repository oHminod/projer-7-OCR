import axios from "axios";
import React, { useState } from "react";

const SignUpForm = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleSignup = () => {
        // e.preventDefault();
        axios
            .post("http://localhost:36500/signup", {
                email: email,
                password: password,
            })
            .then((res) => {
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
            })
            .catch((err) => {
                return;
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
                "red";
        }
    };

    return (
        <div>
            <input
                type="text"
                name="email-inscription"
                placeholder="email-inscription"
                value={email}
                id="email-inscription"
                onChange={(e) => {
                    setEmail(e.target.value);
                    verifEmail(e.target.value);
                    console.log(e.target.value);
                }}
            />
            <input
                type="password"
                name="password-inscription"
                placeholder="password-inscription"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleSignup}>S'inscrire</button>
        </div>
    );
};

export default SignUpForm;
