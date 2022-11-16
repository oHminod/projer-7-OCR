import React, { createContext, useContext, useReducer } from "react";
import { postsReducer } from "./reducers/posts";

export const PostsContext = createContext();
export const PostsUpdateContext = createContext();

export function usePosts() {
    return useContext(PostsContext);
}

export function usePostsUpdate() {
    return useContext(PostsUpdateContext);
}

export const UsersWithPostsContext = createContext();

export function useUsersWithPosts() {
    return useContext(UsersWithPostsContext);
}

export function PostsProvider({ children }) {
    const [posts, dispatchPosts] = useReducer(postsReducer, []);

    return (
        <PostsContext.Provider value={posts}>
            <PostsUpdateContext.Provider value={dispatchPosts}>
                {children}
            </PostsUpdateContext.Provider>
        </PostsContext.Provider>
    );
}

export default PostsProvider;
