import React, { useEffect, useState } from "react";
import { shortDateFromDate } from "../../../../../utils/localeDateFromDate";
import { useUser } from "../../../../contexts/UserContext";

const CommentBlockActions = ({ comment, setRepondre, setModifier }) => {
    const my = useUser();
    const [updatedAt, setUpdatedAt] = useState();
    const [createdAt, setCreatedAt] = useState();
    const [fakeCurrentDate, setFakeCurrentDate] = useState(new Date());

    useEffect(() => {
        setTimeout(() => setFakeCurrentDate(new Date()), 12000);
    }, [fakeCurrentDate]);

    useEffect(() => {
        comment && setCreatedAt(shortDateFromDate(comment.createdAt));
        comment && setUpdatedAt(shortDateFromDate(comment.createdAt));
    }, [comment, fakeCurrentDate]);

    const handleCommenter = () => {
        setRepondre((prev) => !prev);
    };

    const handleModifier = () => {
        setModifier((prev) => !prev);
    };

    return (
        <div className="blockActions">
            <div className="heure">
                <p>{createdAt}</p>
                {updatedAt !== createdAt && <p>(Modifié {updatedAt})</p>}
            </div>
            <div>
                {(comment.userId === my._id || my.role === "admin") && (
                    <p onClick={handleModifier} className="commenter">
                        modifier
                    </p>
                )}
                <p onClick={handleCommenter} className="commenter">
                    répondre
                </p>
            </div>
        </div>
    );
};

export default CommentBlockActions;
