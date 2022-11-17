import React, { createContext, useContext, useState } from "react";

export const OldestPostContext = createContext();
export const MyOldestPostContext = createContext();

export function useOldestPost() {
    return useContext(OldestPostContext);
}

export function useMyOldestPost() {
    return useContext(MyOldestPostContext);
}
export const OldestPostUpdateContext = createContext();
export const MyOldestPostUpdateContext = createContext();

export function useOldestPostUpdate() {
    return useContext(OldestPostUpdateContext);
}

export function useMyOldestPostUpdate() {
    return useContext(MyOldestPostUpdateContext);
}

export function OldestPostsProvider({ children }) {
    const [oldestPost, setOldestPost] = useState("");
    const [myOldestPost, setMyOldestPost] = useState("");

    return (
        <OldestPostContext.Provider value={oldestPost}>
            <MyOldestPostContext.Provider value={myOldestPost}>
                <OldestPostUpdateContext.Provider value={setOldestPost}>
                    <MyOldestPostUpdateContext.Provider value={setMyOldestPost}>
                        {children}
                    </MyOldestPostUpdateContext.Provider>
                </OldestPostUpdateContext.Provider>
            </MyOldestPostContext.Provider>
        </OldestPostContext.Provider>
    );
}

export default OldestPostsProvider;
