import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./components/contexts/AuthContext";
import PostsProvider from "./components/contexts/PostsContext";
import SocketProvider from "./components/contexts/SocketContext";
import UserProvider from "./components/contexts/UserContext";
import UsersInfoProvider from "./components/contexts/UsersInfoContext";
import AnimatedRoutes from "./components/utils/AnimatedRoutes";
import GlobalSocketListener from "./components/utils/GlobalSocketListener";

function App() {
    return (
        <AuthProvider>
            <SocketProvider>
                <UserProvider>
                    <UsersInfoProvider>
                        <PostsProvider>
                            <BrowserRouter>
                                <GlobalSocketListener />
                                <AnimatedRoutes />
                            </BrowserRouter>
                        </PostsProvider>
                    </UsersInfoProvider>
                </UserProvider>
            </SocketProvider>
        </AuthProvider>
    );
}

export default App;
