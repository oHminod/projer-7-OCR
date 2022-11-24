import React, { useState } from "react";
import UserChangeInfo from "./UserChangeInfo";
import UserFragment from "./UserFragment";
import "./UserInfo.scss";
import { useUser } from "../../../contexts/UserContext";
import Amis from "../../../users/Amis";
import DemandesAmis from "../../../users/DemandesAmis";

const UserInfo = () => {
    const user = useUser();
    const [modifier, setModifier] = useState(false);

    const toggleModifier = () => {
        setModifier(!modifier);
    };

    if (!user) return null;
    return (
        <>
            <aside className="UserInfo">
                {modifier ? (
                    <UserChangeInfo setModifier={setModifier} />
                ) : (
                    <UserFragment />
                )}
                <button onClick={toggleModifier}>
                    {modifier ? "Annuler" : "Modifier"}
                </button>
            </aside>
            <Amis />
            <DemandesAmis />
        </>
    );
};

export default UserInfo;
