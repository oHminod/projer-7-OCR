import React, {
    createContext,
    useContext,
    // useMemo,
    useReducer,
    // useState,
} from "react";
// import { useAxiosGetAllPosts } from "../../utils/axiosCalls";
import { postsReducer } from "./reducers/posts";
// import { useUser } from "./UserContext";

// import { useSocket } from "./SocketContext";

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
    // const [go, setGo] = useState(false);
    // const user = useUser();

    // useAxiosGetAllPosts(go, setGo, dispatchPosts);

    // const socket = useSocket();

    // useMemo(() => {
    //     user && setGo(true);
    // }, [user]);

    // useEffect(() => {
    //     socket &&
    //         socket.on("likeAndLovesResponse", (postObj) => {
    //             if (posts) {
    //                 let allPostsCopy = [...posts];
    //                 const thisPostIndex = allPostsCopy
    //                     .map((post) => post._id)
    //                     .indexOf(postObj._id);
    //                 thisPostIndex !== -1 &&
    //                     (allPostsCopy[thisPostIndex] = postObj);
    //                 thisPostIndex !== -1 && setPosts(allPostsCopy);
    //             }
    //         });
    //     // socket &&
    //     //     socket.on("connect", () => {
    //     //         console.log(`connecté avec l'id ${socket.id}`);
    //     //     });
    //     // socket &&
    //     //     socket.on("disconnect", () => {
    //     //         console.log(`déconnecté`);
    //     //     });
    // }, [posts, socket]);

    // useEffect(() => {
    //     socket &&
    //         socket.on("shareDeleted", (obj) => {
    //             if (posts) {
    //                 let allPostsCopy = [...posts];
    //                 const thisPostIndex = allPostsCopy
    //                     .map((post) => post._id)
    //                     .indexOf(obj.originalPostId);
    //                 if (thisPostIndex !== -1) {
    //                     const userId = allPostsCopy[
    //                         thisPostIndex
    //                     ].usersShared.indexOf(obj.userId);
    //                     allPostsCopy[thisPostIndex].usersShared.splice(
    //                         userId,
    //                         1
    //                     );
    //                     allPostsCopy[thisPostIndex].shares =
    //                         allPostsCopy[thisPostIndex].usersShared.length;
    //                     setPosts(allPostsCopy);
    //                 }
    //             }
    //         });
    // }, [posts, socket]);

    // useEffect(() => {
    //     socket &&
    //         socket.on("postUpdate", (postObj) => {
    //             if (posts) {
    //                 let allPostsCopy = [...posts];
    //                 const thisPostIndex = allPostsCopy
    //                     .map((post) => post._id)
    //                     .indexOf(postObj._id);
    //                 thisPostIndex !== -1 &&
    //                     (allPostsCopy[thisPostIndex] = postObj);
    //                 thisPostIndex !== -1 && setPosts(allPostsCopy);
    //             }
    //         });
    // }, [posts, socket]);

    // useEffect(() => {
    //     socket &&
    //         socket.on("PropageContentDelete", (id) => {
    //             if (posts) {
    //                 let allPostsCopy = [...posts];
    //                 allPostsCopy.map((post) => {
    //                     if (post.sharedPostId === id) {
    //                         post.sharedTexte = "La publication a été supprimée";
    //                         post.sharedImage = "";
    //                     }
    //                     return true;
    //                 });
    //                 setPosts(allPostsCopy);
    //             }
    //         });
    // }, [posts, socket]);

    // useEffect(() => {
    //     socket &&
    //         socket.on("postDeleted", (id) => {
    //             if (posts) {
    //                 let allPostsCopy = [...posts];
    //                 const thisPostIndex = allPostsCopy
    //                     .map((post) => post._id)
    //                     .indexOf(id);
    //                 thisPostIndex !== -1 &&
    //                     allPostsCopy.splice(thisPostIndex, 1);
    //                 thisPostIndex !== -1 && setPosts(allPostsCopy);
    //             }
    //         });
    // }, [posts, socket]);

    return (
        <PostsContext.Provider value={posts}>
            <PostsUpdateContext.Provider value={dispatchPosts}>
                {children}
            </PostsUpdateContext.Provider>
        </PostsContext.Provider>
    );
}

export default PostsProvider;
