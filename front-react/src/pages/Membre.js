import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import UserInfo from "../components/layouts/membre/userInfo/UserInfo";
import { motion } from "framer-motion";
import Wall from "../components/layouts/membre/mur/Wall";
import { useCurrentWidth } from "../components/utils/windowWidth";
import { useVerify } from "../utils/axiosCalls";
import { useAuth } from "../components/contexts/AuthContext";
import useGetUsersInfo from "../hooks/useGetUsersInfo";

const Membre = () => {
    const auth = useAuth();
    const width = useCurrentWidth();
    useVerify();
    useGetUsersInfo();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return auth ? (
        <motion.main
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
            <div className="content">
                {width > 880 ? (
                    <>
                        <div className="wallContainer">
                            <Wall />
                        </div>
                        <div className="userInfoContainer">
                            <UserInfo />
                        </div>
                    </>
                ) : (
                    <Wall />
                )}
            </div>
        </motion.main>
    ) : (
        <Navigate to={"/"} />
    );
};
export default Membre;
