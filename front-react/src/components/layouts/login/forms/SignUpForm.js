import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useAxiosSignup } from "../../../../utils/axiosCalls";
import verifEmail from "../../../../utils/verifEmail";
import verifPassword from "../../../../utils/verifPassword";

const SignUpForm = () => {
    const [email, setEmail] = useState("");
    const [pseudo, setPseudo] = useState("");
    const [emailOk, setEmailOk] = useState(false);
    const [password, setPassword] = useState("");
    const inputEmail = useRef();
    const inputPseudo = useRef();
    const inputPassword = useRef();
    const inputVerifPassword = useRef();
    const [dbError, setDbError] = useState("");

    useAxiosSignup(email, pseudo, password, setDbError);

    const handleSignup = (e) => {
        e.preventDefault();
        if (
            verifPassword(
                inputPassword.current.value,
                inputVerifPassword.current.value
            ) &&
            verifEmail(inputEmail.current.value) &&
            inputPseudo.current.value.length > 0 &&
            inputPassword.current.value.length >= 4
        ) {
            setEmail(inputEmail.current.value);
            setPassword(inputPassword.current.value);
            setPseudo(inputPseudo.current.value);
        } else {
            setDbError(
                "Les mots de passes doivent être identiques et d'au moins 4 caractères. Le champ pseudo doit être rempli"
            );
        }
    };

    const handleEmailChange = () => {
        verifEmail(inputEmail.current.value, "email-inscription", setEmailOk);
    };

    const handleVerifPassChange = () => {
        verifPassword(
            inputPassword.current.value,
            inputVerifPassword.current.value,
            "password-verification"
        );
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
                <input
                    type="password"
                    id="password-verification"
                    name="password-verification"
                    placeholder="password verification"
                    autoComplete="password-verification"
                    ref={inputVerifPassword}
                    onChange={handleVerifPassChange}
                />
                {emailOk && <button onClick={handleSignup}>S'inscrire</button>}
            </form>
        </motion.div>
    );
};

export default SignUpForm;
