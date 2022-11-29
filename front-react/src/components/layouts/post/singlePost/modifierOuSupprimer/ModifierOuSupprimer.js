import React from "react";
import DeletePost from "./DeletePost";
import EditPost from "./EditPost";

const ModifierOuSupprimer = ({ setEditModal, setUpdateMode }) => {
    return (
        <div>
            <EditPost setUpdateMode={setUpdateMode} />
            <DeletePost setEditModal={setEditModal} />
        </div>
    );
};

export default ModifierOuSupprimer;
