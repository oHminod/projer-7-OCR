import React from "react";
import { motion } from "framer-motion";
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

    return (
        <div className="newPostsFiller">
            {newPosts.length > 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                        opacity: { duration: 0.1, ease: "easeInOut" },
                    }}
                    className="newPosts"
                    onClick={handleClick}
                >
                    <p>Cliquer pour voir les nouveaux posts</p>
                </motion.div>
            )}
        </div>
    );
};

export default NewPosts;
