import React, { useEffect, useState } from "react";
import { useUser } from "../../../context/UserContext";
import UserChangeInfo from "./UserChangeInfo";
import UserFragment from "./UserFragment";
import { motion } from "framer-motion";
import { useEdit, useEditUpdate } from "./EditContext";
import "./UserInfo.scss";

const UserInfo = () => {
    const user = useUser();
    const [loading, setLoading] = useState(true);
    const modifier = useEdit();
    const setModifier = useEditUpdate();

    const toggleModifier = () => {
        modifier ? setModifier(false) : setModifier(true);
    };

    useEffect(() => {
        user && setLoading(false);
    }, [user, modifier]);

    return (
        loading || (
            <motion.aside
                layout
                animate={{
                    height: modifier ? 482 : 363,
                }}
                initial={{
                    height: modifier ? 363 : 482,
                }}
                transition={{ duration: 0.03 }}
                className="UserInfo"
            >
                {modifier ? <UserChangeInfo /> : <UserFragment />}
                <button onClick={toggleModifier}>
                    {modifier ? "Annuler" : "Modifier"}
                </button>
            </motion.aside>
        )
    );
};

export default UserInfo;
