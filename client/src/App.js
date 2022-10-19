import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./components/context/AuthContext";
import EditProvider from "./components/context/EditContext";
import UserProvider from "./components/context/UserContext";
import AnimatedRoutes from "./components/utils/AnimatedRoutes";

const App = () => {
    return (
        <AuthProvider>
            <UserProvider>
                <EditProvider>
                    <BrowserRouter>
                        <AnimatedRoutes />
                    </BrowserRouter>
                </EditProvider>
            </UserProvider>
        </AuthProvider>
    );
};

export default App;
