import React from "react";
import { useAuth } from "./context/AuthContext";
import Navigation from "./Navigation";

const Header = () => {
    const token = useAuth();
    return <header>{token && <Navigation />}</header>;
};

export default Header;
