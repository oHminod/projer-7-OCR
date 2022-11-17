import { useEffect, useState } from "react";
import { useAuth } from "../components/contexts/AuthContext";
import { API } from "../utils/axiosCalls";

const useOldestPostFetch = (setOldestPost) => {
    const token = useAuth();
    const [id, setId] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        id !== "" && setOldestPost(id);
    }, [id, setOldestPost]);

    useEffect(() => {
        const config = token && {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        config &&
            id === "" &&
            loading &&
            API.get(`post/oldest`, config)
                .then((res) => {
                    setId(res.data.oldestPostId);
                    setLoading(false);
                })
                .catch((err) => {
                    console.log("setOldestPostId : " + err.response.data);
                });
    }, [id, loading, token]);
};
export default useOldestPostFetch;
