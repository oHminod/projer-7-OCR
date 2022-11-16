import React from "react";
import SinglePostForm from "../post/form/SinglePostForm";
import Posts from "../post/Posts";
import NewPosts from "./NewPosts";

const Timeline = () => {
    return (
        <section className="wall">
            <SinglePostForm />
            <NewPosts />
            <Posts />
        </section>
    );
};

export default Timeline;
