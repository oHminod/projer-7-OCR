import { useEffect, useState } from "react";
import { useAuth } from "../components/contexts/AuthContext";
import { useMyPosts } from "../components/contexts/MyPostsContext";
import { useMyOldestPostUpdate } from "../components/contexts/OldestPostContext";
import { API } from "../utils/axiosCalls";

const useMyOldestPostFetch = () => {
    const token = useAuth();
    const setMyOldestPost = useMyOldestPostUpdate();
    const myPosts = useMyPosts();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const config = token && {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        token &&
            loading &&
            myPosts &&
            myPosts.length > 0 &&
            API.get(`post/myOldest`, config)
                .then((res) => {
                    setMyOldestPost(res.data.oldestPostId);
                    setLoading(false);
                })
                .catch((err) => {
                    err.response.status !== 404 && console.log(err.message);
                });
    }, [token, myPosts, loading, setMyOldestPost]);
};
export default useMyOldestPostFetch;
