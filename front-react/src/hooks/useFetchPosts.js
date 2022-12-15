import { useEffect, useState } from "react";
import { NPACTIONS } from "../components/contexts/actions/newPosts";
import { PACTIONS } from "../components/contexts/actions/posts";
import { useAuth } from "../components/contexts/AuthContext";
import {
    useNewPosts,
    useNewPostsUpdate,
} from "../components/contexts/NewPostsContext";
import { useOldestPost } from "../components/contexts/OldestPostContext";
import { usePosts, usePostsUpdate } from "../components/contexts/PostsContext";
import { API } from "../utils/axiosCalls";

const useFetchPosts = (offset, lastItemId) => {
    const [loading, setLoading] = useState(true);
    const [prevId, setPrevId] = useState("");
    const oldestPostId = useOldestPost();
    const posts = usePosts();
    const dispatchPosts = usePostsUpdate();
    const newPosts = useNewPosts();
    const dispatchNewPosts = useNewPostsUpdate();
    const token = useAuth();

    useEffect(() => {
        let ignore = false;
        const controller = new AbortController();
        const signal = controller.signal;
        if (
            (posts.length > 0 && lastItemId === "") ||
            (lastItemId !== "" && oldestPostId >= lastItemId) ||
            (posts.length > 0 && lastItemId === prevId)
        )
            return setLoading(false);

        setLoading(true);

        if (newPosts && lastItemId && newPosts.length > 0) {
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
        API.get(`post/${offset}/${lastItemId}`, config, { signal })
            .then((res) => {
                if (!ignore) {
                    setLoading(false);
                    setPrevId(lastItemId);
                    dispatchPosts({
                        type: PACTIONS.ADD_POSTS,
                        payload: { posts: res.data },
                    });
                }
            })
            .catch((err) => {
                if (err.name === "AbortError") {
                    // Gérer l'erreur d'abort ici si nécessaire
                } else {
                    console.log("myInfiniteFetch : " + err.response.data);
                }
            });
        return () => {
            controller.abort();
            ignore = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lastItemId, offset]);

    return { loading };
};

export default useFetchPosts;
