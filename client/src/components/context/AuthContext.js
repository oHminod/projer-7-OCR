import React, { useState, createContext, useContext, useEffect } from "react";
import { axiosAuthContext } from "../../utils/axiosCalls";

export const AuthContext = createContext();
export const AuthUpdateContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function useAuthUpdate() {
    return useContext(AuthUpdateContext);
}

export function AuthProvider({ children }) {
    const [authToken, setAuthToken] = useState();

    useEffect(() => {
        if (window.localStorage.getItem("token_groupomania")) {
            const token = JSON.parse(
                window.localStorage.getItem("token_groupomania")
            );

            axiosAuthContext(token, setAuthToken);
        }
    }, []);

    return (
        <AuthContext.Provider value={authToken}>
            <AuthUpdateContext.Provider value={setAuthToken}>
                {children}
            </AuthUpdateContext.Provider>
        </AuthContext.Provider>
    );
}

export default AuthProvider;
