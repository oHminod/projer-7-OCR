import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./components/context/AuthContext";
import MyPostsProvider from "./components/context/MyPostsContext";
import NewPostsProvider from "./components/context/NewPostsContext";
import PostsProvider from "./components/context/PostsContext";
import { socket, SocketContext } from "./components/context/SocketContext";
import UserProvider from "./components/context/UserContext";
import { UsersInfoProvider } from "./components/context/UsersInfoContext";
import AnimatedRoutes from "./components/utils/AnimatedRoutes";

const App = () => {
    return (
        <AuthProvider>
            <SocketContext.Provider value={socket}>
                <UserProvider>
                    <PostsProvider>
                        <NewPostsProvider>
                            <MyPostsProvider>
                                <UsersInfoProvider>
                                    <BrowserRouter>
                                        <AnimatedRoutes />
                                    </BrowserRouter>
                                </UsersInfoProvider>
                            </MyPostsProvider>
                        </NewPostsProvider>
                    </PostsProvider>
                </UserProvider>
            </SocketContext.Provider>
        </AuthProvider>
    );
};

export default App;
