import React from "react";
import { useUser } from "../contexts/UserContext";
import { useUsersInfo } from "../contexts/UsersInfoContext";
import UserCard from "./UserCard";

const Amis = () => {
    const my = useUser();
    const usersInfo = useUsersInfo();

    if (
        my &&
        my.amis.length > 0 &&
        my.amis
            .map((idAmi) => !usersInfo.find((user) => user.userId === idAmi))
            .includes(true)
    )
        return null;

    const amis = my && my.amis.length > 0 && usersInfo && (
        <div className="utilisateurs amis">
            <h2>Amis</h2>
            {my.amis.map((ami, index) => {
                const infosAmi = usersInfo.find((user) => user.userId === ami);

                return (
                    <div className="aUser" key={"amis" + index}>
                        <UserCard user={infosAmi} />
                    </div>
                );
            })}
        </div>
    );

    return amis;
};

export default Amis;
