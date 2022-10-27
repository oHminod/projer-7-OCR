import React, { useState, createContext, useContext } from "react";

export const PostContext = createContext();
export const PostUpdateContext = createContext();

export function usePost() {
    return useContext(PostContext);
}

export function usePostUpdate() {
    return useContext(PostUpdateContext);
}

export function PostProvider({ children }) {
    const [post, setPost] = useState();

    return (
        <PostContext.Provider value={post}>
            <PostUpdateContext.Provider value={setPost}>
                {children}
            </PostUpdateContext.Provider>
        </PostContext.Provider>
    );
}

export default PostProvider;
