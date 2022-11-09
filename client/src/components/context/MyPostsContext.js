import React, {
    useState,
    createContext,
    useContext,
    useEffect,
    // useMemo,
} from "react";
import { getAvatarAndPseudo, useGetAllMyPosts } from "../../utils/axiosCalls";
import { useAuth } from "./AuthContext";
import { useNewUsersInfo, useNewUsersInfoUpdate } from "./NewUsersInfoContext";
import { usePosts } from "./PostsContext";
import { useSocket } from "./SocketContext";
import { useUser } from "./UserContext";

export const MyPostsContext = createContext();
export const MyPostsUpdateContext = createContext();

export function useMyPosts() {
    return useContext(MyPostsContext);
}

export function useMyPostsUpdate() {
    return useContext(MyPostsUpdateContext);
}

export const MyPostsProvider = ({ children }) => {
    const [myPosts, setMyPosts] = useState([]);
    const [usersWhoHavePost, setUsersWhoHavePost] = useState([]);
    const usersInfo = useNewUsersInfo();
    const setUsersInfo = useNewUsersInfoUpdate();
    const posts = usePosts();
    const token = useAuth();
    const my = useUser();
    const socket = useSocket();
    const allMyPosts = useGetAllMyPosts(my && my._id);

    useEffect(() => {
        token && allMyPosts && setMyPosts(allMyPosts);
    }, [allMyPosts, token]);

    useEffect(() => {
        posts &&
            posts.map((post) => {
                usersWhoHavePost.indexOf(post.userId) === -1 &&
                    setUsersWhoHavePost([...usersWhoHavePost, post.userId]);
                post.hasOwnProperty("sharedUserId") &&
                    post.sharedUserId &&
                    usersWhoHavePost.indexOf(post.sharedUserId) === -1 &&
                    setUsersWhoHavePost([
                        ...usersWhoHavePost,
                        post.sharedUserId,
                    ]);
                return true;
            });
    }, [posts, usersWhoHavePost]);

    useEffect(() => {
        allMyPosts &&
            allMyPosts.map((post) => {
                usersWhoHavePost.indexOf(post.userId) === -1 &&
                    setUsersWhoHavePost([...usersWhoHavePost, post.userId]);
                post.hasOwnProperty("sharedUserId") &&
                    post.sharedUserId &&
                    usersWhoHavePost.indexOf(post.sharedUserId) === -1 &&
                    setUsersWhoHavePost([
                        ...usersWhoHavePost,
                        post.sharedUserId,
                    ]);
                return true;
            });
    }, [allMyPosts, usersWhoHavePost]);

    useEffect(() => {
        usersWhoHavePost &&
            usersWhoHavePost.map(
                (id) =>
                    !usersInfo.find((findUser) => findUser.userId === id) &&
                    getAvatarAndPseudo(id).then((userInfo) =>
                        setUsersInfo([...usersInfo, userInfo])
                    )
            );
    }, [setUsersInfo, usersInfo, usersWhoHavePost]);

    useEffect(() => {
        socket &&
            socket.on("newPost", (data) => {
                my &&
                    data &&
                    data.newPost.userId === my._id &&
                    setMyPosts([...myPosts, data.newPost]);
            });
    }, [my, myPosts, socket, token]);

    useEffect(() => {
        socket &&
            socket.on("likeAndLovesResponse", (postObj) => {
                let allMyPostsCopy = [...myPosts];
                const thisPostIndex = allMyPostsCopy
                    .map((post) => post._id)
                    .indexOf(postObj._id);
                thisPostIndex !== -1 &&
                    (allMyPostsCopy[thisPostIndex] = postObj);
                thisPostIndex !== -1 && setMyPosts(allMyPostsCopy);
            });
    }, [myPosts, socket]);

    useEffect(() => {
        socket &&
            socket.on("postUpdate", (postObj) => {
                let allMyPostsCopy = [...myPosts];
                const thisPostIndex = allMyPostsCopy
                    .map((post) => post._id)
                    .indexOf(postObj._id);
                thisPostIndex !== -1 &&
                    (allMyPostsCopy[thisPostIndex] = postObj);
                thisPostIndex !== -1 && setMyPosts(allMyPostsCopy);
            });
    }, [myPosts, socket]);

    useEffect(() => {
        socket &&
            socket.on("postDeleted", (id) => {
                if (myPosts) {
                    let allMyPostsCopy = [...myPosts];
                    const thisPostIndex = allMyPostsCopy
                        .map((post) => post._id)
                        .indexOf(id);
                    thisPostIndex !== -1 &&
                        allMyPostsCopy.splice(thisPostIndex, 1);
                    thisPostIndex !== -1 && setMyPosts(allMyPostsCopy);
                }
            });
    }, [myPosts, socket]);

    return (
        <MyPostsContext.Provider value={myPosts}>
            <MyPostsUpdateContext.Provider value={setMyPosts}>
                {children}
            </MyPostsUpdateContext.Provider>
        </MyPostsContext.Provider>
    );
};

export default MyPostsProvider;
