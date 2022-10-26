import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../components/context/AuthContext";
import UserInfo from "../components/layouts/membre/userInfo/UserInfo";
import { motion } from "framer-motion";
// import EditProvider from "../components/layouts/membre/userInfo/EditContext";
import Wall from "../components/layouts/membre/mur/Wall";
import EditProvider from "../components/layouts/membre/userInfo/EditContext";
import { useCurrentWidth } from "../components/utils/windowWidth";

const Membre = () => {
    const auth = useAuth();
    const [loading, setLoading] = useState(true);
    const width = useCurrentWidth();

    useEffect(() => {
        auth && setLoading(false);
    }, [auth]);

    return (
        loading ||
        (auth !== "fin" ? (
            <EditProvider>
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
                                <Wall />
                                <UserInfo />
                            </>
                        ) : (
                            <Wall />
                        )}
                    </div>
                </motion.main>
            </EditProvider>
        ) : (
            <Navigate to={"/"} />
        ))
    );
};
export default Membre;
