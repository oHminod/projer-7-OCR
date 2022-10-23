import React, { createContext, useContext, useState } from "react";

export const FragmentHeightContext = createContext();
export const FragmentHeightUpdateContext = createContext();

export function useFragmentHeight() {
    return useContext(FragmentHeightContext);
}

export function useFragmentHeightUpdate() {
    return useContext(FragmentHeightUpdateContext);
}

export const ChangeInfoHeightContext = createContext();
export const ChangeInfoHeightUpdateContext = createContext();

export function useChangeInfoHeight() {
    return useContext(ChangeInfoHeightContext);
}

export function useChangeInfoHeightUpdate() {
    return useContext(ChangeInfoHeightUpdateContext);
}

const FragmentHeightProvider = ({ children }) => {
    const [fragmentHeight, setFragmentHeight] = useState(false);
    const [changeInfoHeight, setChangeInfoHeight] = useState(false);

    return (
        <FragmentHeightContext.Provider value={fragmentHeight}>
            <FragmentHeightUpdateContext.Provider value={setFragmentHeight}>
                <ChangeInfoHeightContext.Provider value={changeInfoHeight}>
                    <ChangeInfoHeightUpdateContext.Provider
                        value={setChangeInfoHeight}
                    >
                        {children}
                    </ChangeInfoHeightUpdateContext.Provider>
                </ChangeInfoHeightContext.Provider>
            </FragmentHeightUpdateContext.Provider>
        </FragmentHeightContext.Provider>
    );
};

export default FragmentHeightProvider;
