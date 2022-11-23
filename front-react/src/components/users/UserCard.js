import React from "react";
import { useRetirerAmi } from "../../utils/axiosCalls";

const UserCard = ({ user }) => {
    const { setGoRemove, setIdRemove } = useRetirerAmi();

    const handleRemoveFriend = () => {
        setIdRemove(user.userId);
        setGoRemove(true);
    };
    return (
        <div className="userCard">
            <p>{user.pseudo}</p>
            <button onClick={handleRemoveFriend}>retirer</button>
        </div>
    );
};

export default UserCard;
