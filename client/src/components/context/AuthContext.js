import React, { useState, createContext, useContext, useEffect } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";

export const AuthContext = createContext();
export const AuthUpdateContext = createContext();
export const AuthQueryContext = createContext();

export function useAuthQuery() {
    return useContext(AuthQueryContext);
}
export function useAuth() {
    return useContext(AuthContext);
}

export function useAuthUpdate() {
    return useContext(AuthUpdateContext);
}

export function AuthProvider({ children }) {
    const [authToken, setAuthToken] = useState();
    const [queryToken, setQueryToken] = useLocalStorage(
        "groupomania-queryToken",
        ""
    );
    useEffect(() => {
        if (window.localStorage.getItem("token_groupomania")) {
            const token = JSON.parse(
                window.localStorage.getItem("token_groupomania")
            );

            token && setAuthToken(token);
        }
    }, []);

    useEffect(() => {
        authToken && setQueryToken(authToken);
    }, [authToken, setQueryToken]);

    return (
        <AuthContext.Provider value={authToken}>
            <AuthUpdateContext.Provider value={setAuthToken}>
                <AuthQueryContext.Provider value={queryToken}>
                    {children}
                </AuthQueryContext.Provider>
            </AuthUpdateContext.Provider>
        </AuthContext.Provider>
    );
}

export default AuthProvider;
