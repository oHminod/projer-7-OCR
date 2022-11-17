import React, { createContext, useContext, useReducer } from "react";
import { myPostsReducer } from "./reducers/myPosts";
import useSetUsersInfo from "./useSetUsersInfo";

export const MyPostsContext = createContext();
export const MyPostsUpdateContext = createContext();

export function useMyPosts() {
    return useContext(MyPostsContext);
}

export function useMyPostsUpdate() {
    return useContext(MyPostsUpdateContext);
}

export const MyPostsProvider = ({ children }) => {
    const [myPosts, distpatchMyPosts] = useReducer(myPostsReducer, []);

    useSetUsersInfo();

    return (
        <MyPostsContext.Provider value={myPosts}>
            <MyPostsUpdateContext.Provider value={distpatchMyPosts}>
                {children}
            </MyPostsUpdateContext.Provider>
        </MyPostsContext.Provider>
    );
};

export default MyPostsProvider;
