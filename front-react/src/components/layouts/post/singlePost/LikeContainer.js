import React from "react";
import "./LikeContainer.scss";
import Commenter from "./likesAndLoves/Commenter";
import Loves from "./likesAndLoves/Loves";
import Share from "./likesAndLoves/Share";

const LikeContainer = () => {
    return (
        <div className="likeContainer">
            <div className="likeLove">
                <Share />
                <Loves />
            </div>
            <Commenter />
        </div>
    );
};

export default LikeContainer;
