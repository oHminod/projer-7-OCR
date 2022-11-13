import React, { createContext, useContext } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";

export const UserContext = createContext();
export const UserUpdateContext = createContext();

export function useUser() {
    return useContext(UserContext);
}

export function useUserUpdate() {
    return useContext(UserUpdateContext);
}

export function UserProvider({ children }) {
    const [user, setUser] = useLocalStorage("groupomania-user", "");

    return (
        <UserContext.Provider value={user}>
            <UserUpdateContext.Provider value={setUser}>
                {children}
            </UserUpdateContext.Provider>
        </UserContext.Provider>
    );
}

export default UserProvider;
