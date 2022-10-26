import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./components/context/AuthContext";
import MyPostsProvider from "./components/context/MyPostsContext";
import PostsProvider from "./components/context/PostsContext";
import UserProvider from "./components/context/UserContext";
import { UsersInfoProvider } from "./components/context/UsersInfoContext";
import AnimatedRoutes from "./components/utils/AnimatedRoutes";

const App = () => {
    return (
        <AuthProvider>
            <UserProvider>
                <PostsProvider>
                    <UsersInfoProvider>
                        <MyPostsProvider>
                            <BrowserRouter>
                                <AnimatedRoutes />
                            </BrowserRouter>
                        </MyPostsProvider>
                    </UsersInfoProvider>
                </PostsProvider>
            </UserProvider>
        </AuthProvider>
    );
};

export default App;
