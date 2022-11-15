import React, { useEffect, useState } from "react";
import { useUsersInfo } from "../../../contexts/UsersInfoContext";
import { usePost } from "../PostContext";
import SinglePostDisplay from "../SinglePostDisplay";
import "./SinglePost.scss";

const SinglePost = ({ lastItemElementRef }) => {
    const [thisUser, setThisUser] = useState();
    const [checkedUser, setCheckedUser] = useState();
    const thisPost = usePost();
    const usersInfo = useUsersInfo();

    useEffect(() => {
        usersInfo &&
            thisPost &&
            setCheckedUser(
                usersInfo.find(
                    (findUser) => findUser.userId === thisPost.userId
                )
            );
        checkedUser && setThisUser(checkedUser);
    }, [usersInfo, checkedUser, thisPost]);

    return (
        <SinglePostDisplay
            thisPost={thisPost}
            thisUser={thisUser}
            lastItemElementRef={lastItemElementRef}
        />
    );
};

export default SinglePost;
