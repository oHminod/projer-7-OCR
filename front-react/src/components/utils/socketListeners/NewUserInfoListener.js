import { useEffect } from "react";
import { UIACTIONS } from "../../contexts/actions/usersInfo";
import { useSocket } from "../../contexts/SocketContext";
import { useUsersInfoUpdate } from "../../contexts/UsersInfoContext";

const NewUserInfoListener = () => {
    const socket = useSocket();
    const dispatchUsersInfo = useUsersInfoUpdate();
    useEffect(() => {
        socket &&
            socket.on("newUserInfo", (newUserInfo) => {
                dispatchUsersInfo({
                    type: UIACTIONS.UPDATE_USER,
                    payload: newUserInfo,
                });
            });
    }, [dispatchUsersInfo, socket]);
};

export default NewUserInfoListener;
