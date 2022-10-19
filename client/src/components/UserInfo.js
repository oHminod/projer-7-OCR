import React, { useEffect, useState } from "react";
import { useUser } from "./context/UserContext";
import UserChangeInfo from "./UserChangeInfo";
import UserFragment from "./UserFragment";
import { motion } from "framer-motion";
import { useEdit, useEditUpdate } from "./context/EditContext";

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
            <motion.aside layout className="UserInfo">
                {modifier ? <UserChangeInfo /> : <UserFragment />}
                <button onClick={toggleModifier}>
                    {modifier ? "Annuler" : "modifier"}
                </button>
            </motion.aside>
        )
    );
};

export default UserInfo;
