import React, { useCallback, useMemo, useRef, useState } from "react";
import useInfiniteFetch from "../../../hooks/useInfiniteFetch";
import { usePosts } from "../../contexts/PostsContext";
import { useUser } from "../../contexts/UserContext";
import PostProvider from "./PostContext";
import SinglePost from "./singlePost/SinglePost";

const Posts = () => {
    const posts = usePosts();
    const [lastItemId, setLastItemId] = useState("");
    const [go, setGo] = useState(false);
    const user = useUser();
    const observer = useRef();

    const { loading } = useInfiniteFetch(go, 2, lastItemId);

    const lastItemElementRef = useCallback(
        (node) => {
            if (loading) return;
            if (observer.current) observer.current.disconnect();

            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    setLastItemId(node.id);
                }
            });
            if (node) observer.current.observe(node);
            // eslint-disable-next-line no-use-before-define
        },
        [loading]
    );

    useMemo(() => {
        user && setGo(true);
    }, [user]);

    return (
        <>
            {posts &&
                posts
                    // .sort(
                    //     (a, b) =>
                    //         Date.parse(b.createdAt) - Date.parse(a.createdAt)
                    // )
                    .map((post, index) => {
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
