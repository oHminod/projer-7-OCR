import React, { createContext, useContext, useReducer } from "react";
import { newPostsReducer } from "./reducers/newPosts";

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

    return (
        <NewPostsContext.Provider value={newPosts}>
            <NewPostsUpdateContext.Provider value={dispatchNewPosts}>
                {children}
            </NewPostsUpdateContext.Provider>
        </NewPostsContext.Provider>
    );
};

export default NewPostsProvider;
