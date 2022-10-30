import React, { useState, createContext, useContext, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { usePosts, usePostsUpdate } from "./PostsContext";
import { SocketContext } from "./SocketContext";
import { useUser } from "./UserContext";

export const NewPostsContext = createContext();
export const NewPostsUpdateContext = createContext();

export function useNewPosts() {
    return useContext(NewPostsContext);
}

export function useNewPostsUpdate() {
    return useContext(NewPostsUpdateContext);
}

export const NewPostsProvider = ({ children }) => {
    const [newPosts, setNewPosts] = useState([]);
    const user = useUser();
    const setAllPosts = usePostsUpdate();
    const allPosts = usePosts();
    const socket = useContext(SocketContext);

    const token = useAuth();

    useEffect(() => {
        if (user) {
            let tempTab = [...newPosts];
            const myPostIndex = tempTab
                .map((post) => post.userId)
                .indexOf(user._id);
            if (myPostIndex !== -1) {
                setAllPosts([...allPosts, tempTab[myPostIndex]]);
                tempTab.splice(myPostIndex, 1);
                setNewPosts(tempTab);
            }
        }
    }, [allPosts, newPosts, setAllPosts, user]);

    useEffect(() => {
        token &&
            socket &&
            socket.on("newPost", (data) => {
                data && setNewPosts([...newPosts, data.newPost]);
            });
    }, [newPosts, socket, token]);

    return (
        <NewPostsContext.Provider value={newPosts}>
            <NewPostsUpdateContext.Provider value={setNewPosts}>
                {children}
            </NewPostsUpdateContext.Provider>
        </NewPostsContext.Provider>
    );
};

export default NewPostsProvider;
