import React from "react";
import { useUser } from "../../../contexts/UserContext";

const UserFragment = () => {
    const user = useUser();

    return (
        <div>
            <img src={user.avatar} alt="avatar" width="200" height="200" />
            {user.pseudo && <h2>{user.pseudo}</h2>}
            <p>{user.email}</p>
        </div>
    );
};

export default UserFragment;
