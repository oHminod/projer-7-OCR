import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Navigate } from "react-router-dom";
import Timeline from "../components/layouts/home/Timeline";
import { useVerify } from "../utils/axiosCalls";
import { useAuth } from "../components/contexts/AuthContext";
import useSetUsersInfo from "../hooks/useSetUsersInfo";
import { useCurrentWidth } from "../components/utils/windowWidth";
import Users from "../components/users/Users";

const Home = () => {
    const width = useCurrentWidth();
    const authToken = useAuth();

    useVerify();
    useSetUsersInfo();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

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
                {width > 880 ? (
                    <>
                        <div className="wallContainer">
                            <Timeline />
                        </div>
                        <div className="usersContainer">
                            <Users />
                        </div>
                    </>
                ) : (
                    <Timeline />
                )}
            </div>
        </motion.div>
    ) : (
        <Navigate to={"/"} />
    );
};

export default Home;
