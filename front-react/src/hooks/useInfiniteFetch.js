import { useEffect, useState } from "react";
import { PACTIONS } from "../components/contexts/actions/posts";
import { useAuth } from "../components/contexts/AuthContext";
import { usePosts, usePostsUpdate } from "../components/contexts/PostsContext";
import { API } from "../utils/axiosCalls";

const useInfiniteFetch = (go, offset, lastItemId = "") => {
    const [oldestPostId, setOldestPostId] = useState();
    const [loading, setLoading] = useState(true);
    const dispatchPosts = usePostsUpdate();
    const posts = usePosts();
    const token = useAuth();

    useEffect(() => {
        const config = token && {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        go &&
            config &&
            API.get(`post/oldest`, config)
                .then((res) => setOldestPostId(res.data.oldestPostId))
                .catch((err) => {
                    console.log("setOldestPostId : " + err.response.data);
                });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token, go]);

    useEffect(() => {
        setLoading(true);
        const config = token && {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        if (go && oldestPostId && offset && config) {
            if (lastItemId !== "" && oldestPostId >= lastItemId)
                return setLoading(false);

            API.get(`post/${offset}/${lastItemId}`, config)
                .then((res) => {
                    if (
                        res.data.map((post) => {
                            if (
                                posts.find(
                                    (findPost) => findPost._id === post._id
                                )
                            )
                                return true;
                            return false;
                        })[0]
                    )
                        return setLoading(false);
                    dispatchPosts({
                        type: PACTIONS.ADD_POSTS,
                        payload: { posts: res.data },
                    });
                    setLoading(false);
                })
                .catch((err) => {
                    console.log("infiniteFetch : " + err.response.data);
                });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lastItemId, token, go, oldestPostId]);

    return { loading, oldestPostId };
};
export default useInfiniteFetch;
// post.get("/oldest", sessionOk, getOldestPostId);
// post.get("/:offset/:lastItemId?", sessionOk, getAllPostsPaginated);

// dispatchPosts({type: PACTIONS.ADD_POSTS, payload:{ posts: res.data } })
