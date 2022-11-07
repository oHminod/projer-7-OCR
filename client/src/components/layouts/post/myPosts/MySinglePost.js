import React from "react";
import { useUser } from "../../../context/UserContext";
import { usePost } from "../PostContext";
import "../singlePost/SinglePost.scss";
import SinglePostDisplay from "../singlePost/SinglePostDisplay";

const MySinglePost = () => {
    const user = useUser();
    const thisPost = usePost();

    return <SinglePostDisplay thisPost={thisPost} thisUser={user} />;
};

export default MySinglePost;
