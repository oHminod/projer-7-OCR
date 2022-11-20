import { useEffect } from "react";
import { useSocket } from "../../contexts/SocketContext";

const TestListener = () => {
    const socket = useSocket();
    useEffect(() => {
        socket &&
            socket.on("event", (post) => {
                console.log(post);
            });
    }, [socket]);
};

export default TestListener;
