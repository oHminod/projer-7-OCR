import React from "react";
import "./LikeContainer.scss";
import Commenter from "./likesAndLoves/Commenter";
import Likes from "./likesAndLoves/Likes";
import Loves from "./likesAndLoves/Loves";

const LikeContainer = () => {
    return (
        <div className="likeContainer">
            <Likes />
            <Loves />
            <Commenter />
        </div>
    );
};

export default LikeContainer;
