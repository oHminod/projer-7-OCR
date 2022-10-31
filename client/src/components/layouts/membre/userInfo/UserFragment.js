import React from "react";
import { useUser } from "../../../context/UserContext";
import { motion } from "framer-motion";

const UserFragment = () => {
    const user = useUser();

    return (
        <motion.div
            layout
            animate={{ height: 305, opacity: 1 }}
            initial={{ height: 423, opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <img src={user.avatar} alt="avatar" width="200" height="200" />
            {user.pseudo && <h2>{user.pseudo}</h2>}
            <p>{user.email}</p>
        </motion.div>
    );
};

export default UserFragment;
