import React, { createContext, useContext, useReducer } from "react";
import { newPostsReducer } from "./reducers/newPosts";
// import { usePosts, usePostsUpdate } from "./PostsContext";
// import { useSocket } from "./SocketContext";
// import { useUser } from "./UserContext";

export const NewPostsContext = createContext();
export const NewPostsUpdateContext = createContext();

export function useNewPosts() {
    return useContext(NewPostsContext);
}

export function useNewPostsUpdate() {
    return useContext(NewPostsUpdateContext);
}

export const NewPostsProvider = ({ children }) => {
    const [newPosts, dispatchNewPosts] = useReducer(newPostsReducer, []);
    // const user = useUser();
    // const setAllPosts = usePostsUpdate();
    // const allPosts = usePosts();
    // const socket = useSocket();

    // useEffect(() => {
    //     if (user) {
    //         let tempTab = [...newPosts];
    //         const myPostIndex = tempTab
    //             .map((post) => post.userId)
    //             .indexOf(user._id);
    //         if (myPostIndex !== -1) {
    //             setAllPosts([...allPosts, tempTab[myPostIndex]]);
    //             tempTab.splice(myPostIndex, 1);
    //             setNewPosts(tempTab);
    //         }
    //     }
    // }, [allPosts, newPosts, setAllPosts, user]);

    // useEffect(() => {
    //     socket &&
    //         socket.on("newPost", (data) => {
    //             data && setNewPosts([...newPosts, data.newPost]);
    //         });
    // }, [newPosts, socket]);

    // useEffect(() => {
    //     socket &&
    //         socket.on("likeAndLovesResponse", (postObj) => {
    //             if (
    //                 newPosts &&
    //                 newPosts.find((findPost) => findPost._id === postObj._id)
    //             ) {
    //                 console.log(newPosts);
    //                 let allPostsCopy = [...newPosts];
    //                 const thisPostIndex = allPostsCopy
    //                     .map((post) => post._id)
    //                     .indexOf(postObj._id);
    //                 thisPostIndex !== -1 &&
    //                     (allPostsCopy[thisPostIndex] = postObj);
    //                 thisPostIndex !== -1 && setNewPosts(allPostsCopy);
    //             }
    //         });
    // }, [newPosts, socket]);

    // useEffect(() => {
    //     socket &&
    //         socket.on("PropageContentDelete", (id) => {
    //             if (newPosts) {
    //                 let allPostsCopy = [...newPosts];
    //                 allPostsCopy.map((post) => {
    //                     if (post.sharedPostId === id) {
    //                         post.sharedTexte = "La publication a été supprimée";
    //                         post.sharedImage = "";
    //                     }
    //                     return true;
    //                 });
    //                 setNewPosts(allPostsCopy);
    //             }
    //         });
    // }, [newPosts, socket]);

    // useEffect(() => {
    //     socket &&
    //         socket.on("postUpdate", (postObj) => {
    //             if (
    //                 newPosts &&
    //                 newPosts.find((findPost) => findPost._id === postObj._id)
    //             ) {
    //                 let allPostsCopy = [...newPosts];
    //                 const thisPostIndex = allPostsCopy
    //                     .map((post) => post._id)
    //                     .indexOf(postObj._id);
    //                 thisPostIndex !== -1 &&
    //                     (allPostsCopy[thisPostIndex] = postObj);
    //                 thisPostIndex !== -1 && setNewPosts(allPostsCopy);
    //             }
    //         });
    // }, [newPosts, socket]);

    // useEffect(() => {
    //     socket &&
    //         socket.on("postDeleted", (id) => {
    //             if (
    //                 newPosts &&
    //                 newPosts.find((findPost) => findPost._id === id)
    //             ) {
    //                 let allPostsCopy = [...newPosts];
    //                 const thisPostIndex = allPostsCopy
    //                     .map((post) => post._id)
    //                     .indexOf(id);
    //                 thisPostIndex !== -1 &&
    //                     allPostsCopy.splice(thisPostIndex, 1);
    //                 thisPostIndex !== -1 && setNewPosts(allPostsCopy);
    //             }
    //         });
    // }, [newPosts, socket]);

    return (
        <NewPostsContext.Provider value={newPosts}>
            <NewPostsUpdateContext.Provider value={dispatchNewPosts}>
                {children}
            </NewPostsUpdateContext.Provider>
        </NewPostsContext.Provider>
    );
};

export default NewPostsProvider;
