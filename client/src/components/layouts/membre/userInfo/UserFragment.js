import React, { useEffect, useState } from "react";
import { useUser } from "../../../context/UserContext";

const UserFragment = () => {
    const user = useUser();
    const [updatedAt, setUpdatedAt] = useState();
    const [createdAt, setCreatedAt] = useState();

    useEffect(() => {
        user.createdAt &&
            setCreatedAt(
                new Date(user.createdAt).toLocaleDateString() +
                    " à " +
                    new Date(user.createdAt).toLocaleTimeString()
            );

        user.updatedAt &&
            setUpdatedAt(
                new Date(user.updatedAt).toLocaleDateString() +
                    " à " +
                    new Date(user.updatedAt).toLocaleTimeString()
            );
    }, [user.updatedAt, user.createdAt]);

    return (
        <>
            <img src={user.avatar} alt="avatar" width="200" height="200" />
            {user.pseudo && (
                <p>
                    <strong>Pseudo : </strong> {user.pseudo}
                </p>
            )}
            <p>
                <strong>email : </strong> {user.email}
            </p>
            {createdAt && (
                <p>
                    <strong>Créé le </strong>
                    {createdAt}
                </p>
            )}
            {updatedAt && (
                <p>
                    <strong>Modifié le </strong>
                    {updatedAt}
                </p>
            )}
        </>
    );
};

export default UserFragment;
