import React, {
    useState,
    createContext,
    useContext,
    useEffect,
    useMemo,
} from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import { getAvatarAndPseudo } from "../../utils/axiosCalls";
import { useUsersWithPosts } from "./PostsContext";
import { useSocket } from "./SocketContext";

export const UsersInfoContext = createContext();

export function useUsersInfo() {
    return useContext(UsersInfoContext);
}

export const UsersInfoUpdateContext = createContext();

export function useUsersInfoUpdate() {
    return useContext(UsersInfoUpdateContext);
}

export function UsersInfoProvider({ children }) {
    const [usersInfo, setUsersInfo] = useLocalStorage(
        "groupomania-usersInfo",
        []
    );
    const usersWithPosts = useUsersWithPosts();
    const socket = useSocket();

    const [ioBlock, setIoBlock] = useState(true);

    useEffect(() => {
        socket &&
            socket.on("likeAndLovesResponse", () => {
                setIoBlock(false);
            });
    }, [socket]);

    const getInfos = useMemo(() => {
        if (usersWithPosts && ioBlock) {
            return awaitInfos(usersWithPosts);
        }
        async function awaitInfos(usersWithPosts) {
            let tempTab = [];
            const promesseTab = await usersWithPosts.map(
                (ID) =>
                    !tempTab.find((findUser) => findUser.userId === ID) &&
                    getAvatarAndPseudo(ID).then((user) => {
                        tempTab = [...tempTab, user];
                    })
            );
            await Promise.all(promesseTab);
            return tempTab;
        }
    }, [ioBlock, usersWithPosts]);

    useEffect(() => {
        getInfos &&
            getInfos
                .then((data) => setUsersInfo(data))
                .catch((err) => console.log(err));
    }, [getInfos, setUsersInfo]);

    return (
        <UsersInfoContext.Provider value={usersInfo}>
            <UsersInfoUpdateContext.Provider value={setUsersInfo}>
                {children}
            </UsersInfoUpdateContext.Provider>
        </UsersInfoContext.Provider>
    );
}

export default UsersInfoProvider;
