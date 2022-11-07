import React, { useEffect, useState } from "react";
import { useNewUsersInfo } from "../../../context/NewUsersInfoContext";
import { usePost } from "../PostContext";
import "./SinglePost.scss";
import SinglePostDisplay from "./SinglePostDisplay";

const SinglePost = () => {
    const [thisUser, setThisUser] = useState();
    const [checkedUser, setCheckedUser] = useState();
    const thisPost = usePost();
    const usersInfo = useNewUsersInfo();

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

    return <SinglePostDisplay thisPost={thisPost} thisUser={thisUser} />;
};

export default SinglePost;
