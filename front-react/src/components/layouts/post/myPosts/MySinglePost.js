import React from "react";
import { useUser } from "../../../contexts/UserContext";
import { usePost } from "../PostContext";
import SinglePostDisplay from "../singlePost/SinglePostDisplay";

const MySinglePost = ({ lastItemElementRef }) => {
    const user = useUser();
    const thisPost = usePost();
    return (
        <SinglePostDisplay
            thisPost={thisPost}
            thisUser={user}
            lastItemElementRef={lastItemElementRef}
        />
    );
};

export default MySinglePost;
