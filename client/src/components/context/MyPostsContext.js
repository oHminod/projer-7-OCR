import React, { useState, createContext, useContext, useEffect } from "react";
import { useGetAllMyPosts } from "../../utils/axiosCalls";
import { useAuth } from "./AuthContext";
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
    const token = useAuth();
    const my = useUser();
    const socket = useSocket();
    const allMyPosts = useGetAllMyPosts(my && my._id);

    useEffect(() => {
        allMyPosts && setMyPosts(allMyPosts);
    }, [allMyPosts]);

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

    return (
        <MyPostsContext.Provider value={myPosts}>
            <MyPostsUpdateContext.Provider value={setMyPosts}>
                {children}
            </MyPostsUpdateContext.Provider>
        </MyPostsContext.Provider>
    );
};

export default MyPostsProvider;
