import React, { createContext, useContext } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";

export const AuthContext = createContext();
export const AuthUpdateContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function useAuthUpdate() {
    return useContext(AuthUpdateContext);
}

export function AuthProvider({ children }) {
    const [authToken, setAuthToken] = useLocalStorage("groupomania-token", "");

    return (
        <AuthContext.Provider value={authToken}>
            <AuthUpdateContext.Provider value={setAuthToken}>
                {children}
            </AuthUpdateContext.Provider>
        </AuthContext.Provider>
    );
}

export default AuthProvider;
