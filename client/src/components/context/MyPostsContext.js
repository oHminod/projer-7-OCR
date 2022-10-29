import React, { useState, createContext, useContext, useEffect } from "react";
import { axiosGetAllMyPosts } from "../../utils/axiosCalls";
import { useAuth } from "./AuthContext";
import { useUser } from "./UserContext";
import { io } from "socket.io-client";

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
    let socket;
    if (token) {
        socket = io("http://localhost:36600", {
            transportOptions: {
                polling: {
                    extraHeaders: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            },
        });
    }

    useEffect(() => {
        token &&
            my &&
            axiosGetAllMyPosts(token, my._id).then((allMyPosts) =>
                setMyPosts(allMyPosts)
            );
    }, [token, my]);

    useEffect(() => {
        token &&
            socket.on("newPost", (data) => {
                my &&
                    data &&
                    data.newPost.userId === my._id &&
                    setMyPosts([...myPosts, data.newPost]);
            });
    }, [my, myPosts, socket, token]);

    useEffect(() => {
        token &&
            socket.on("likeAndLovesResponse", (postObj) => {
                let allMyPostsCopy = [...myPosts];
                const thisPostIndex = allMyPostsCopy
                    .map((post) => post._id)
                    .indexOf(postObj._id);
                allMyPostsCopy[thisPostIndex] = postObj;
                setMyPosts(allMyPostsCopy);
            });
    }, [myPosts, socket, token]);

    return (
        <MyPostsContext.Provider value={myPosts}>
            <MyPostsUpdateContext.Provider value={setMyPosts}>
                {children}
            </MyPostsUpdateContext.Provider>
        </MyPostsContext.Provider>
    );
};

export default MyPostsProvider;
