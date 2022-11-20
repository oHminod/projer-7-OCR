import React from "react";
import { NPACTIONS } from "../../contexts/actions/newPosts";
import { PACTIONS } from "../../contexts/actions/posts";
import { useNewPosts, useNewPostsUpdate } from "../../contexts/NewPostsContext";
import { usePostsUpdate } from "../../contexts/PostsContext";
import "./NewPosts.scss";

const NewPosts = () => {
    const newPosts = useNewPosts();
    const dispatchNewPosts = useNewPostsUpdate();
    const dispatchPosts = usePostsUpdate();

    const handleClick = () => {
        dispatchPosts({
            type: PACTIONS.ADD_POSTS_ON_TOP,
            payload: { posts: newPosts },
        });
        dispatchNewPosts({ type: NPACTIONS.DELETE_NEW_POSTS });
    };

    return newPosts.length > 0 ? (
        <div className="newPosts" onClick={handleClick}>
            <p>Cliquer pour voir les nouveaux posts</p>
        </div>
    ) : (
        <div className="newPostsFiller"></div>
    );
};

export default NewPosts;
