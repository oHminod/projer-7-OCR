import React from "react";
import { useAuth, useAuthUpdate } from "../components/context/AuthContext";
import LoginSignupModal from "../components/LoginSignupModal";

const Home = () => {
    const authToken = useAuth();
    const setToken = useAuthUpdate();

    const deconnexion = () => {
        window.localStorage.removeItem("session_groupomania");
        setToken();
    };

    return (
        <div>
            <h1>Hello</h1>
            {authToken ? (
                <div>
                    <h2>Fil d'actu</h2>
                    <button onClick={deconnexion}>Deconnexion</button>
                </div>
            ) : (
                <LoginSignupModal />
            )}
        </div>
    );
};

export default Home;
