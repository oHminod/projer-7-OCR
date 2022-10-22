import React, { createContext, useContext, useState } from "react";

export const LoginContext = createContext();
export const LoginUpdateContext = createContext();

export function useLogin() {
    return useContext(LoginContext);
}

export function useLoginUpdate() {
    return useContext(LoginUpdateContext);
}

const LoginProvider = ({ children }) => {
    const [loginMode, setLoginMode] = useState(true);

    return (
        <LoginContext.Provider value={loginMode}>
            <LoginUpdateContext.Provider value={setLoginMode}>
                {children}
            </LoginUpdateContext.Provider>
        </LoginContext.Provider>
    );
};

export default LoginProvider;
