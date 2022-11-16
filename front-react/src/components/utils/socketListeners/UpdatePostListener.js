import { useEffect } from "react";
import { MPACTIONS } from "../../contexts/actions/myPosts";
import { NPACTIONS } from "../../contexts/actions/newPosts";
import { PACTIONS } from "../../contexts/actions/posts";
import { useMyPosts, useMyPostsUpdate } from "../../contexts/MyPostsContext";
import { useNewPosts, useNewPostsUpdate } from "../../contexts/NewPostsContext";
import { usePosts, usePostsUpdate } from "../../contexts/PostsContext";
import { useSocket } from "../../contexts/SocketContext";

const UpdatePostsListener = () => {
    const socket = useSocket();
    const posts = usePosts();
    const myPosts = useMyPosts();
    const newPosts = useNewPosts();
    const dispatchNewPosts = useNewPostsUpdate();
    const dispatchMyPosts = useMyPostsUpdate();
    const dispatchPosts = usePostsUpdate();
    useEffect(() => {
        socket &&
            socket.on("postUpdate", (post) => {
                if (
                    posts.find((findPost) => findPost._id === post._id) &&
                    myPosts.find((findPost) => findPost._id === post._id)
                ) {
                    dispatchPosts({
                        type: PACTIONS.UPDATE_POST,
                        payload: { post: post },
                    });
                    dispatchMyPosts({
                        type: MPACTIONS.UPDATE_MY_POST,
                        payload: { post: post },
                    });
                } else if (
                    posts.find((findPost) => findPost._id === post._id)
                ) {
                    dispatchPosts({
                        type: PACTIONS.UPDATE_POST,
                        payload: { post: post },
                    });
                } else if (
                    myPosts.find((findPost) => findPost._id === post._id)
                ) {
                    dispatchMyPosts({
                        type: MPACTIONS.UPDATE_MY_POST,
                        payload: { post: post },
                    });
                } else if (
                    newPosts.find((findPost) => findPost._id === post._id)
                ) {
                    dispatchNewPosts({
                        type: NPACTIONS.UPDATE_NEW_POST,
                        payload: { post: post },
                    });
                }
            });
    }, [
        socket,
        posts,
        myPosts,
        newPosts,
        dispatchPosts,
        dispatchMyPosts,
        dispatchNewPosts,
    ]);
};

export default UpdatePostsListener;
