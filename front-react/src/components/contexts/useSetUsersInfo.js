import { useEffect, useState } from "react";
import { getAvatarAndPseudo } from "../../utils/axiosCalls";
import { useMyPosts } from "./MyPostsContext";
import { useNewPosts } from "./NewPostsContext";
import { usePosts } from "./PostsContext";
import { useUsersInfo, useUsersInfoUpdate } from "./UsersInfoContext";

const useSetUsersInfo = () => {
    const [usersWhoHavePost, setUsersWhoHavePost] = useState([]);
    const usersInfo = useUsersInfo();
    const dispatchUsersInfo = useUsersInfoUpdate();
    const posts = usePosts();
    const myPosts = useMyPosts();
    const newPosts = useNewPosts();

    useEffect(() => {
        posts &&
            posts.map((post) => {
                setUsersWhoHavePost((prev) => {
                    if (!prev.includes(post.userId)) {
                        return [...new Set([...prev, post.userId])];
                    } else if (
                        post.hasOwnProperty("sharedUserId") &&
                        post.sharedUserId &&
                        !prev.includes(post.sharedUserId)
                    ) {
                        return [...new Set([...prev, post.sharedUserId])];
                    } else {
                        return [...prev];
                    }
                });
                return true;
            });
    }, [posts]);

    useEffect(() => {
        myPosts &&
            myPosts.map((post) => {
                setUsersWhoHavePost((prev) => {
                    if (!prev.includes(post.userId)) {
                        return [...new Set([...prev, post.userId])];
                    } else if (
                        post.hasOwnProperty("sharedUserId") &&
                        post.sharedUserId &&
                        !prev.includes(post.sharedUserId)
                    ) {
                        return [...new Set([...prev, post.sharedUserId])];
                    } else {
                        return [...prev];
                    }
                });
                return true;
            });
    }, [myPosts]);

    useEffect(() => {
        newPosts &&
            newPosts.map((post) => {
                setUsersWhoHavePost((prev) => {
                    if (!prev.includes(post.userId)) {
                        return [...new Set([...prev, post.userId])];
                    } else if (
                        post.hasOwnProperty("sharedUserId") &&
                        post.sharedUserId &&
                        !prev.includes(post.sharedUserId)
                    ) {
                        return [...new Set([...prev, post.sharedUserId])];
                    } else {
                        return [...prev];
                    }
                });
                return true;
            });
    }, [newPosts]);

    useEffect(() => {
        usersWhoHavePost &&
            usersWhoHavePost.map((id) => {
                if (usersInfo.find((findUser) => findUser.userId === id))
                    return id;
                getAvatarAndPseudo(id, dispatchUsersInfo);
                return id;
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [usersWhoHavePost]);
};

export default useSetUsersInfo;
