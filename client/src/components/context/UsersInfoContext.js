import React, { useState, createContext, useContext, useEffect } from "react";
import { getAvatarAndPseudo } from "../../utils/axiosCalls";
import { useAuth } from "./AuthContext";
import { useUsersWithPosts } from "./PostsContext";

export const UsersInfoContext = createContext();

export function useUsersInfo() {
    return useContext(UsersInfoContext);
}

export function UsersInfoProvider({ children }) {
    const [usersInfo, setUsersInfo] = useState([]);
    const usersWithPosts = useUsersWithPosts();
    const token = useAuth();

    useEffect(() => {
        usersWithPosts &&
            usersWithPosts.map(
                (ID) =>
                    !usersInfo.find((findUser) => findUser.userId === ID) &&
                    getAvatarAndPseudo(token, ID).then((user) => {
                        console.log("usersWithPosts = " + usersWithPosts);
                        setUsersInfo([...usersInfo, user]);
                    })
            );
    }, [usersWithPosts, token, usersInfo]);

    return (
        <UsersInfoContext.Provider value={usersInfo}>
            {children}
        </UsersInfoContext.Provider>
    );
}

export default UsersInfoProvider;
