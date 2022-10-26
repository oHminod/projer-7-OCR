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

export const UserWithPostsContext = createContext();

export function useUserWithPosts() {
    return useContext(UserWithPostsContext);
}

export function PostsProvider({ children }) {
    const [posts, setPosts] = useState([]);
    const [usersWhoHavePost, setUsersWhoHavePost] = useState([]);
    // const [loading, setLoading] = useState(true);
    // const [usersInfo, setUsersInfo] = useState([]);
    const token = useAuth();

    useEffect(() => {
        token && axiosGetAllPosts(token).then((allPosts) => setPosts(allPosts));
    }, [token]);

    useEffect(() => {
        awaitIDs();
        async function awaitIDs() {
            if (posts) {
                for (const post of posts) {
                    if (usersWhoHavePost.indexOf(post.userId) === -1) {
                        setUsersWhoHavePost([...usersWhoHavePost, post.userId]);
                    }
                }
                // const promesseTab = posts.map(async (post) => {
                //     if (usersWhoHavePost.indexOf(post.userId) === -1) {
                //         setUsersWhoHavePost([...usersWhoHavePost, post.userId]);
                //     }
                // });
                // setLoading(false);
            }
        }
    }, [usersWhoHavePost, posts]);

    // useEffect(() => {
    //     loading || awaitInfos();
    //     async function awaitInfos() {
    //         if (!loading) {
    //             const promesseTab = usersWhoHavePost.map(async (ID) =>
    //                 getAvatarAndPseudo(token, ID).then((userInfo) =>
    //                     setUsersInfo([...usersInfo, userInfo])
    //                 )
    //             );
    //             await Promise.all(promesseTab);
    //         }
    //     }
    //     // console.log(usersWhoHavePost);
    // }, [loading]);

    return (
        <PostsContext.Provider value={posts}>
            <PostsUpdateContext.Provider value={setPosts}>
                <UserWithPostsContext.Provider value={usersWhoHavePost}>
                    {children}
                </UserWithPostsContext.Provider>
            </PostsUpdateContext.Provider>
        </PostsContext.Provider>
    );
}

export default PostsProvider;
