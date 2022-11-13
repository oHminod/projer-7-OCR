import React, { useState } from "react";
import UserChangeInfo from "./UserChangeInfo";
import UserFragment from "./UserFragment";
import { motion } from "framer-motion";
import "./UserInfo.scss";
import { useUser } from "../../../contexts/UserContext";

const UserInfo = () => {
    const user = useUser();
    const [modifier, setModifier] = useState(false);

    const toggleModifier = () => {
        setModifier(!modifier);
    };

    return (
        user && (
            <motion.aside layout className="UserInfo">
                {modifier ? (
                    <UserChangeInfo setModifier={setModifier} />
                ) : (
                    <UserFragment />
                )}
                <button onClick={toggleModifier}>
                    {modifier ? "Annuler" : "Modifier"}
                </button>
            </motion.aside>
        )
    );
};

export default UserInfo;
