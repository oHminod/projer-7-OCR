import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useAxiosLogin } from "../../../../utils/axiosCalls";
import verifEmail from "../../../../utils/verifEmail";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [dbError, setDbError] = useState("");
    const inputEmail = useRef();
    const inputPassword = useRef();

    useAxiosLogin(email, password, setDbError);

    const handleLogin = (e) => {
        e.preventDefault();
        verifEmail(inputEmail.current.value) &&
            inputEmail.current.value &&
            setEmail(inputEmail.current.value);
        inputPassword.current.value && setPassword(inputPassword.current.value);
    };

    const handleEmailChange = () => {
        verifEmail(inputEmail.current.value, "email");
    };

    return (
        <motion.div layout>
            {dbError && <p className="error">{dbError}</p>}
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    name="email"
                    placeholder="email"
                    ref={inputEmail}
                    id="email"
                    onChange={handleEmailChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="password"
                    ref={inputPassword}
                    autoComplete="password"
                />
                <button onClick={handleLogin}>Se connecter</button>
            </form>
        </motion.div>
    );
};

export default LoginForm;
