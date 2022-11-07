import React from "react";
import "./LikeContainer.scss";
import Commenter from "./likesAndLoves/Commenter";
import Loves from "./likesAndLoves/Loves";
import Partager from "./likesAndLoves/Partager";

const LikeContainer = () => {
    return (
        <div className="likeContainer">
            <div className="likeLove">
                <Partager />
                <Loves />
            </div>
            <Commenter />
        </div>
    );
};

export default LikeContainer;
