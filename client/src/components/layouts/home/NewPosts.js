import React from "react";
import { useNewPosts, useNewPostsUpdate } from "../../context/NewPostsContext";
import { usePosts, usePostsUpdate } from "../../context/PostsContext";
import "./NewPosts.scss";

const NewPosts = () => {
    const newPosts = useNewPosts();
    const setNewPosts = useNewPostsUpdate();
    const allPosts = usePosts();
    const setAllPosts = usePostsUpdate();

    const handleClick = () => {
        setAllPosts([...allPosts, ...newPosts]);
        setNewPosts([]);
    };
    return (
        newPosts.length > 0 && (
            <div className="newPosts" onClick={handleClick}>
                <p>Cliquer pour voir les nouveaux posts</p>
            </div>
        )
    );
};

export default NewPosts;
