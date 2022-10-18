import React, { useEffect, useState } from "react";
import { useUser } from "./context/UserContext";

const UserInfo = () => {
    const user = useUser();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        user && setLoading(false);
    }, [user]);

    return (
        loading || (
            <div>
                <p>ID : {user._id} </p>
                <p>Pseudo : {user.pseudo}</p>
                <p>email : {user.email}</p>
                <img src={user.avatar} alt="avatar" />
            </div>
        )
    );
};

export default UserInfo;
