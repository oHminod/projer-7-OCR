import React from "react";
import { useMyPosts } from "../../../context/MyPostsContext";
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
                        <MySinglePosts key={"post-" + index} post={post} />
                    ))}
        </>
    );
};

export default MyPosts;
