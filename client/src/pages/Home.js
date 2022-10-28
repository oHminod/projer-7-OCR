import React, { useEffect, useState } from "react";
import { useAuth } from "../components/context/AuthContext";
import { motion } from "framer-motion";
import { Navigate } from "react-router-dom";
import Timeline from "../components/layouts/home/Timeline";
import { io } from "socket.io-client";
let socket = io("http://127.0.0.1:36600");

const Home = () => {
    const authToken = useAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        socket.on("newPost", (data) => {
            console.log(data.newPost);
        });
    }, []);

    useEffect(() => {
        authToken && setLoading(false);
    }, [authToken]);

    return (
        loading ||
        (authToken !== "fin" ? (
            <motion.div
                className="home"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                    opacity: { duration: 0.3, ease: "easeInOut" },
                }}
                exit={{
                    opacity: 0,
                }}
            >
                <div className="content">
                    <Timeline />
                </div>
            </motion.div>
        ) : (
            <Navigate to={"/"} />
        ))
    );
};

export default Home;
