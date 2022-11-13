import React, { createContext, useContext, useReducer } from "react";
// import { ACTIONS } from "./actions/usersInfo";
import { usersInfoReducer } from "./reducers/usersInfo";
// import useLocalStorage from "../../hooks/useLocalStorage";
// import { useSocket } from "./SocketContext";

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
    // const socket = useSocket();

    // useEffect(() => {
    //     socket &&
    //         usersInfo &&
    //         socket.on("newUserInfo", (newUserInfo) => {
    //             dispatchUsersInfo({
    //                 type: ACTIONS.UPDATE_USER,
    //                 payload: newUserInfo,
    //             });
    //             // let allUsersCopy = [...usersInfo];
    //             // const thisUserIndex = allUsersCopy
    //             //     .map((user) => user.userId)
    //             //     .indexOf(userObj.userId);
    //             // thisUserIndex !== -1 &&
    //             //     (allUsersCopy[thisUserIndex] = {
    //             //         ...allUsersCopy[thisUserIndex],
    //             //         ...userObj,
    //             //     });
    //             // thisUserIndex !== -1 && setUsersInfo(allUsersCopy);
    //         });
    // }, [socket, usersInfo]);

    return (
        <UsersInfoContext.Provider value={usersInfo}>
            <UsersInfoUpdateContext.Provider value={dispatchUsersInfo}>
                {children}
            </UsersInfoUpdateContext.Provider>
        </UsersInfoContext.Provider>
    );
}

export default UsersInfoProvider;
