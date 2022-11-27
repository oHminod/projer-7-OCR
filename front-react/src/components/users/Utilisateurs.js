import React, { useRef, useState } from "react";
import {
    useAjouterAmi,
    useAnnulerDemande,
    useRetirerAmi,
    useSearchUser,
} from "../../utils/axiosCalls";
import { useUser } from "../contexts/UserContext";

const Utilisateurs = () => {
    const [user, setUser] = useState();
    const [query, setQuery] = useState();
    const inputSearch = useRef();
    const me = useUser();
    const ami = user && me.amis.includes(user._id);
    const demande = user && me.demandesEnvoyees.includes(user._id);

    const { setLoading, error } = useSearchUser(query, setUser);

    const { setGoRemove, setIdRemove } = useRetirerAmi();
    const { setGoAdd, setIdAdd } = useAjouterAmi();
    const { setGoCancel, setIdCancel } = useAnnulerDemande();

    const handleCancelFriend = () => {
        setIdCancel(user._id);
        setGoCancel(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setQuery({ query: inputSearch.current.value });
        setLoading(true);
        inputSearch.current.value = "";
    };

    const handleRemoveFriend = () => {
        setIdRemove(user._id);
        setGoRemove(true);
    };
    const handleAddFriend = () => {
        setIdAdd(user._id);
        setGoAdd(true);
    };

    const userCard = user && (
        <div className="userContainer">
            <img className="avatar" src={user.avatar} alt="" />
            <h3>{user.pseudo}</h3>
            <p>{user.bio}</p>
            {ami ? (
                <button onClick={handleRemoveFriend}>Retirer des amis</button>
            ) : demande ? (
                <button onClick={handleCancelFriend}>Annuler la demande</button>
            ) : (
                user._id !== me._id && (
                    <button onClick={handleAddFriend}>Ajouter un ami</button>
                )
            )}
        </div>
    );

    const searchUser = (
        <div className="utilisateurs">
            <h2>Recherche</h2>
            <form onSubmit={handleSubmit}>
                <input ref={inputSearch} type="text" />
            </form>
            {userCard}
            {error && <p className="error">{error}</p>}
        </div>
    );

    return searchUser;
};

export default Utilisateurs;
