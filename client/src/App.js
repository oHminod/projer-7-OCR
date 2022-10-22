import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./components/context/AuthContext";
import UserProvider from "./components/context/UserContext";
import AnimatedRoutes from "./components/utils/AnimatedRoutes";

const App = () => {
    return (
        <AuthProvider>
            <UserProvider>
                <BrowserRouter>
                    <AnimatedRoutes />
                </BrowserRouter>
            </UserProvider>
        </AuthProvider>
    );
};

export default App;
