import axios from "axios";
import React, { useState, createContext, useContext, useEffect } from "react";

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

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            axios
                .get(`http://localhost:36600/verify`, config)
                .then((data) => {
                    setAuthToken(data.data.token);
                    window.localStorage.setItem(
                        "token_groupomania",
                        JSON.stringify(data.data.token)
                    );
                })
                .catch(() => {
                    setAuthToken("fin");
                });
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
