import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

const App = () => {
    const [authToken, setAuthToken] = useState();

    useEffect(() => {
        if (window.localStorage.getItem("session_groupomania")) {
            const { token } = JSON.parse(
                window.localStorage.getItem("session_groupomania")
            );
            setAuthToken(token);
        }
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}></Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
