import React, { useState, createContext, useContext } from "react";

export const PostContext = createContext();
export const PostUpdateContext = createContext();

export function usePost() {
    return useContext(PostContext);
}

export function usePostUpdate() {
    return useContext(PostUpdateContext);
}

export const CommentContext = createContext();
export const CommentUpdateContext = createContext();

export function useComment() {
    return useContext(CommentContext);
}

export function useCommentUpdate() {
    return useContext(CommentUpdateContext);
}

export function PostProvider({ children }) {
    const [post, setPost] = useState();
    const [comment, setComment] = useState(false);

    return (
        <PostContext.Provider value={post}>
            <PostUpdateContext.Provider value={setPost}>
                <CommentContext.Provider value={comment}>
                    <CommentUpdateContext.Provider value={setComment}>
                        {children}
                    </CommentUpdateContext.Provider>
                </CommentContext.Provider>
            </PostUpdateContext.Provider>
        </PostContext.Provider>
    );
}

export default PostProvider;
