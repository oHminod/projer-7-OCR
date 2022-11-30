import React from "react";
import Amis from "./Amis";
import DemandesAmis from "./DemandesAmis";
import Utilisateurs from "./Utilisateurs";
import("./users.scss");

const Users = () => {
    return (
        <div className="users">
            <Utilisateurs />
            <Amis />
            <DemandesAmis />
        </div>
    );
};

export default Users;
