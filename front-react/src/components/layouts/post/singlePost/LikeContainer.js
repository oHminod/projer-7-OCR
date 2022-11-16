import React from "react";
import "./LikeContainer.scss";
import Commenter from "./likesAndLoves/Commenter";
import Loves from "./likesAndLoves/Loves";
import Share from "./likesAndLoves/Share";
// import Partager from "./likesAndLoves/Partager";

const LikeContainer = () => {
    return (
        <div className="likeContainer">
            <div className="likeLove">
                {/* <Partager /> */}
                <Share />
                <Loves />
            </div>
            <Commenter />
        </div>
    );
};

export default LikeContainer;
