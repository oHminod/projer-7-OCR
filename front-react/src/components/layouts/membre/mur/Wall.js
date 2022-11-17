import React from "react";
import SinglePostForm from "../../post/form/SinglePostForm";
import MyPosts from "../../post/MyPosts";
import "./Wall.scss";

const Wall = () => {
    return (
        <section className="wall">
            <SinglePostForm />
            <MyPosts />
        </section>
    );
};

export default Wall;
