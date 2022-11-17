import { useEffect, useState } from "react";
import { useAuth } from "../components/contexts/AuthContext";
import { API } from "../utils/axiosCalls";

const useMyOldestPostFetch = (setMyOldestPost) => {
    const token = useAuth();
    const [id, setId] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        id !== "" && setMyOldestPost(id);
    }, [id, setMyOldestPost]);

    useEffect(() => {
        const config = token && {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        token &&
            id === "" &&
            loading &&
            API.get(`post/myOldest`, config)
                .then((res) => {
                    setId(res.data.oldestPostId);
                    setLoading(false);
                })
                .catch((err) => {
                    console.log("setOldestPostId : " + err.response.data);
                });
    }, [id, token, loading]);
};
export default useMyOldestPostFetch;
