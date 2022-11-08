import React, {
    useState,
    createContext,
    useContext,
    useEffect,
    useMemo,
} from "react";
import { axiosGetAllPosts } from "../../utils/axiosCalls";
import { useAuth } from "../context/AuthContext";

// import { useNewUsersInfo, useNewUsersInfoUpdate } from "./NewUsersInfoContext";
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
    // const [usersWhoHavePost, setUsersWhoHavePost] = useState([]);
    // const usersInfo = useNewUsersInfo();
    // const setUsersInfo = useNewUsersInfoUpdate();
    const token = useAuth();

    const socket = useSocket();

    // const axiosPosts = axiosGetAllPosts()

    useMemo(() => {
        // console.log("coucou");
        token && axiosGetAllPosts(token).then((data) => setPosts(data));
    }, [token]);

    // useMemo(() => {
    //     posts &&
    //         posts.map((post) => {
    //             usersWhoHavePost.indexOf(post.userId) === -1 &&
    //                 setUsersWhoHavePost([...usersWhoHavePost, post.userId]);
    //             post.hasOwnProperty("sharedUserId") &&
    //                 post.sharedUserId &&
    //                 usersWhoHavePost.indexOf(post.sharedUserId) === -1 &&
    //                 setUsersWhoHavePost([
    //                     ...new Set([...usersWhoHavePost, post.sharedUserId]),
    //                 ]);
    //             return true;
    //         });
    // }, [posts, usersWhoHavePost]);

    // useEffect(() => {
    //     usersWhoHavePost &&
    //         usersWhoHavePost.map(
    //             (id) =>
    //                 !usersInfo.find((findUser) => findUser.userId === id) &&
    //                 getAvatarAndPseudo(id).then((userInfo) =>
    //                     setUsersInfo([...usersInfo, userInfo])
    //                 )
    //         );
    // }, [setUsersInfo, usersInfo, usersWhoHavePost]);

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

    useEffect(() => {
        socket &&
            socket.on("postUpdate", (postObj) => {
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
    }, [posts, socket]);

    return (
        <PostsContext.Provider value={posts}>
            <PostsUpdateContext.Provider value={setPosts}>
                {/* <UsersWithPostsContext.Provider value={usersWhoHavePost}> */}
                {children}
                {/* </UsersWithPostsContext.Provider> */}
            </PostsUpdateContext.Provider>
        </PostsContext.Provider>
    );
}

export default PostsProvider;
