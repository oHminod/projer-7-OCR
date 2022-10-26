import React, { useState, createContext, useContext, useEffect } from "react";
import { axiosGetAllMyPosts } from "../../utils/axiosCalls";
import { useAuth } from "./AuthContext";
import { useUser } from "./UserContext";

export const MyPostsContext = createContext();
export const MyPostsUpdateContext = createContext();

export function useMyPosts() {
    return useContext(MyPostsContext);
}

export function useMyPostsUpdate() {
    return useContext(MyPostsUpdateContext);
}

export const MyPostsProvider = ({ children }) => {
    const [myPosts, setMyPosts] = useState([]);
    const token = useAuth();
    const my = useUser();

    useEffect(() => {
        token &&
            my &&
            axiosGetAllMyPosts(token, my._id).then((allMyPosts) =>
                setMyPosts(allMyPosts)
            );
    }, [token, my]);

    return (
        <MyPostsContext.Provider value={myPosts}>
            <MyPostsUpdateContext.Provider value={setMyPosts}>
                {children}
            </MyPostsUpdateContext.Provider>
        </MyPostsContext.Provider>
    );
};

export default MyPostsProvider;
