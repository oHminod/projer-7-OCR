import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./components/context/AuthContext";
import Home from "./pages/Home";
import Membre from "./pages/Membre";

const App = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="*" element={<Home />}></Route>
                    <Route path="/membre" element={<Membre />}></Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
};

export default App;
