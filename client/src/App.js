import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./components/context/AuthContext";
import MyPostsProvider from "./components/context/MyPostsContext";
import NewPostsProvider from "./components/context/NewPostsContext";
import NewUsersInfoProvider from "./components/context/NewUsersInfoContext";
import PostsProvider from "./components/context/PostsContext";
import SocketProvider from "./components/context/SocketContext";
import UserProvider from "./components/context/UserContext";
import AnimatedRoutes from "./components/utils/AnimatedRoutes";

const App = () => {
    return (
        <AuthProvider>
            <SocketProvider>
                <UserProvider>
                    <NewUsersInfoProvider>
                        <PostsProvider>
                            <NewPostsProvider>
                                <MyPostsProvider>
                                    <BrowserRouter>
                                        <AnimatedRoutes />
                                    </BrowserRouter>
                                </MyPostsProvider>
                            </NewPostsProvider>
                        </PostsProvider>
                    </NewUsersInfoProvider>
                </UserProvider>
            </SocketProvider>
        </AuthProvider>
    );
};

export default App;
