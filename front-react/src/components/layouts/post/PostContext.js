import React, { useState, createContext, useContext, useEffect } from "react";
import { useSocket } from "../../contexts/SocketContext";

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

export const CommentairesContext = createContext();
export const CommentairesUpdateContext = createContext();

export function useCommentaires() {
    return useContext(CommentairesContext);
}

export function useCommentairesUpdate() {
    return useContext(CommentairesUpdateContext);
}

export function PostProvider({ children, thisPost }) {
    const [post, setPost] = useState();
    const [commentaires, setCommentaires] = useState([]);
    const [comment, setComment] = useState(false);
    const socket = useSocket();

    useEffect(() => {
        setPost(thisPost);
    }, [thisPost]);
    useEffect(() => {
        socket &&
            socket.on("newComment", (data) => {
                data &&
                    data.newComment.postId === thisPost._id &&
                    setCommentaires((prev) => [
                        ...new Set([...prev, data.newComment]),
                    ]);
            });
    }, [socket, thisPost]);

    return (
        <PostContext.Provider value={post}>
            <PostUpdateContext.Provider value={setPost}>
                <CommentairesContext.Provider value={commentaires}>
                    <CommentairesUpdateContext.Provider value={setCommentaires}>
                        <CommentContext.Provider value={comment}>
                            <CommentUpdateContext.Provider value={setComment}>
                                {children}
                            </CommentUpdateContext.Provider>
                        </CommentContext.Provider>
                    </CommentairesUpdateContext.Provider>
                </CommentairesContext.Provider>
            </PostUpdateContext.Provider>
        </PostContext.Provider>
    );
}

export default PostProvider;
