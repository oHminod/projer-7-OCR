import React from "react";
import Amis from "./Amis";
// import { useGetAllUsers } from "../../utils/axiosCalls";
// import Amis from "./Amis";
import DemandesAmis from "./DemandesAmis";
import Utilisateurs from "./Utilisateurs";
import("./users.scss");

const Users = () => {
    // const [users, setUsers] = useState();

    // useGetAllUsers(users, setUsers);

    // if (!users) return null;
    return (
        <div className="users">
            <Utilisateurs />
            <Amis />
            <DemandesAmis />
        </div>
    );
};

export default Users;
