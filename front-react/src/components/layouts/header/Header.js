import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import Navigation from "./navbar/Navigation";

const Header = () => {
    const token = useAuth();

    if (!token) return;
    return (
        <header>
            <Navigation />
        </header>
    );
};

export default Header;
