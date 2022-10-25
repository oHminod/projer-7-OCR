import React, { useEffect, useState } from "react";
import {
    axiosGetAllPosts,
    // getAvatarAndPseudo,
} from "../../../utils/axiosCalls";
import { useAuth } from "../../context/AuthContext";
import SinglePost from "./singlePost/SinglePost";

const Posts = () => {
    const [posts, setPosts] = useState();
    // const [usersWhoHavePost, setUsersWhoHavePost] = useState([]);
    // const [usersInfo, setUsersInfo] = useState([]);
    // const [loading, setLoading] = useState(true);
    const token = useAuth();

    useEffect(() => {
        token && axiosGetAllPosts(token).then((allPosts) => setPosts(allPosts));
    }, [token]);

    // useEffect(() => {
    //     awaitIDs();
    //     async function awaitIDs() {
    //         if (posts) {
    //             const promesseTab = posts.map(async (post) => {
    //                 if (usersWhoHavePost.indexOf(post.userId) === -1) {
    //                     setUsersWhoHavePost([...usersWhoHavePost, post.userId]);
    //                 }
    //             });
    //             await Promise.all(promesseTab);
    //             setLoading(false);
    //         }
    //     }
    // }, [usersWhoHavePost, posts]);

    // useEffect(() => {
    //     awaitInfos();
    //     async function awaitInfos() {
    //         if (!loading) {
    //             const promesseTab = usersWhoHavePost.map(async (ID) =>
    //                 getAvatarAndPseudo(token, ID).then((userInfo) =>
    //                     setUsersInfo([...usersInfo, userInfo])
    //                 )
    //             );
    //             await Promise.all(promesseTab);
    //         }
    //     }
    //     // console.log(usersWhoHavePost);
    // }, [loading, usersWhoHavePost]);

    return (
        <>
            {posts &&
                posts
                    .sort(
                        (a, b) =>
                            Date.parse(b.createdAt) - Date.parse(a.createdAt)
                    )
                    .map((post, index) => (
                        <SinglePost
                            key={"post-" + index}
                            post={post}
                            // usersInfo={usersInfo}
                        />
                    ))}
        </>
    );
};

export default Posts;
