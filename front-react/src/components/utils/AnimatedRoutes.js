import { AnimatePresence } from "framer-motion";
import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "../../pages/Home";
import Login from "../../pages/Login";
import Membre from "../../pages/Membre";
import { useAuth } from "../contexts/AuthContext";

const AnimatedRoutes = () => {
    const location = useLocation();
    const token = useAuth();

    return (
        <AnimatePresence mode="wait" transition={{ duration: 0.8 }}>
            <Routes location={location} key={location.pathname}>
                {token ? (
                    <>
                        <Route path="*" element={<Home />}></Route>
                        <Route path="/membre" element={<Membre />}></Route>
                    </>
                ) : (
                    <>
                        <Route path="*" element={<Login />}></Route>
                        <Route path="/membre" element={<Login />}></Route>
                    </>
                )}
            </Routes>
        </AnimatePresence>
    );
};

export default AnimatedRoutes;
