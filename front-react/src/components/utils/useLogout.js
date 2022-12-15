import { MPACTIONS } from "../contexts/actions/myPosts";
import { NPACTIONS } from "../contexts/actions/newPosts";
import { PACTIONS } from "../contexts/actions/posts";
import { UIACTIONS } from "../contexts/actions/usersInfo";
import { useAuthUpdate } from "../contexts/AuthContext";
import { useMyPostsUpdate } from "../contexts/MyPostsContext";
import { useNewPostsUpdate } from "../contexts/NewPostsContext";
import {
    useMyOldestPostUpdate,
    useOldestPostUpdate,
} from "../contexts/OldestPostContext";
import { usePostsUpdate } from "../contexts/PostsContext";
import { useSocket } from "../contexts/SocketContext";
import { useUserUpdate } from "../contexts/UserContext";
import { useUsersInfoUpdate } from "../contexts/UsersInfoContext";

const useLogout = () => {
    const setToken = useAuthUpdate();
    const setUser = useUserUpdate();
    const dispatchMyPosts = useMyPostsUpdate();
    const dispatchPosts = usePostsUpdate();
    const dispatchNewPosts = useNewPostsUpdate();
    const dispatchUsersInfo = useUsersInfoUpdate();
    const setMyOldestPost = useMyOldestPostUpdate();
    const setOldestPost = useOldestPostUpdate();

    const socket = useSocket();

    const logout = () => {
        setToken("");
        setUser("");
        dispatchNewPosts({
            type: NPACTIONS.DELETE_NEW_POSTS,
        });
        dispatchMyPosts({
            type: MPACTIONS.DELETE_MY_POSTS,
        });
        dispatchPosts({
            type: PACTIONS.DELETE_POSTS,
        });
        dispatchUsersInfo({
            type: UIACTIONS.DELETE_USERS,
        });
        setMyOldestPost("");
        setOldestPost("");
        socket.disconnect();
    };

    return { logout };
};

export default useLogout;
