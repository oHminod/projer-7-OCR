import { useEffect } from "react";
import { MPACTIONS } from "../../contexts/actions/myPosts";
import { NPACTIONS } from "../../contexts/actions/newPosts";
import { PACTIONS } from "../../contexts/actions/posts";
import { useMyPosts, useMyPostsUpdate } from "../../contexts/MyPostsContext";
import { useNewPosts, useNewPostsUpdate } from "../../contexts/NewPostsContext";
import { usePosts, usePostsUpdate } from "../../contexts/PostsContext";
import { useSocket } from "../../contexts/SocketContext";

const PropageContentDeleteListener = () => {
    const socket = useSocket();
    const posts = usePosts();
    const myPosts = useMyPosts();
    const newPosts = useNewPosts();
    const dispatchPosts = usePostsUpdate();
    const dispatchMyPosts = useMyPostsUpdate();
    const dispatchNewPosts = useNewPostsUpdate();

    useEffect(() => {
        socket &&
            socket.on("PropageContentDelete", (id) => {
                const contentDeleted = {
                    sharedTexte: "La publication a été supprimée",
                    sharedImage: "",
                };
                posts.map(
                    (post) =>
                        post.sharedPostId === id &&
                        dispatchPosts({
                            type: PACTIONS.UPDATE_POST,
                            payload: {
                                post: { _id: post._id, ...contentDeleted },
                            },
                        })
                );
                myPosts.map(
                    (post) =>
                        post.sharedPostId === id &&
                        dispatchMyPosts({
                            type: MPACTIONS.UPDATE_MY_POST,
                            payload: {
                                post: { _id: post._id, ...contentDeleted },
                            },
                        })
                );
                newPosts.map(
                    (post) =>
                        post.sharedPostId === id &&
                        dispatchNewPosts({
                            type: NPACTIONS.UPDATE_NEW_POST,
                            payload: {
                                post: { _id: post._id, ...contentDeleted },
                            },
                        })
                );
            });
    }, [
        dispatchMyPosts,
        dispatchNewPosts,
        dispatchPosts,
        myPosts,
        newPosts,
        posts,
        socket,
    ]);
};

export default PropageContentDeleteListener;
