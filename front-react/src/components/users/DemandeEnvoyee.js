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
            <div className="choix">
                <button onClick={handleCancelFriend}>Annuler</button>
            </div>
        </div>
    );
};

export default DemandeEnvoyee;
