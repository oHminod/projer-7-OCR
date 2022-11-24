import React, {
    useCallback,
    useEffect,
    // useMemo,
    useRef,
    useState,
} from "react";
import useFetchPosts from "../../../hooks/useFetchPosts";
// import useInfiniteFetch from "../../../hooks/useInfiniteFetch";
import { NPACTIONS } from "../../contexts/actions/newPosts";
import { PACTIONS } from "../../contexts/actions/posts";
import { useNewPosts, useNewPostsUpdate } from "../../contexts/NewPostsContext";
import { usePosts, usePostsUpdate } from "../../contexts/PostsContext";
// import { useUser } from "../../contexts/UserContext";
import PostProvider from "./PostContext";
import SinglePost from "./singlePost/SinglePost";

const Posts = () => {
    const posts = usePosts();
    const [lastItemId, setLastItemId] = useState("");
    const dispatchPosts = usePostsUpdate();
    const newPosts = useNewPosts();
    const dispatchNewPosts = useNewPostsUpdate();
    // const [go, setGo] = useState(false);
    // const user = useUser();
    const observer = useRef();

    // const { loading } = useInfiniteFetch(go, 2, lastItemId);

    const { loading } = useFetchPosts(4, lastItemId);

    const lastItemElementRef = useCallback(
        (node) => {
            if (loading) return;
            if (observer.current) observer.current.disconnect();

            observer.current = new IntersectionObserver(
                (entries) => {
                    if (entries[0].isIntersecting) {
                        setLastItemId(node.id);
                    }
                },
                {
                    rootMargin: "200px",
                }
            );
            if (node) observer.current.observe(node);
            // eslint-disable-next-line no-use-before-define
        },
        [loading]
    );

    // useMemo(() => {
    //     user && setGo(true);
    // }, [user]);

    useEffect(() => {
        if (newPosts && newPosts.length > 0) {
            dispatchPosts({
                type: PACTIONS.ADD_POSTS_ON_TOP,
                payload: { posts: newPosts },
            });
            dispatchNewPosts({
                type: NPACTIONS.DELETE_NEW_POSTS,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {posts &&
                posts.map((post, index) => {
                    if (posts.length === index + 1) {
                        return (
                            <PostProvider
                                key={"postContext-" + index}
                                thisPost={post}
                            >
                                <SinglePost
                                    lastItemElementRef={lastItemElementRef}
                                    key={"post-" + index}
                                    setLastItemId={setLastItemId}
                                />
                            </PostProvider>
                        );
                    } else {
                        return (
                            <PostProvider
                                key={"postContext-" + index}
                                thisPost={post}
                            >
                                <SinglePost
                                    key={"post-" + index}
                                    setLastItemId={setLastItemId}
                                />
                            </PostProvider>
                        );
                    }
                })}
            {loading && <div>loading...</div>}
        </>
    );
};

export default Posts;
