import React from "react";
import { useRetirerAmi } from "../../utils/axiosCalls";

const UserCard = ({ user }) => {
    const { setGoRemove, setIdRemove } = useRetirerAmi();

    const handleRemoveFriend = () => {
        setIdRemove(user.userId);
        setGoRemove(true);
    };
    return (
        <>
            <img
                src={user.avatar}
                alt={"avatar de " + user.pseudo}
                className="avatar"
            />
            <p>{user.pseudo}</p>
            <div className="choix">
                <button
                    className="primary btnFollow"
                    onClick={handleRemoveFriend}
                >
                    <i className="fa-solid fa-x"></i>
                </button>
                <button
                    className="messages btnFollow"
                    // onClick={handleChatWithFriend}
                >
                    <i className="fa-solid fa-comment"></i>
                </button>
            </div>
        </>
    );
};

export default UserCard;
