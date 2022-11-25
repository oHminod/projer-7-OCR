import { useEffect, useState } from "react";
import { MPACTIONS } from "../components/contexts/actions/myPosts";
import { useAuth } from "../components/contexts/AuthContext";
import {
    useMyPosts,
    useMyPostsUpdate,
} from "../components/contexts/MyPostsContext";
import { useMyOldestPost } from "../components/contexts/OldestPostContext";
import { API } from "../utils/axiosCalls";

const useFetchMyPosts = (offset, lastItemId = "") => {
    const [loading, setLoading] = useState(true);
    const [prevId, setPrevId] = useState("");
    const myOldestPostId = useMyOldestPost();
    const myPosts = useMyPosts();
    const dispatchMyPosts = useMyPostsUpdate();
    const token = useAuth();

    useEffect(() => {
        let ignore = false;

        if (
            (lastItemId !== "" && myOldestPostId >= lastItemId) ||
            (myPosts && myPosts.length > 0 && lastItemId === "") ||
            (myPosts.length > 0 &&
                (myOldestPostId >= lastItemId || prevId === lastItemId))
        )
            return setLoading(false);

        setLoading(true);

        const config = token && {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        API.get(`post/my/${offset}/${lastItemId}`, config)
            .then((res) => {
                if (!ignore) {
                    setLoading(false);
                    setPrevId(lastItemId);
                    dispatchMyPosts({
                        type: MPACTIONS.ADD_MY_POSTS,
                        payload: { myPosts: res.data },
                    });
                }
            })
            .catch((err) => {
                console.log("myInfiniteFetch : " + err.response.data);
            });
        return () => {
            ignore = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lastItemId, offset]);

    return { loading };
};

export default useFetchMyPosts;
