import { useEffect } from "react";
import { MPACTIONS } from "../../contexts/actions/myPosts";
import { NPACTIONS } from "../../contexts/actions/newPosts";
import { PACTIONS } from "../../contexts/actions/posts";
import { useMyPostsUpdate } from "../../contexts/MyPostsContext";
import { useNewPostsUpdate } from "../../contexts/NewPostsContext";
import { usePostsUpdate } from "../../contexts/PostsContext";
import { useSocket } from "../../contexts/SocketContext";

const PostDeleted = () => {
    const dispatchPosts = usePostsUpdate();
    const dispatchMyPosts = useMyPostsUpdate();
    const dispatchNewPosts = useNewPostsUpdate();
    const socket = useSocket();
    useEffect(() => {
        socket &&
            socket.on("postDeleted", (id) => {
                dispatchPosts({
                    type: PACTIONS.DELETE_POST,
                    payload: {
                        id: id,
                    },
                });
                dispatchMyPosts({
                    type: MPACTIONS.DELETE_MY_POST,
                    payload: {
                        id: id,
                    },
                });
                dispatchNewPosts({
                    type: NPACTIONS.DELETE_NEW_POST,
                    payload: {
                        id: id,
                    },
                });
            });
    }, [dispatchMyPosts, dispatchNewPosts, dispatchPosts, socket]);
};

export default PostDeleted;
