import React, { useCallback, useMemo, useRef, useState } from "react";
import useMyInfiniteFetch from "../../../../hooks/useMyInfiniteFetch";
import { useMyPosts } from "../../../contexts/MyPostsContext";
import { useUser } from "../../../contexts/UserContext";
import PostProvider from "../PostContext";
import MySinglePost from "./MySinglePost";

const MyPosts = () => {
    const myPosts = useMyPosts();
    const [lastItemId, setLastItemId] = useState("");
    const [go, setGo] = useState(false);
    const user = useUser();
    const observer = useRef();

    const { loading } = useMyInfiniteFetch(go, 2, lastItemId);

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
            {myPosts &&
                myPosts
                    // .sort(
                    //     (a, b) =>
                    //         Date.parse(b.createdAt) - Date.parse(a.createdAt)
                    // )
                    .map((myPost, index) => {
                        if (myPosts.length === index + 1) {
                            return (
                                <PostProvider
                                    key={"postContext-" + index}
                                    thisPost={myPost}
                                >
                                    <MySinglePost
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
                                    <MySinglePost
                                        setLastItemId={setLastItemId}
                                        key={"post-" + index}
                                    />
                                </PostProvider>
                            );
                        }
                    })}
        </>
    );
};

export default MyPosts;
