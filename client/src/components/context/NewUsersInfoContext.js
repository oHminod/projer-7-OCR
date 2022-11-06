import React, { createContext, useContext } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";

export const NewUsersInfoContext = createContext();

export function useNewUsersInfo() {
    return useContext(NewUsersInfoContext);
}

export const NewUsersInfoUpdateContext = createContext();

export function useNewUsersInfoUpdate() {
    return useContext(NewUsersInfoUpdateContext);
}

export function NewUsersInfoProvider({ children }) {
    const [newUsersInfo, setNewUsersInfo] = useLocalStorage(
        "groupomania-newUsersInfo",
        []
    );

    return (
        <NewUsersInfoContext.Provider value={newUsersInfo}>
            <NewUsersInfoUpdateContext.Provider value={setNewUsersInfo}>
                {children}
            </NewUsersInfoUpdateContext.Provider>
        </NewUsersInfoContext.Provider>
    );
}

export default NewUsersInfoProvider;
