import React from "react";
import { useUser } from "./context/UserContext";

const UserFragment = () => {
    const user = useUser();
    return (
        <>
            <img src={user.avatar} alt="avatar" width="200" height="200" />
            {user.pseudo && (
                <p>
                    <strong>Pseudo :</strong> {user.pseudo}
                </p>
            )}
            <p>
                <strong>email :</strong> {user.email}
            </p>
        </>
    );
};

export default UserFragment;
