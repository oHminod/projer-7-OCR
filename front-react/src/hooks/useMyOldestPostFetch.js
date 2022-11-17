import { useEffect, useState } from "react";
import { useAuth } from "../components/contexts/AuthContext";
import { useMyOldestPostUpdate } from "../components/contexts/OldestPostContext";
import { API } from "../utils/axiosCalls";

const useMyOldestPostFetch = () => {
    const token = useAuth();
    const setMyOldestPost = useMyOldestPostUpdate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const config = token && {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        token &&
            loading &&
            API.get(`post/myOldest`, config)
                .then((res) => {
                    setMyOldestPost(res.data.oldestPostId);
                    setLoading(false);
                })
                .catch((err) => {
                    console.log("setOldestPostId : " + err.response.data);
                });
    }, [token, loading, setMyOldestPost]);
};
export default useMyOldestPostFetch;
