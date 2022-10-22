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
            axiosUserContext(token, userId, setUser);
        }
    }, []);

    return (
        <UserContext.Provider value={user}>
            <UserUpdateContext.Provider value={setUser}>
                {/* <UserLoadingContext.Provider value={loading}>
                    <UserLoadingUpdateContext.Provider value={setLoading}> */}
                {children}
                {/* </UserLoadingUpdateContext.Provider>
                </UserLoadingContext.Provider> */}
            </UserUpdateContext.Provider>
        </UserContext.Provider>
    );
}

export default UserProvider;
