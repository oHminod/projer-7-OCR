import React from "react";
import { getAvatarAndPseudo } from "../../utils/axiosCalls";
import { useUser } from "../contexts/UserContext";
import { useUsersInfo, useUsersInfoUpdate } from "../contexts/UsersInfoContext";
import UserCard from "./UserCard";

const Amis = () => {
    const my = useUser();
    const usersInfo = useUsersInfo();
    const dispatchUsersInfo = useUsersInfoUpdate();

    my &&
        my.amis.length > 0 &&
        my.amis.map((idAmi) => {
            if (!usersInfo.find((user) => user.userId === idAmi)) {
                getAvatarAndPseudo(idAmi, dispatchUsersInfo);
            }

            return null;
        });

    if (
        my &&
        my.amis.length > 0 &&
        my.amis
            .map((idAmi) => {
                if (!usersInfo.find((user) => user.userId === idAmi)) {
                    return true;
                }
                return false;
            })
            .includes(true)
    )
        return null;

    const amis = my && my.amis.length > 0 && usersInfo && (
        <div className="utilisateurs">
            <h2>Amis</h2>
            {my.amis.map((ami, index) => {
                const infosAmi = usersInfo.find((user) => user.userId === ami);

                return (
                    <div className="aUser" key={"amis" + index}>
                        <img
                            src={infosAmi.avatar}
                            alt={"avatar de " + infosAmi.pseudo}
                            className="avatar"
                        />
                        <UserCard user={infosAmi} />
                    </div>
                );
            })}
        </div>
    );

    return amis;
};

export default Amis;
