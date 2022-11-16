import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useAxiosSignup } from "../../../../utils/axiosCalls";
import verifEmail from "../../../../utils/verifEmail";

const SignUpForm = () => {
    const [email, setEmail] = useState("");
    const [pseudo, setPseudo] = useState("");
    const [emailOk, setEmailOk] = useState(false);
    const [password, setPassword] = useState("");
    const inputEmail = useRef();
    const inputPseudo = useRef();
    const inputPassword = useRef();
    const [dbError, setDbError] = useState("");

    useAxiosSignup(email, pseudo, password, setDbError);

    const handleSignup = (e) => {
        e.preventDefault();
        verifEmail(inputEmail.current.value) &&
            inputEmail.current.value &&
            setEmail(inputEmail.current.value);
        inputPassword.current.value && setPassword(inputPassword.current.value);
        inputPseudo.current.value && setPseudo(inputPseudo.current.value);
    };

    const handleEmailChange = () => {
        verifEmail(inputEmail.current.value, "email-inscription", setEmailOk);
    };

    return (
        <motion.div layout>
            {dbError && <p className="error">{dbError}</p>}
            <form onSubmit={handleSignup}>
                <input
                    type="email"
                    name="email-inscription"
                    placeholder="email"
                    ref={inputEmail}
                    id="email-inscription"
                    onChange={handleEmailChange}
                />
                <input
                    type="text"
                    name="pseudo-inscription"
                    placeholder="pseudo"
                    ref={inputPseudo}
                    id="pseudo-inscription"
                />
                <input
                    type="password"
                    name="password-inscription"
                    placeholder="password"
                    autoComplete="password-inscription"
                    ref={inputPassword}
                />
                {emailOk && <button onClick={handleSignup}>S'inscrire</button>}
            </form>
        </motion.div>
    );
};

export default SignUpForm;
