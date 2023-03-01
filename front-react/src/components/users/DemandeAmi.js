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
            <p>{ami.pseudo}</p>
            <div className="choix">
                <button
                    className="primary btnFollow"
                    onClick={handleReject}
                    title="Refuser la demande d'ami"
                >
                    <i className="fa-solid fa-x"></i>
                </button>
                <button
                    className="success btnFollow"
                    onClick={handleAccept}
                    title="Accepter la demande d'ami"
                >
                    <i className="fa-solid fa-check"></i>
                </button>
            </div>
        </div>
    );
};

export default DemandeAmi;
