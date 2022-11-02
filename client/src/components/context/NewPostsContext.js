import React, { useState, createContext, useContext, useEffect } from "react";
import { usePosts, usePostsUpdate } from "./PostsContext";
import { useSocket } from "./SocketContext";
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
    const socket = useSocket();

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
        socket &&
            socket.on("newPost", (data) => {
                data && setNewPosts([...newPosts, data.newPost]);
            });
    }, [newPosts, socket]);

    return (
        <NewPostsContext.Provider value={newPosts}>
            <NewPostsUpdateContext.Provider value={setNewPosts}>
                {children}
            </NewPostsUpdateContext.Provider>
        </NewPostsContext.Provider>
    );
};

export default NewPostsProvider;
