import React, { useState } from "react";
import { useRetirerAmi } from "../../utils/axiosCalls";

const UserCard = ({ user }) => {
    const { setGoRemove, setIdRemove } = useRetirerAmi();
    const [showControls, setShowControls] = useState(false);

    const handleRemoveFriend = () => {
        setIdRemove(user.userId);
        setGoRemove(true);
    };
    const activateControls = () => {
        setShowControls((prev) => !prev);
    };

    return (
        <div onClick={activateControls} className="aUserContainer">
            <img
                src={user.avatar}
                alt={"avatar de " + user.pseudo}
                className="avatar"
            />
            <p>{user.pseudo}</p>
            <div className="choix">
                {!showControls ? (
                    <button className="modifierOuSupprimer">
                        <i className="fa-solid fa-ellipsis"></i>
                    </button>
                ) : (
                    <>
                        <button
                            className="primary btnFollow"
                            onClick={handleRemoveFriend}
                            title="Retirer de la liste d'amis"
                        >
                            <i className="fa-solid fa-x"></i>
                        </button>
                        <button
                            className="messages btnFollow"
                            // onClick={handleChatWithFriend}
                            title="Envoyer un message"
                        >
                            <i className="fa-solid fa-comment"></i>
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default UserCard;
