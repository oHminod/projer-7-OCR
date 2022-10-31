import React, {
    useState,
    createContext,
    useContext,
    useEffect,
    useMemo,
} from "react";
import { axiosGetAllPosts } from "../../utils/axiosCalls";
import { useAuth } from "./AuthContext";
import { useSocket } from "./SocketContext";

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
    const socket = useSocket();

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

    useEffect(() => {
        socket &&
            socket.on("likeAndLovesResponse", (postObj) => {
                if (posts) {
                    let allPostsCopy = [...posts];
                    const thisPostIndex = allPostsCopy
                        .map((post) => post._id)
                        .indexOf(postObj._id);
                    thisPostIndex !== -1 &&
                        (allPostsCopy[thisPostIndex] = postObj);
                    thisPostIndex !== -1 && setPosts(allPostsCopy);
                }
            });
        // socket &&
        //     socket.on("connect", () => {
        //         console.log(`connecté avec l'id ${socket.id}`);
        //     });
        // socket &&
        //     socket.on("disconnect", () => {
        //         console.log(`déconnecté`);
        //     });
    }, [posts, socket]);

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
