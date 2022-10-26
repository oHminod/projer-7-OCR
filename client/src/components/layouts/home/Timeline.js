import React from "react";
import SinglePostForm from "../post/form/SinglePostForm";
import Posts from "../post/Posts";

const Timeline = () => {
    return (
        <section className="wall">
            <SinglePostForm />
            <Posts />
        </section>
    );
};

export default Timeline;
