import React from "react";
import BackgroundLogoSvg from "../components/BackgroundLogoSvg";
import { useAuth } from "../components/context/AuthContext";
import Header from "../components/Header";
import LoginSignupModal from "../components/LoginSignupModal";
import { AnimatePresence, motion } from "framer-motion";
// import Navigation from "../components/Navigation";

const Home = () => {
    const authToken = useAuth();

    return (
        <AnimatePresence>
            <motion.div
                className="home"
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
                {authToken ? (
                    <div className="content">
                        <Header />
                        <h2>Fil d'actu</h2>
                    </div>
                ) : (
                    <div className="loginModal">
                        <LoginSignupModal />
                    </div>
                )}
            </motion.div>
        </AnimatePresence>
    );
};

export default Home;
