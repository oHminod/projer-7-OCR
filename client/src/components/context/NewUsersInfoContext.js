import React, { createContext, useContext, useEffect } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useSocket } from "./SocketContext";

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
    const socket = useSocket();

    useEffect(() => {
        socket &&
            newUsersInfo &&
            socket.on("newUserInfo", (userObj) => {
                let allUsersCopy = [...newUsersInfo];
                const thisUserIndex = allUsersCopy
                    .map((user) => user.userId)
                    .indexOf(userObj.userId);
                thisUserIndex !== -1 &&
                    (allUsersCopy[thisUserIndex] = {
                        ...allUsersCopy[thisUserIndex],
                        ...userObj,
                    });
                thisUserIndex !== -1 && setNewUsersInfo(allUsersCopy);
            });
    }, [newUsersInfo, setNewUsersInfo, socket]);

    return (
        <NewUsersInfoContext.Provider value={newUsersInfo}>
            <NewUsersInfoUpdateContext.Provider value={setNewUsersInfo}>
                {children}
            </NewUsersInfoUpdateContext.Provider>
        </NewUsersInfoContext.Provider>
    );
}

export default NewUsersInfoProvider;
