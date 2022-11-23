import React from "react";
import { useAccepterAmi, useRefuserAmi } from "../../utils/axiosCalls";

const DemandeAmi = ({ ami }) => {
    const { setGoAccept, setIdAccept } = useAccepterAmi();
    const { setGoReject, setIdReject } = useRefuserAmi();

    const handleAccept = () => {
        setIdAccept(ami.userId);
        setGoAccept(true);
    };
    const handleReject = () => {
        setIdReject(ami.userId);
        setGoReject(true);
    };

    return (
        <div className="aUser">
            <img
                src={ami.avatar}
                alt={"avatar de " + ami.pseudo}
                className="avatar"
            />
            <div className="choix">
                <button onClick={handleAccept}>Accepter</button>
                <button onClick={handleReject}>Refuser</button>
            </div>
        </div>
    );
};

export default DemandeAmi;
