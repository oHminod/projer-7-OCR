import { useEffect } from "react";
import { useSocket } from "../../contexts/SocketContext";
import { useUser, useUserUpdate } from "../../contexts/UserContext";
import { useUsersInfoUpdate } from "../../contexts/UsersInfoContext";

const UpdateMyInfoListener = () => {
    const socket = useSocket();
    const dispatchUsersInfo = useUsersInfoUpdate();
    const my = useUser();
    const setMyInfo = useUserUpdate();

    useEffect(() => {
        socket &&
            my &&
            socket.on("myNewInfo", (myNewInfo) => {
                my._id === myNewInfo._id &&
                    setMyInfo((myPreviousInfo) => {
                        return {
                            ...myPreviousInfo,
                            email: myNewInfo.email,
                            pseudo: myNewInfo.pseudo,
                            bio: myNewInfo.bio,
                            amis: myNewInfo.amis,
                            demandesAmis: myNewInfo.demandesAmis,
                            demandesEnvoyees: myNewInfo.demandesEnvoyees,
                        };
                    });
            });
    }, [dispatchUsersInfo, my, setMyInfo, socket]);
};

export default UpdateMyInfoListener;
