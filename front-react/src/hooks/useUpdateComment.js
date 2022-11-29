import { useEffect, useState } from "react";
import { useAuth } from "../components/contexts/AuthContext";
import { API } from "../utils/axiosCalls";

const useUpdateComment = (setModifier) => {
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
            API.put(`comment/updateComment/${idUpdate}`, query, {
                headers,
            })
                .then(() => {
                    setGoUpdate(false);
                    setIdUpdate(false);
                    setModifier(false);
                })
                .catch((err) => {
                    console.log(err.response.data);
                });
    }, [goUpdate, idUpdate, query, setModifier, token]);

    return { setGoUpdate, setIdUpdate, setQuery };
};

export default useUpdateComment;
