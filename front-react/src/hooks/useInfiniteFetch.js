import { useEffect, useState } from "react";
import { NPACTIONS } from "../components/contexts/actions/newPosts";
import { PACTIONS } from "../components/contexts/actions/posts";
import { useAuth } from "../components/contexts/AuthContext";
import {
    useNewPosts,
    useNewPostsUpdate,
} from "../components/contexts/NewPostsContext";
import { usePosts, usePostsUpdate } from "../components/contexts/PostsContext";
import { API } from "../utils/axiosCalls";

const useInfiniteFetch = (go, offset, lastItemId = "") => {
    const [oldestPostId, setOldestPostId] = useState();
    const [loading, setLoading] = useState(true);
    const newPosts = useNewPosts();
    const dispatchNewPosts = useNewPostsUpdate();
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
        if (posts && posts.length > 0 && !lastItemId) return setLoading(false);
        setLoading(true);
        if (go && newPosts.length > 0) {
            dispatchPosts({
                type: PACTIONS.ADD_POSTS,
                payload: { posts: newPosts },
            });
            dispatchNewPosts({
                type: NPACTIONS.DELETE_NEW_POSTS,
            });
        }

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
