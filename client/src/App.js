import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./components/context/AuthContext";
import PostsProvider from "./components/context/PostsContext";
import UserProvider from "./components/context/UserContext";
import AnimatedRoutes from "./components/utils/AnimatedRoutes";

const App = () => {
    return (
        <AuthProvider>
            <UserProvider>
                <PostsProvider>
                    <BrowserRouter>
                        <AnimatedRoutes />
                    </BrowserRouter>
                </PostsProvider>
            </UserProvider>
        </AuthProvider>
    );
};

export default App;
