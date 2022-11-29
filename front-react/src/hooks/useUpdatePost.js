import { useEffect, useState } from "react";
import { useAuth } from "../components/contexts/AuthContext";
import { API } from "../utils/axiosCalls";

const useUpdatePost = (setUpdateMode, setEditModal) => {
    const token = useAuth();
    const [goUpdate, setGoUpdate] = useState(false);
    const [idUpdate, setIdUpdate] = useState();
    const [query, setQuery] = useState();

    useEffect(() => {
        const headers = token && {
            Authorization: `Bearer ${token}`,
        };
        goUpdate &&
            idUpdate &&
            API.put(`post/update/${idUpdate}`, query, {
                headers,
            })
                .then(() => {
                    setGoUpdate(false);
                    setIdUpdate(false);
                    setUpdateMode(false);
                    setEditModal(false);
                })
                .catch((err) => {
                    console.log(err.response.data);
                });
    }, [goUpdate, idUpdate, query, setEditModal, setUpdateMode, token]);

    return { setGoUpdate, setIdUpdate, setQuery };
};

export default useUpdatePost;
