import { useEffect } from "react";
import { MPACTIONS } from "../../contexts/actions/myPosts";
import { NPACTIONS } from "../../contexts/actions/newPosts";
import { PACTIONS } from "../../contexts/actions/posts";
import { useMyPosts, useMyPostsUpdate } from "../../contexts/MyPostsContext";
import { useNewPosts, useNewPostsUpdate } from "../../contexts/NewPostsContext";
import { usePosts, usePostsUpdate } from "../../contexts/PostsContext";
import { useSocket } from "../../contexts/SocketContext";

const PostDeleted = () => {
    const posts = usePosts();
    const myPosts = useMyPosts();
    const newPosts = useNewPosts();
    const dispatchPosts = usePostsUpdate();
    const dispatchMyPosts = useMyPostsUpdate();
    const dispatchNewPosts = useNewPostsUpdate();
    const socket = useSocket();
    useEffect(() => {
        socket &&
            socket.on("postDeleted", (id) => {
                console.log(id);
                posts.map(
                    (post) =>
                        post._id === id &&
                        dispatchPosts({
                            type: PACTIONS.DELETE_POST,
                            payload: {
                                id: id,
                            },
                        })
                );
                myPosts.map(
                    (post) =>
                        post._id === id &&
                        dispatchMyPosts({
                            type: MPACTIONS.DELETE_MY_POST,
                            payload: {
                                id: id,
                            },
                        })
                );
                newPosts.map(
                    (post) =>
                        post._id === id &&
                        dispatchNewPosts({
                            type: NPACTIONS.DELETE_NEW_POST,
                            payload: {
                                id: id,
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

export default PostDeleted;
