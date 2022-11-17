import { useEffect, useState } from "react";
import { useAuth } from "../components/contexts/AuthContext";
import { API } from "../utils/axiosCalls";

const useOldestPostFetch = (setOldestPost) => {
    const token = useAuth();
    const [id, setId] = useState("");

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
            API.get(`post/oldest`, config)
                .then((res) => setId(res.data.oldestPostId))
                .catch((err) => {
                    console.log("setOldestPostId : " + err.response.data);
                });
    }, [id, token]);
};
export default useOldestPostFetch;
