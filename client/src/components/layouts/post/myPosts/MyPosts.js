import React from "react";
import { useMyPosts } from "../../../context/MyPostsContext";
import PostProvider from "../PostContext";
import MySinglePost from "./MySinglePost";

const MyPosts = () => {
    const myPosts = useMyPosts();
    return (
        <>
            {myPosts &&
                myPosts
                    .sort(
                        (a, b) =>
                            Date.parse(b.createdAt) - Date.parse(a.createdAt)
                    )
                    .map((post, index) => (
                        <PostProvider
                            key={"postContext-" + index}
                            thisPost={post}
                        >
                            <MySinglePost key={"post-" + index} />
                        </PostProvider>
                    ))}
        </>
    );
};

export default MyPosts;
