import { useEffect, useState } from "react";
import { MPACTIONS } from "../components/contexts/actions/myPosts";
import { NPACTIONS } from "../components/contexts/actions/newPosts";
import { useAuth } from "../components/contexts/AuthContext";
import {
    useMyPosts,
    useMyPostsUpdate,
} from "../components/contexts/MyPostsContext";
import {
    useNewPosts,
    useNewPostsUpdate,
} from "../components/contexts/NewPostsContext";
import { useMyOldestPost } from "../components/contexts/OldestPostContext";
import { API } from "../utils/axiosCalls";

const useMyInfiniteFetch = (go, offset, lastItemId = "") => {
    const myOldestPostId = useMyOldestPost();
    const [loading, setLoading] = useState(true);
    const newPosts = useNewPosts();
    const dispatchNewPosts = useNewPostsUpdate();
    const dispatchMyPosts = useMyPostsUpdate();
    const myPosts = useMyPosts();
    const token = useAuth();

    useEffect(() => {
        if (myPosts && myPosts.length > 0 && !lastItemId)
            return setLoading(false);
        setLoading(true);
        if (go && newPosts.length > 0) {
            dispatchMyPosts({
                type: MPACTIONS.ADD_MY_POSTS,
                payload: { myPosts: newPosts },
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
        if (go && myOldestPostId && offset && config) {
            if (lastItemId !== "" && myOldestPostId >= lastItemId)
                return setLoading(false);

            API.get(`post/my/${offset}/${lastItemId}`, config)
                .then((res) => {
                    dispatchMyPosts({
                        type: MPACTIONS.ADD_MY_POSTS,
                        payload: { myPosts: res.data },
                    });
                    setLoading(false);
                })
                .catch((err) => {
                    console.log("myInfiniteFetch : " + err.response.data);
                });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lastItemId, token, go, myOldestPostId]);

    return { loading, myOldestPostId };
};
export default useMyInfiniteFetch;
