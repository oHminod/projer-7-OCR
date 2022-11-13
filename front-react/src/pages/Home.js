import React from "react";
import { motion } from "framer-motion";
import { Navigate } from "react-router-dom";
import Timeline from "../components/layouts/home/Timeline";
import { useVerify } from "../utils/axiosCalls";
import { useAuth } from "../components/contexts/AuthContext";

const Home = () => {
    const authToken = useAuth();

    useVerify();

    return authToken ? (
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
    );
};

export default Home;
