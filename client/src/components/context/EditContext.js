import React, { createContext, useContext, useState } from "react";

export const EditContext = createContext();
export const EditUpdateContext = createContext();

export function useEdit() {
    return useContext(EditContext);
}

export function useEditUpdate() {
    return useContext(EditUpdateContext);
}

const EditProvider = ({ children }) => {
    const [editMode, setEditMode] = useState(false);

    return (
        <EditContext.Provider value={editMode}>
            <EditUpdateContext.Provider value={setEditMode}>
                {children}
            </EditUpdateContext.Provider>
        </EditContext.Provider>
    );
};

export default EditProvider;
