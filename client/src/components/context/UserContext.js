import axios from "axios";
import React, { useState, createContext, useContext, useEffect } from "react";

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

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            axios
                .get(`http://localhost:36600/membre/${userId}`, config)
                .then((res) => {
                    setUser(res.data);
                })
                .catch((err) => {
                    console.log(err.response.data);
                });
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
