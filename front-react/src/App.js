import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./components/contexts/AuthContext";
import UserProvider from "./components/contexts/UserContext";
import AnimatedRoutes from "./components/utils/AnimatedRoutes";

function App() {
    return (
        <AuthProvider>
            <UserProvider>
                <BrowserRouter>
                    <AnimatedRoutes />
                </BrowserRouter>
            </UserProvider>
        </AuthProvider>
    );
}

export default App;
