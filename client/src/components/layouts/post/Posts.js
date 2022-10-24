import React, { useEffect, useState } from "react";
import { axiosGetAllPosts } from "../../../utils/axiosCalls";
import { useAuth } from "../../context/AuthContext";
import SinglePost from "./SinglePost";

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const token = useAuth();

    useEffect(() => {
        axiosGetAllPosts(token, setPosts);
    }, [token]);

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
