import React from "react";
import { usePosts } from "../../context/PostsContext";
import SinglePost from "./singlePost/SinglePost";

const Posts = () => {
    const posts = usePosts();

    return (
        <>
            {posts &&
                posts
                    .sort(
                        (a, b) =>
                            Date.parse(b.createdAt) - Date.parse(a.createdAt)
                    )
                    .map((post, index) => (
                        <SinglePost key={"post-" + index} post={post} />
                    ))}
        </>
    );
};

export default Posts;
