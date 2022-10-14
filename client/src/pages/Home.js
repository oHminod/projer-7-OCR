import React from "react";
import { useAuth } from "../components/context/AuthContext";
import LoginSignupModal from "../components/LoginSignupModal";
import Navigation from "../components/Navigation";

const Home = () => {
    const authToken = useAuth();

    return (
        <div>
            <h1>Hello</h1>
            <Navigation />
            {authToken ? <h2>Fil d'actu</h2> : <LoginSignupModal />}
        </div>
    );
};

export default Home;
