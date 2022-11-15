import { useEffect } from "react";
import { NPACTIONS } from "../../contexts/actions/newPosts";
import { useNewPostsUpdate } from "../../contexts/NewPostsContext";
import { useSocket } from "../../contexts/SocketContext";

const NewPostsListener = () => {
    const socket = useSocket();
    const dispatchNewPosts = useNewPostsUpdate();
    useEffect(() => {
        socket &&
            socket.on("newPost", (data) => {
                console.log(data);
                data &&
                    dispatchNewPosts({
                        type: NPACTIONS.ADD_NEW_POST,
                        payload: { newPost: data.newPost },
                    });
            });
    }, [dispatchNewPosts, socket]);
};

export default NewPostsListener;
