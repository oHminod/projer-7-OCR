import { useEffect } from "react";
import { UIACTIONS } from "../components/contexts/actions/usersInfo";
import { useAuth } from "../components/contexts/AuthContext";
import { useUsersInfoUpdate } from "../components/contexts/UsersInfoContext";
import { API } from "../utils/axiosCalls";

const useGetAvatar = (sanitizedIds) => {
    const token = useAuth();
    const dispatchUsersInfo = useUsersInfoUpdate();
    useEffect(() => {
        const headers = token && {
            Authorization: `Bearer ${token}`,
        };
        headers &&
            sanitizedIds.length > 0 &&
            API.post(`user/getUsersInfo`, sanitizedIds, {
                headers,
            })
                .then((res) =>
                    res.data.map((userInfo) =>
                        dispatchUsersInfo({
                            type: UIACTIONS.ADD_USER,
                            payload: { user: userInfo },
                        })
                    )
                )
                .catch((err) => {
                    console.log(err.response.data);
                });
    }, [dispatchUsersInfo, sanitizedIds, token]);

    return null;
};

export default useGetAvatar;
