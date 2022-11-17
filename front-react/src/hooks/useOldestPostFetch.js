import { useEffect, useState } from "react";
import { useAuth } from "../components/contexts/AuthContext";
import { useOldestPostUpdate } from "../components/contexts/OldestPostContext";
import { API } from "../utils/axiosCalls";

const useOldestPostFetch = () => {
    const token = useAuth();
    const setOldestPost = useOldestPostUpdate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const config = token && {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        config &&
            loading &&
            API.get(`post/oldest`, config)
                .then((res) => {
                    setOldestPost(res.data.oldestPostId);
                    setLoading(false);
                })
                .catch((err) => {
                    console.log("setOldestPostId : " + err.response.data);
                });
    }, [loading, setOldestPost, token]);
};
export default useOldestPostFetch;
