import React from "react";
import DeletePost from "./DeletePost";
import EditPost from "./EditPost";

const ModifierOuSupprimer = ({ setEditModal }) => {
    return (
        <div>
            <EditPost />
            <DeletePost setEditModal={setEditModal} />
        </div>
    );
};

export default ModifierOuSupprimer;
