import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import BackgroundLogoSvg from "../components/BackgroundLogoSvg";
import { useAuth } from "../components/context/AuthContext";
import Header from "../components/Header";
import UserInfo from "../components/UserInfo";
import { motion } from "framer-motion";

const Membre = () => {
    const auth = useAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        auth && setLoading(false);
    }, [auth]);

    return (
        loading ||
        (auth !== "fin" ? (
            <motion.div
                className="membre"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                    opacity: { duration: 0.3, ease: "easeInOut" },
                }}
                exit={{
                    opacity: 0,
                }}
            >
                {console.log("membre : " + auth)}
                <BackgroundLogoSvg />
                <div className="content">
                    <Header />
                    <UserInfo />
                </div>
            </motion.div>
        ) : (
            <Navigate to={"/"} />
        ))
    );
};
export default Membre;
