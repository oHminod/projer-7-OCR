import React, { useState, createContext, useContext } from "react";

export const UserInfoContext = createContext();
export const UserInfoUpdateContext = createContext();

export function useUserInfo() {
    return useContext(UserInfoContext);
}

export function useUserInfoUpdate() {
    return useContext(UserInfoUpdateContext);
}

export function UserInfoProvider({ children }) {
    const [userInfo, setUserInfo] = useState([]);

    return (
        <UserInfoContext.Provider value={userInfo}>
            <UserInfoUpdateContext.Provider value={setUserInfo}>
                {children}
            </UserInfoUpdateContext.Provider>
        </UserInfoContext.Provider>
    );
}
