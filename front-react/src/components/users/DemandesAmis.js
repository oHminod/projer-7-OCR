import React from "react";
import { useUser } from "../contexts/UserContext";
import { useUsersInfo } from "../contexts/UsersInfoContext";
import DemandeAmi from "./DemandeAmi";
import DemandeEnvoyee from "./DemandeEnvoyee";

const DemandesAmis = () => {
    const my = useUser();
    const usersInfo = useUsersInfo();

    const demandesEnvoyees =
        my &&
        usersInfo &&
        my.demandesEnvoyees &&
        my.demandesEnvoyees.length > 0 &&
        my.demandesEnvoyees.map((friendId, index) => {
            const infosAmi = usersInfo.find((user) => user.userId === friendId);
            if (infosAmi) {
                return <DemandeEnvoyee ami={infosAmi} key={"envoi" + index} />;
            }
            return null;
        });

    const demandesAmis = (
        <div className="utilisateurs">
            <h2>Demandes d'Amis</h2>
            {my &&
                usersInfo &&
                my.demandesAmis.length > 0 &&
                my.demandesAmis.map((friendId, index) => {
                    const infosAmi = usersInfo.find(
                        (user) => user.userId === friendId
                    );
                    if (infosAmi)
                        return (
                            <DemandeAmi
                                ami={infosAmi}
                                key={"demande" + index}
                            />
                        );
                    return null;
                })}
            {demandesEnvoyees}
        </div>
    );

    if (my.demandesEnvoyees.length > 0 || my.demandesAmis.length > 0)
        return demandesAmis;
};

export default DemandesAmis;
