import React from "react";
import { useUser } from "../../../contexts/UserContext";

const UserFragment = () => {
    const user = useUser();

    if (!user) return null;
    return (
        <>
            <img src={user.avatar} alt="avatar" width="200" height="200" />
            <h2>{user.pseudo}</h2>
            <p>{user.email}</p>
            {user.bio && <p>{user.bio}</p>}
        </>
    );
};

export default UserFragment;
