import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./components/contexts/AuthContext";
import MyPostsProvider from "./components/contexts/MyPostsContext";
import NewPostsProvider from "./components/contexts/NewPostsContext";
import OldestPostsProvider from "./components/contexts/OldestPostContext";
import PostsProvider from "./components/contexts/PostsContext";
import SocketProvider from "./components/contexts/SocketContext";
import UserProvider from "./components/contexts/UserContext";
import UsersInfoProvider from "./components/contexts/UsersInfoContext";
import GlobalSocketListener from "./components/utils/GlobalSocketListener";
import SetOldestsPosts from "./components/utils/SetOldestsPosts";
import Header from "./components/layouts/header/Header";
import AnimatedRoutes from "./AnimatedRoutes";

function App() {
    return (
        <AuthProvider>
            <UserProvider>
                <SocketProvider>
                    <OldestPostsProvider>
                        <UsersInfoProvider>
                            <NewPostsProvider>
                                <PostsProvider>
                                    <MyPostsProvider>
                                        <BrowserRouter>
                                            <SetOldestsPosts />
                                            <GlobalSocketListener />
                                            <Header />
                                            <AnimatedRoutes />
                                        </BrowserRouter>
                                    </MyPostsProvider>
                                </PostsProvider>
                            </NewPostsProvider>
                        </UsersInfoProvider>
                    </OldestPostsProvider>
                </SocketProvider>
            </UserProvider>
        </AuthProvider>
    );
}

export default App;
