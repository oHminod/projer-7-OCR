import React, { useEffect, useState } from "react";
import { useAuth } from "../components/context/AuthContext";
import { motion } from "framer-motion";
import { Navigate } from "react-router-dom";
import Timeline from "../components/layouts/home/Timeline";
import { useVerify } from "../utils/axiosCalls";

const Home = () => {
    const authToken = useAuth();
    const [loading, setLoading] = useState(true);
    useVerify();

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
