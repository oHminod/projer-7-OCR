import React, { createContext, useContext, useReducer } from "react";
import { usersInfoReducer } from "./reducers/usersInfo";

export const UsersInfoContext = createContext();

export function useUsersInfo() {
    return useContext(UsersInfoContext);
}

export const UsersInfoUpdateContext = createContext();

export function useUsersInfoUpdate() {
    return useContext(UsersInfoUpdateContext);
}

export function UsersInfoProvider({ children }) {
    const [usersInfo, dispatchUsersInfo] = useReducer(usersInfoReducer, []);

    return (
        <UsersInfoContext.Provider value={usersInfo}>
            <UsersInfoUpdateContext.Provider value={dispatchUsersInfo}>
                {children}
            </UsersInfoUpdateContext.Provider>
        </UsersInfoContext.Provider>
    );
}

export default UsersInfoProvider;
