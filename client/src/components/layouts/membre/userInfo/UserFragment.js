import React from "react";
import { useUser } from "../../../context/UserContext";
import { motion } from "framer-motion";

const UserFragment = () => {
    const user = useUser();
    // const [updatedAt, setUpdatedAt] = useState();
    // const [createdAt, setCreatedAt] = useState();

    // useEffect(() => {
    //     user.createdAt &&
    //         setCreatedAt(
    //             new Date(user.createdAt).toLocaleDateString() +
    //                 " à " +
    //                 new Date(user.createdAt).toLocaleTimeString()
    //         );

    //     user.updatedAt &&
    //         setUpdatedAt(
    //             new Date(user.updatedAt).toLocaleDateString() +
    //                 " à " +
    //                 new Date(user.updatedAt).toLocaleTimeString()
    //         );
    // }, [user.updatedAt, user.createdAt]);

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
