import React, {
    // useState,
    createContext,
    useContext,
    useEffect,
    // useMemo,
    useReducer,
} from "react";
import { getAvatarAndPseudo } from "../../utils/axiosCalls";
import { useAuth } from "./AuthContext";
import { useUsersWithPosts } from "./PostsContext";
// import { useSocket } from "./SocketContext";

export const UsersInfoContext = createContext();

export function useUsersInfo() {
    return useContext(UsersInfoContext);
}

export const UsersInfoUpdateContext = createContext();

export function useUsersInfoUpdate() {
    return useContext(UsersInfoUpdateContext);
}

export const ACTIONS = {
    ADD_USER: "add-user",
};

export function reducer(usersInfo, action) {
    switch (action.type) {
        case ACTIONS.ADD_USER:
            let newUser;
            newUserInfo(usersInfo, action.payload) !== false &&
                newUserInfo(usersInfo, action.payload).then(
                    (user) => (newUser = user)
                );
            return [...usersInfo, newUser];
        default:
            return usersInfo;
    }
}

function newUserInfo(usersInfo, { id, token }) {
    if (usersInfo.length > 0) {
        const thisUserIndex = usersInfo.map((user) => user).indexOf(id);
        if (thisUserIndex !== -1) {
            return getAvatarAndPseudo(token, id)
                .then((user) => user)
                .catch((err) => console.log(err));
        } else {
            return false;
        }
    } else {
        return getAvatarAndPseudo(token, id)
            .then((user) => user)
            .catch((err) => console.log(err));
    }
}

export function UsersInfoProvider({ children }) {
    const [usersInfo, dispatch] = useReducer(reducer, []);
    const usersWithPosts = useUsersWithPosts();
    const token = useAuth();
    // const socket = useSocket();

    // const [ioBlock, setIoBlock] = useState(true);

    // useEffect(() => {
    //     socket &&
    //         socket.on("likeAndLovesResponse", () => {
    //             setIoBlock(false);
    //         });
    // }, [socket]);

    // const getInfos = useMemo(() => {
    //     if (token && usersWithPosts && ioBlock) {
    //         return awaitInfos(usersWithPosts);
    //     }
    //     async function awaitInfos(usersWithPosts) {
    //         let tempTab = [];
    //         const promesseTab = await usersWithPosts.map(
    //             (ID) =>
    //                 !tempTab.find((findUser) => findUser.userId === ID) &&
    //                 getAvatarAndPseudo(token, ID).then((user) => {
    //                     tempTab = [...tempTab, user];
    //                 })
    //         );
    //         await Promise.all(promesseTab);
    //         return tempTab;
    //     }
    // }, [ioBlock, token, usersWithPosts]);

    // useEffect(() => {
    //     getInfos &&
    //         getInfos
    //             .then((data) => setUsersInfo(data))
    //             .catch((err) => console.log(err));
    // }, [getInfos]);

    useEffect(() => {
        usersWithPosts &&
            usersWithPosts.map((userId) =>
                dispatch({
                    type: ACTIONS.ADD_USER,
                    payload: { id: userId, token: token },
                })
            );
    }, [token, usersWithPosts]);

    return (
        <UsersInfoContext.Provider value={usersInfo}>
            <UsersInfoUpdateContext.Provider value={dispatch}>
                {children}
            </UsersInfoUpdateContext.Provider>
        </UsersInfoContext.Provider>
    );
}

export default UsersInfoProvider;
