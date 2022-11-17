import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import Navigation from "./navbar/Navigation";

const Header = () => {
    const token = useAuth();
    return (
        token && (
            <header>
                <Navigation />
            </header>
        )
    );
};

export default Header;
