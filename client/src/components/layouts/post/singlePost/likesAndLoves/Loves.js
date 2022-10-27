import React, { useEffect, useState } from "react";
import { loverPost } from "../../../../../utils/axiosCalls";
import { useAuth } from "../../../../context/AuthContext";
import { useUser } from "../../../../context/UserContext";
import { usePost } from "../../PostContext";

const Loves = () => {
    const [actif, setActif] = useState(false);
    const user = useUser();
    const token = useAuth();
    const thisPost = usePost();
    const [countLoves, setCountLoves] = useState();

    useEffect(() => {
        thisPost &&
            user &&
            thisPost.usersLoved.includes(user._id) &&
            setActif(true);
    }, [thisPost, user]);

    useEffect(() => {
        thisPost && setCountLoves(+thisPost.loves);
    }, [thisPost]);

    const handelClick = () => {
        setActif(!actif);

        actif ? setCountLoves(countLoves - 1) : setCountLoves(countLoves + 1);

        let obj = {};
        actif ? (obj.love = "0") : (obj.love = "1");

        thisPost && actif
            ? loverPost(token, thisPost._id, obj)
            : loverPost(token, thisPost._id, obj);
    };

    return (
        <button
            onClick={handelClick}
            className={actif ? "loves actif" : "loves"}
        >
            {thisPost && (
                <i className="fa-regular fa-heart">
                    &nbsp;&nbsp;{countLoves !== 0 && countLoves}
                </i>
            )}
        </button>
    );
};

export default Loves;
