import React, { useState, createContext, useContext, useEffect } from "react";
import { useGetUser } from "../../utils/axiosCalls";

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
    const myInfo = useGetUser();

    useEffect(() => {
        myInfo && setUser(myInfo);
    }, [myInfo]);

    return (
        <UserContext.Provider value={user}>
            <UserUpdateContext.Provider value={setUser}>
                {children}
            </UserUpdateContext.Provider>
        </UserContext.Provider>
    );
}

export default UserProvider;
