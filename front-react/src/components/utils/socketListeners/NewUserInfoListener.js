import { useEffect } from "react";
import { UIACTIONS } from "../../contexts/actions/usersInfo";
import { useSocket } from "../../contexts/SocketContext";
import { useUser, useUserUpdate } from "../../contexts/UserContext";
import { useUsersInfoUpdate } from "../../contexts/UsersInfoContext";

const NewUserInfoListener = () => {
    const socket = useSocket();
    const dispatchUsersInfo = useUsersInfoUpdate();
    const my = useUser();
    const setMyInfo = useUserUpdate();

    useEffect(() => {
        socket &&
            my &&
            socket.on("newUserInfo", (newUserInfo) => {
                my._id === newUserInfo.userId &&
                    setMyInfo((myPreviousInfo) => {
                        return {
                            ...myPreviousInfo,
                            email: newUserInfo.email,
                            pseudo: newUserInfo.pseudo,
                        };
                    });
                dispatchUsersInfo({
                    type: UIACTIONS.UPDATE_USER,
                    payload: newUserInfo,
                });
            });
    }, [dispatchUsersInfo, my, setMyInfo, socket]);
};

export default NewUserInfoListener;
