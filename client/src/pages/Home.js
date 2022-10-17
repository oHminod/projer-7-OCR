import React, { useEffect } from "react";
import BackgroundLogoSvg from "../components/BackgroundLogoSvg";
import { useAuth } from "../components/context/AuthContext";
import Header from "../components/Header";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const authToken = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        authToken || navigate("/");
    });

    return (
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
            <BackgroundLogoSvg />
            <div className="content">
                <Header />
                <h2>Fil d'actu</h2>
            </div>
        </motion.div>
    );
};

export default Home;
