import React from "react";
import { usePosts } from "../../context/PostsContext";
import SinglePost from "./singlePost/SinglePost";
import { UserInfoProvider } from "./UserInfoContext";

const Posts = () => {
    const posts = usePosts();

    return (
        <>
            <UserInfoProvider>
                {posts &&
                    posts
                        .sort(
                            (a, b) =>
                                Date.parse(b.createdAt) -
                                Date.parse(a.createdAt)
                        )
                        .map((post, index) => (
                            <SinglePost key={"post-" + index} post={post} />
                        ))}
            </UserInfoProvider>
        </>
    );
};

export default Posts;
