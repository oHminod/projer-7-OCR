import React from "react";
import { getAvatarAndPseudo } from "../../utils/axiosCalls";
import { useUser } from "../contexts/UserContext";
import { useUsersInfo, useUsersInfoUpdate } from "../contexts/UsersInfoContext";
import DemandeAmi from "./DemandeAmi";
import DemandeEnvoyee from "./DemandeEnvoyee";

const DemandesAmis = () => {
    const my = useUser();
    const usersInfo = useUsersInfo();
    const dispatchUsersInfo = useUsersInfoUpdate();

    usersInfo &&
        my.demandesAmis.map(
            (friendId) =>
                !usersInfo.find((user) => user.userId === friendId) &&
                getAvatarAndPseudo(friendId, dispatchUsersInfo)
        );

    const demandesEnvoyees =
        my &&
        usersInfo &&
        my.demandesEnvoyees &&
        my.demandesEnvoyees.length > 0 &&
        my.demandesEnvoyees.map((friendId, index) => {
            if (!usersInfo.find((user) => user.userId === friendId)) {
                getAvatarAndPseudo(friendId, dispatchUsersInfo);
            }
            const infosAmi = usersInfo.find((user) => user.userId === friendId);
            if (infosAmi) {
                return <DemandeEnvoyee ami={infosAmi} key={"envoi" + index} />;
            }
            return null;
        });

    const demandesAmis = (
        <div className="utilisateurs amis">
            <h2>Demandes d'Amis</h2>
            {my &&
                usersInfo &&
                my.demandesAmis.length > 0 &&
                my.demandesAmis.map((friendId, index) => {
                    if (!usersInfo.find((user) => user.userId === friendId)) {
                        getAvatarAndPseudo(friendId, dispatchUsersInfo);
                    }
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
