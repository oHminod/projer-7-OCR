import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import Navigation from "./navbar/Navigation";

const Header = () => {
    const token = useAuth();
    return <header>{token && <Navigation />}</header>;
};

export default Header;
