import React, { useState, createContext, useContext, useEffect } from "react";
import { axiosUserContext } from "../../utils/axiosCalls";

export const UserContext = createContext();
export const UserUpdateContext = createContext();
export const UserLoadingContext = createContext();

export function useUser() {
    return useContext(UserContext);
}

export function useUserLoading() {
    return useContext(UserLoadingContext);
}

export function useUserUpdate() {
    return useContext(UserUpdateContext);
}
export function UserProvider({ children }) {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);
    /**
     * ! update le user avec axios en cas de modif ? À tester.
     */
    useEffect(() => {
        if (window.localStorage.getItem("token_groupomania")) {
            const token = JSON.parse(
                window.localStorage.getItem("token_groupomania")
            );
            const userId = JSON.parse(
                window.localStorage.getItem("userId_groupomania")
            );

            axiosUserContext(token, userId, setUser, setLoading);
        }
    }, []);

    return (
        <UserContext.Provider value={user}>
            <UserUpdateContext.Provider value={setUser}>
                <UserLoadingContext.Provider value={loading}>
                    {children}
                </UserLoadingContext.Provider>
            </UserUpdateContext.Provider>
        </UserContext.Provider>
    );
}

export default UserProvider;
