import React, {
    useState,
    createContext,
    useContext,
    useEffect,
    useMemo,
} from "react";
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
    const [posts, setPosts] = useState();
    const [usersWhoHavePost, setUsersWhoHavePost] = useState([]);

    const token = useAuth();

    const getIDs = useMemo(() => {
        if (posts) {
            let tempTab = [];
            posts.map(
                (post) =>
                    tempTab.indexOf(post.userId) === -1 &&
                    (tempTab = [...tempTab, post.userId])
            );

            return tempTab;
        }
    }, [posts]);

    useEffect(() => {
        token &&
            axiosGetAllPosts(token)
                .then((allPosts) => setPosts(allPosts))
                .catch((err) => console.log(err));
    }, [token]);

    useEffect(() => {
        getIDs && setUsersWhoHavePost(getIDs);
    }, [getIDs]);

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