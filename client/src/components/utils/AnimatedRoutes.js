import { AnimatePresence } from "framer-motion";
import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "../../pages/Home";
import Login from "../../pages/Login";
import Membre from "../../pages/Membre";
// import BackgroundLogoSvg from "../layouts/svg/BackgroundLogoSvg";
import Header from "../layouts/navbar/Header";
import { useAuth } from "../context/AuthContext";

const AnimatedRoutes = () => {
    const location = useLocation();
    const token = useAuth();

    return (
        <>
            <Header />
            <AnimatePresence mode="wait" transition={{ duration: 0.8 }}>
                <Routes location={location} key={location.pathname}>
                    {token ? (
                        <Route path="*" element={<Home />}></Route>
                    ) : (
                        <Route path="*" element={<Login />}></Route>
                    )}
                    {token ? (
                        <Route path="/membre" element={<Membre />}></Route>
                    ) : (
                        <Route path="/membre" element={<Login />}></Route>
                    )}
                </Routes>
            </AnimatePresence>
        </>
    );
};

export default AnimatedRoutes;
