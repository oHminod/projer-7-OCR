import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./components/contexts/AuthContext";
import MyPostsProvider from "./components/contexts/MyPostsContext";
import NewPostsProvider from "./components/contexts/NewPostsContext";
import OldestPostsProvider from "./components/contexts/OldestPostContext";
import PostsProvider from "./components/contexts/PostsContext";
import SocketProvider from "./components/contexts/SocketContext";
import UserProvider from "./components/contexts/UserContext";
import UsersInfoProvider from "./components/contexts/UsersInfoContext";
import AnimatedRoutes from "./components/utils/AnimatedRoutes";
import GlobalSocketListener from "./components/utils/GlobalSocketListener";
import SetOldestsPosts from "./components/utils/SetOldestsPosts";

function App() {
    return (
        <AuthProvider>
            <SocketProvider>
                <UserProvider>
                    <OldestPostsProvider>
                        <UsersInfoProvider>
                            <NewPostsProvider>
                                <PostsProvider>
                                    <MyPostsProvider>
                                        <BrowserRouter>
                                            <SetOldestsPosts />
                                            <GlobalSocketListener />
                                            <AnimatedRoutes />
                                        </BrowserRouter>
                                    </MyPostsProvider>
                                </PostsProvider>
                            </NewPostsProvider>
                        </UsersInfoProvider>
                    </OldestPostsProvider>
                </UserProvider>
            </SocketProvider>
        </AuthProvider>
    );
}

export default App;
