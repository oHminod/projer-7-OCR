import React from "react";
import SinglePostForm from "../../post/form/SinglePostForm";
import Posts from "../../post/Posts";
import "./Wall.scss";

const Wall = () => {
    return (
        <section className="wall">
            <SinglePostForm />
            <Posts />
        </section>
    );
};

export default Wall;
