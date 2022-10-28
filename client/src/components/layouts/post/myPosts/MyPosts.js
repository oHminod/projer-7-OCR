import React from "react";
import { useMyPosts } from "../../../context/MyPostsContext";
import PostProvider from "../PostContext";
import MySinglePosts from "./MySinglePosts";

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
                            <MySinglePosts key={"post-" + index} />
                        </PostProvider>
                    ))}
        </>
    );
};

export default MyPosts;
