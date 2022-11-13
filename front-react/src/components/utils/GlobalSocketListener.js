import { useEffect } from "react";
import { UIACTIONS } from "../contexts/actions/usersInfo";
import { useSocket } from "../contexts/SocketContext";
import { useUsersInfoUpdate } from "../contexts/UsersInfoContext";

const GlobalSocketListener = () => {
    const socket = useSocket();
    const dispatchUsersInfo = useUsersInfoUpdate();
    useEffect(() => {
        socket &&
            socket.on("connect", () => {
                console.log(`connecté avec l'id ${socket.id}`);

                socket.on("newUserInfo", (newUserInfo) => {
                    dispatchUsersInfo({
                        type: UIACTIONS.UPDATE_USER,
                        payload: newUserInfo,
                    });
                    // let allUsersCopy = [...usersInfo];
                    // const thisUserIndex = allUsersCopy
                    //     .map((user) => user.userId)
                    //     .indexOf(userObj.userId);
                    // thisUserIndex !== -1 &&
                    //     (allUsersCopy[thisUserIndex] = {
                    //         ...allUsersCopy[thisUserIndex],
                    //         ...userObj,
                    //     });
                    // thisUserIndex !== -1 && setUsersInfo(allUsersCopy);
                });
            });
    }, [dispatchUsersInfo, socket]);
    return null;
};

export default GlobalSocketListener;
