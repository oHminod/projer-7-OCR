import React from "react";
import { Navigate } from "react-router-dom";
import BackgroundLogoSvg from "../components/BackgroundLogoSvg";
import { useAuth } from "../components/context/AuthContext";
import Header from "../components/Header";
// import Navigation from "../components/Navigation";
import UserInfo from "../components/UserInfo";
import { AnimatePresence, motion } from "framer-motion";

const Membre = () => {
    const auth = useAuth();

    return auth ? (
        <AnimatePresence>
            <motion.div
                className="membre"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{
                    width: { duration: 0.3 },
                }}
                exit={{
                    x: window.innerWidth,
                }}
            >
                <BackgroundLogoSvg />
                <div className="content">
                    <Header />
                    <UserInfo />
                </div>
            </motion.div>
        </AnimatePresence>
    ) : (
        <Navigate to="/home" />
    );
};

export default Membre;
