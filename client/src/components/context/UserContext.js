import React, { useState, createContext, useContext, useEffect } from "react";
import { axiosUserContext } from "../../utils/axiosCalls";

export const UserContext = createContext();
export const UserUpdateContext = createContext();

export function useUser() {
    return useContext(UserContext);
}

export function useUserUpdate() {
    return useContext(UserUpdateContext);
}

export function UserProvider({ children }) {
    const [user, setUser] = useState();

    useEffect(() => {
        if (window.localStorage.getItem("token_groupomania")) {
            const token = JSON.parse(
                window.localStorage.getItem("token_groupomania")
            );
            const userId = JSON.parse(
                window.localStorage.getItem("userId_groupomania")
            );
            axiosUserContext(token, userId, setUser);
        }
    }, []);

    return (
        <UserContext.Provider value={user}>
            <UserUpdateContext.Provider value={setUser}>
                {children}
            </UserUpdateContext.Provider>
        </UserContext.Provider>
    );
}

export default UserProvider;
