import React, { useState, createContext, useContext, useEffect } from "react";
import { axiosGetAllPosts } from "../../utils/axiosCalls";
import { useAuth } from "./AuthContext";

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
    const [posts, setPosts] = useState([]);
    const [usersWhoHavePost, setUsersWhoHavePost] = useState([]);
    const token = useAuth();

    useEffect(() => {
        token && axiosGetAllPosts(token).then((allPosts) => setPosts(allPosts));
    }, [token]);

    useEffect(() => {
        awaitIDs();
        async function awaitIDs() {
            posts &&
                posts.map(
                    (post) =>
                        usersWhoHavePost.indexOf(post.userId) === -1 &&
                        setUsersWhoHavePost([...usersWhoHavePost, post.userId])
                );
        }
    }, [usersWhoHavePost, posts]);

    return (
        <PostsContext.Provider value={posts}>
            <PostsUpdateContext.Provider value={setPosts}>
                <UsersWithPostsContext.Provider value={usersWhoHavePost}>
                    {children}
                </UsersWithPostsContext.Provider>
            </PostsUpdateContext.Provider>
        </PostsContext.Provider>
    );
}

export default PostsProvider;
