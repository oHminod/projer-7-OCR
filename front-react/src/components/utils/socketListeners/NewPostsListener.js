import { useEffect } from "react";
import { MPACTIONS } from "../../contexts/actions/myPosts";
import { NPACTIONS } from "../../contexts/actions/newPosts";
import { PACTIONS } from "../../contexts/actions/posts";
import { useMyPostsUpdate } from "../../contexts/MyPostsContext";
import { useNewPostsUpdate } from "../../contexts/NewPostsContext";
import { usePostsUpdate } from "../../contexts/PostsContext";
import { useSocket } from "../../contexts/SocketContext";
import { useUser } from "../../contexts/UserContext";

const NewPostsListener = () => {
    const socket = useSocket();
    const my = useUser();
    const dispatchNewPosts = useNewPostsUpdate();
    const dispatchMyPosts = useMyPostsUpdate();
    const dispatchPosts = usePostsUpdate();
    useEffect(() => {
        socket &&
            socket.on("newPost", (data) => {
                if (data && data.newPost.userId === my._id) {
                    dispatchMyPosts({
                        type: MPACTIONS.ADD_MY_POST_ON_TOP,
                        payload: { myPost: data.newPost },
                    });
                    dispatchPosts({
                        type: PACTIONS.ADD_MY_POST_ON_TOP,
                        payload: { myPost: data.newPost },
                    });
                } else if (data) {
                    dispatchNewPosts({
                        type: NPACTIONS.ADD_NEW_POST,
                        payload: { newPost: data.newPost },
                    });
                }
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatchNewPosts, socket]);
};

export default NewPostsListener;
