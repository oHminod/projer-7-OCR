import React from "react";
import { useComment, usePost } from "../PostContext";
import LikeContainer from "./LikeContainer";
import CommentBlock from "./commentaires/CommentBlock";
import SharedPostPart from "./SharedPostPart";
import PostPart from "./PostPart";
import "./SinglePost.scss";

const SinglePost = ({ lastItemElementRef }) => {
    const comment = useComment();
    const thisPost = usePost();

    return (
        <article
            ref={lastItemElementRef}
            className="singlePost"
            id={thisPost && thisPost._id}
        >
            <PostPart />
            {thisPost && thisPost.sharedUserId !== "" && (
                <SharedPostPart thisPost={thisPost} />
            )}
            <LikeContainer />
            {comment && <CommentBlock />}
        </article>
    );
};
export default SinglePost;
