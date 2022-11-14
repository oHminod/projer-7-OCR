import React, {
    useState,
    createContext,
    useContext,
    useEffect,
    useReducer,
} from "react";
import { getAvatarAndPseudo, useGetAllMyPosts } from "../../utils/axiosCalls";
import { MPACTIONS } from "./actions/myPosts";
import { useAuth } from "./AuthContext";
import { usePosts } from "./PostsContext";
import { myPostsReducer } from "./reducers/myPosts";
// import { useSocket } from "./SocketContext";
import { useUser } from "./UserContext";
import { useUsersInfo, useUsersInfoUpdate } from "./UsersInfoContext";

export const MyPostsContext = createContext();
export const MyPostsUpdateContext = createContext();

export function useMyPosts() {
    return useContext(MyPostsContext);
}

export function useMyPostsUpdate() {
    return useContext(MyPostsUpdateContext);
}

export const MyPostsProvider = ({ children }) => {
    const [myPosts, distpatchMyPosts] = useReducer(myPostsReducer, []);
    const [usersWhoHavePost, setUsersWhoHavePost] = useState([]);
    const [go, setGo] = useState(true);
    const usersInfo = useUsersInfo();
    const setUsersInfo = useUsersInfoUpdate();
    const posts = usePosts();
    const token = useAuth();
    const my = useUser();
    // const socket = useSocket();
    const allMyPosts = useGetAllMyPosts(my && go && my._id, setGo);

    useEffect(() => {
        token &&
            allMyPosts &&
            distpatchMyPosts({
                type: MPACTIONS.GET_MY_POSTS,
                payload: { myPosts: allMyPosts },
            });
    }, [allMyPosts, token]);

    useEffect(() => {
        posts &&
            posts.map((post) => {
                setUsersWhoHavePost((prev) => {
                    if (!prev.includes(post.userId)) {
                        return [...new Set([...prev, post.userId])];
                    } else if (
                        post.hasOwnProperty("sharedUserId") &&
                        post.sharedUserId &&
                        !prev.includes(post.sharedUserId)
                    ) {
                        return [...new Set([...prev, post.sharedUserId])];
                    } else {
                        return [...prev];
                    }
                });
                return true;
            });
    }, [posts]);

    useEffect(() => {
        allMyPosts &&
            allMyPosts.map((post) => {
                setUsersWhoHavePost((prev) => {
                    if (!prev.includes(post.userId)) {
                        return [...new Set([...prev, post.userId])];
                    } else if (
                        post.hasOwnProperty("sharedUserId") &&
                        post.sharedUserId &&
                        !prev.includes(post.sharedUserId)
                    ) {
                        return [...new Set([...prev, post.sharedUserId])];
                    } else {
                        return [...prev];
                    }
                });
                return true;
            });
    }, [allMyPosts]);

    useEffect(() => {
        usersWhoHavePost &&
            usersWhoHavePost.map((id) => {
                if (usersInfo.find((findUser) => findUser.userId === id))
                    return id;
                getAvatarAndPseudo(id, setUsersInfo);
                return id;
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [usersWhoHavePost]);

    // // useEffect(() => {
    //     socket &&
    //         socket.on("newPost", (data) => {
    //             my &&
    //                 data &&
    //                 data.newPost.userId === my._id &&
    //                 setMyPosts([...myPosts, data.newPost]);
    //         });
    // }, [my, myPosts, socket, token]);

    // useEffect(() => {
    //     socket &&
    //         socket.on("likeAndLovesResponse", (postObj) => {
    //             let allMyPostsCopy = [...myPosts];
    //             const thisPostIndex = allMyPostsCopy
    //                 .map((post) => post._id)
    //                 .indexOf(postObj._id);
    //             thisPostIndex !== -1 &&
    //                 (allMyPostsCopy[thisPostIndex] = postObj);
    //             thisPostIndex !== -1 && setMyPosts(allMyPostsCopy);
    //         });
    // }, [myPosts, socket]);

    // useEffect(() => {
    //     socket &&
    //         socket.on("shareDeleted", (obj) => {
    //             if (myPosts) {
    //                 let allPostsCopy = [...myPosts];
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
    //                     setMyPosts(allPostsCopy);
    //                 }
    //             }
    //         });
    // }, [myPosts, socket]);

    // useEffect(() => {
    //     socket &&
    //         socket.on("PropageContentDelete", (id) => {
    //             if (myPosts) {
    //                 let allPostsCopy = [...myPosts];
    //                 allPostsCopy.map((post) => {
    //                     if (post.sharedPostId === id) {
    //                         post.sharedTexte = "La publication a été supprimée";
    //                         post.sharedImage = "";
    //                     }
    //                     return true;
    //                 });
    //                 setMyPosts(allPostsCopy);
    //             }
    //         });
    // }, [myPosts, socket]);

    // useEffect(() => {
    //     socket &&
    //         socket.on("postUpdate", (postObj) => {
    //             let allMyPostsCopy = [...myPosts];
    //             const thisPostIndex = allMyPostsCopy
    //                 .map((post) => post._id)
    //                 .indexOf(postObj._id);
    //             thisPostIndex !== -1 &&
    //                 (allMyPostsCopy[thisPostIndex] = postObj);
    //             thisPostIndex !== -1 && setMyPosts(allMyPostsCopy);
    //         });
    // }, [myPosts, socket]);

    // useEffect(() => {
    //     socket &&
    //         socket.on("postDeleted", (id) => {
    //             if (myPosts) {
    //                 let allMyPostsCopy = [...myPosts];
    //                 const thisPostIndex = allMyPostsCopy
    //                     .map((post) => post._id)
    //                     .indexOf(id);
    //                 thisPostIndex !== -1 &&
    //                     allMyPostsCopy.splice(thisPostIndex, 1);
    //                 thisPostIndex !== -1 && setMyPosts(allMyPostsCopy);
    //             }
    //         });
    // }, [myPosts, socket]);

    return (
        <MyPostsContext.Provider value={myPosts}>
            <MyPostsUpdateContext.Provider value={distpatchMyPosts}>
                {children}
            </MyPostsUpdateContext.Provider>
        </MyPostsContext.Provider>
    );
};

export default MyPostsProvider;
