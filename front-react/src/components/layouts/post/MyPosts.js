import React, { useCallback, useRef, useState } from "react";
import useFetchMyPosts from "../../../hooks/useFetchMyPosts";
import { useMyPosts } from "../../contexts/MyPostsContext";
import PostProvider from "./PostContext";
import SinglePost from "./singlePost/SinglePost";

const MyPosts = () => {
    const myPosts = useMyPosts();
    const [lastItemId, setLastItemId] = useState("");
    const observer = useRef();

    const { loading } = useFetchMyPosts(4, lastItemId);

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

    if (!myPosts) return;
    return (
        <>
            {myPosts.map((myPost, index) => {
                if (myPosts.length === index + 1) {
                    return (
                        <PostProvider
                            key={"postContext-" + index}
                            thisPost={myPost}
                        >
                            <SinglePost
                                lastItemElementRef={lastItemElementRef}
                                setLastItemId={setLastItemId}
                                key={"post-" + index}
                            />
                        </PostProvider>
                    );
                } else {
                    return (
                        <PostProvider
                            key={"postContext-" + index}
                            thisPost={myPost}
                        >
                            <SinglePost
                                setLastItemId={setLastItemId}
                                key={"post-" + index}
                            />
                        </PostProvider>
                    );
                }
            })}
            {loading && <div>loading...</div>}
        </>
    );
};

export default MyPosts;
