import React from "react";
import { useAnnulerDemande } from "../../utils/axiosCalls";

const DemandeEnvoyee = ({ ami }) => {
    const { setGoCancel, setIdCancel } = useAnnulerDemande();

    const handleCancelFriend = () => {
        setIdCancel(ami.userId);
        setGoCancel(true);
    };
    return (
        <div className="aUser">
            <img
                src={ami.avatar}
                alt={"avatar de " + ami.pseudo}
                className="avatar"
            />
            <p>{ami.pseudo}</p>
            <div className="choix">
                <button
                    className="primary btnFollow"
                    onClick={handleCancelFriend}
                >
                    <i className="fa-solid fa-x"></i>
                </button>
            </div>
        </div>
    );
};

export default DemandeEnvoyee;
