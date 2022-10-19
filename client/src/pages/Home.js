import React, { useEffect, useState } from "react";
import BackgroundLogoSvg from "../components/BackgroundLogoSvg";
import { useAuth } from "../components/context/AuthContext";
import Header from "../components/Header";
import { motion } from "framer-motion";
import { Navigate } from "react-router-dom";

const Home = () => {
    const authToken = useAuth();
    const [loading, setLoading] = useState(true);

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
                    <h2>Fil d'actu</h2>
                </div>
            </motion.div>
        ) : (
            <Navigate to={"/"} />
        ))
    );
};

export default Home;
