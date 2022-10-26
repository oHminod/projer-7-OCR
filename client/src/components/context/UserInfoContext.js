import React, { useState, createContext, useContext, useEffect } from "react";
import { getAvatarAndPseudo } from "../../utils/axiosCalls";
import { useAuth } from "./AuthContext";
import { useUsersWithPosts } from "./PostsContext";

export const UserInfoContext = createContext();
export const UserInfoUpdateContext = createContext();

export function useUserInfo() {
    return useContext(UserInfoContext);
}

export function useUserInfoUpdate() {
    return useContext(UserInfoUpdateContext);
}

export function UserInfoProvider({ children }) {
    const [userInfo, setUserInfo] = useState([]);
    const usersWithPosts = useUsersWithPosts();
    const token = useAuth();

    useEffect(() => {
        usersWithPosts &&
            usersWithPosts.map(
                (ID) =>
                    !userInfo.find((findUser) => findUser.userId === ID) &&
                    getAvatarAndPseudo(token, ID).then((user) => {
                        setUserInfo([...userInfo, user]);
                    })
            );
    }, [usersWithPosts, userInfo, token]);

    return (
        <UserInfoContext.Provider value={userInfo}>
            <UserInfoUpdateContext.Provider value={setUserInfo}>
                {children}
            </UserInfoUpdateContext.Provider>
        </UserInfoContext.Provider>
    );
}
