import React from "react";
import SinglePostForm from "../../post/form/SinglePostForm";
import Posts from "../../post/Posts";
import "./Wall.scss";

const Wall = () => {
    return (
        <div className="wall">
            <SinglePostForm />
            <Posts />
        </div>
    );
};

export default Wall;
