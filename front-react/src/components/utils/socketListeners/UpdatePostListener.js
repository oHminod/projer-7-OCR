import { useEffect } from "react";
import { MPACTIONS } from "../../contexts/actions/myPosts";
import { NPACTIONS } from "../../contexts/actions/newPosts";
import { PACTIONS } from "../../contexts/actions/posts";
import { useMyPostsUpdate } from "../../contexts/MyPostsContext";
import { useNewPostsUpdate } from "../../contexts/NewPostsContext";
import { usePostsUpdate } from "../../contexts/PostsContext";
import { useSocket } from "../../contexts/SocketContext";

const UpdatePostsListener = () => {
    const socket = useSocket();
    const dispatchNewPosts = useNewPostsUpdate();
    const dispatchMyPosts = useMyPostsUpdate();
    const dispatchPosts = usePostsUpdate();
    useEffect(() => {
        socket &&
            socket.on("postUpdate", (post) => {
                dispatchPosts({
                    type: PACTIONS.UPDATE_POST,
                    payload: { post: post },
                });
                dispatchMyPosts({
                    type: MPACTIONS.UPDATE_MY_POST,
                    payload: { post: post },
                });
                dispatchNewPosts({
                    type: NPACTIONS.UPDATE_NEW_POST,
                    payload: { post: post },
                });
            });
    }, [dispatchMyPosts, dispatchNewPosts, dispatchPosts, socket]);
};

export default UpdatePostsListener;
