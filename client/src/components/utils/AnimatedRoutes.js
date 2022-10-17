import { AnimatePresence } from "framer-motion";
import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "../../pages/Home";
import Login from "../../pages/Login";
import Membre from "../../pages/Membre";

const AnimatedRoutes = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="*" element={<Home />}></Route>
                <Route path="/" element={<Login />}></Route>
                <Route path="/membre" element={<Membre />}></Route>
            </Routes>
        </AnimatePresence>
    );
};

export default AnimatedRoutes;
