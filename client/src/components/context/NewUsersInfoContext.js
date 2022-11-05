import React, {
    // useState,
    createContext,
    useContext,
    // useEffect,
    // useMemo,
    // useMemo,
    useReducer,
    // useState,
} from "react";
// import { getAsyncAvatarAndPseudo } from "../../utils/axiosCalls";
// import { useAuth } from "./AuthContext";
// import { useUsersWithPosts } from "./PostsContext";
// import { useSocket } from "./SocketContext";

export const NewUsersInfoContext = createContext();

export function useNewUsersInfo() {
    return useContext(NewUsersInfoContext);
}

export const NewUsersInfoUpdateContext = createContext();

export function useNewUsersInfoUpdate() {
    return useContext(NewUsersInfoUpdateContext);
}

export const ACTIONS = {
    ADD_USER: "add-user",
};

export function reducer(newUsersInfo, action) {
    switch (action.type) {
        case ACTIONS.ADD_USER:
            // const data = newUserInfo(newUsersInfo, action.payload);
            // data && console.log(newUsersInfo);
            if (Array.isArray(newUsersInfo)) {
                return [...newUsersInfo, newUserInfo(action.payload)];
            }
            break;
        default:
            return newUsersInfo;
    }
}

function newUserInfo(payload) {
    return { ...payload };
}

export function NewUsersInfoProvider({ children }) {
    const [newUsersInfo, dispatch] = useReducer(reducer, []);
    // const [data, setData] = useState({});
    // const usersWithPosts = useUsersWithPosts();
    // const token = useAuth();
    // const socket = useSocket();

    // const [ioBlock, setIoBlock] = useState(true);
    // console.log(newUsersInfo);

    // useMemo(() => {
    //     usersWithPosts &&
    //         usersWithPosts.map((userId) =>
    //             dispatch({
    //                 type: ACTIONS.ADD_USER,
    //                 payload: { id: userId, token: token },
    //             })
    //         );
    // }, [token, usersWithPosts]);
    // useEffect(() => {
    // const initFetch = async (userId) => {
    //     const req = await getAsyncAvatarAndPseudo(token, userId);
    //     console.log(userId);
    //     setData(req);
    // };
    // usersWithPosts &&
    //     usersWithPosts.map((userId) => {
    //         // const thisUserIndex = newUsersInfo
    //         //     .map((user) => user)
    //         //     .indexOf(userId);
    //         // if (thisUserIndex !== -1) {
    //         initFetch(userId) &&
    //             data &&
    //             dispatch({
    //                 type: ACTIONS.ADD_USER,
    //                 payload: data,
    //             });
    //         // }
    //         return newUsersInfo;
    //     });
    // console.log(data);
    // }, [data, newUsersInfo, token, usersWithPosts]);
    return (
        <NewUsersInfoContext.Provider value={newUsersInfo}>
            <NewUsersInfoUpdateContext.Provider value={dispatch}>
                {children}
            </NewUsersInfoUpdateContext.Provider>
        </NewUsersInfoContext.Provider>
    );
}

export default NewUsersInfoProvider;
