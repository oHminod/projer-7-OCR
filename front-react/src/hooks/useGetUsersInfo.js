import { useEffect, useState } from "react";
import { useMyPosts } from "../components/contexts/MyPostsContext";
import { useNewPosts } from "../components/contexts/NewPostsContext";
import { usePosts } from "../components/contexts/PostsContext";
import { useUser } from "../components/contexts/UserContext";
import { useUsersInfo } from "../components/contexts/UsersInfoContext";
import useGetAvatar from "./useGetAvatar";

const useGetUsersInfo = (idsToFetch = []) => {
    const [usersWhoHavePost, setUsersWhoHavePost] = useState([]);
    const [sanitizedIds, setSanitizedIds] = useState([]);
    const posts = usePosts();
    const myPosts = useMyPosts();
    const newPosts = useNewPosts();
    const user = useUser();
    const usersInfo = useUsersInfo();

    useGetAvatar(sanitizedIds);

    useEffect(() => {
        setSanitizedIds(
            usersWhoHavePost.filter(
                (id) => !usersInfo.find((user) => user.userId === id)
            )
        );
    }, [usersInfo, usersWhoHavePost]);

    useEffect(() => {
        idsToFetch.length > 0 &&
            setUsersWhoHavePost((prev) => [
                ...new Set([...prev, ...idsToFetch]),
            ]);
    }, [idsToFetch]);

    const setIds = (post, prev) => {
        if (
            !prev.includes(post.userId) &&
            post.sharedUserId &&
            !prev.includes(post.sharedUserId)
        ) {
            return [...prev, post.userId, post.sharedUserId];
        } else if (!prev.includes(post.userId)) {
            return [...prev, post.userId];
        } else if (post.sharedUserId && !prev.includes(post.sharedUserId)) {
            return [...prev, post.sharedUserId];
        } else {
            return prev;
        }
    };

    useEffect(() => {
        let temp = [];
        user &&
            (temp = [
                ...temp,
                ...user.amis,
                ...user.demandesAmis,
                ...user.demandesEnvoyees,
            ]);
        posts &&
            posts.map((post) => {
                temp = setIds(post, temp);
                return true;
            });
        myPosts &&
            myPosts.map((post) => {
                temp = setIds(post, temp);
                return true;
            });
        newPosts &&
            newPosts.map((post) => {
                temp = setIds(post, temp);
                return true;
            });
        setUsersWhoHavePost((prev) => [...new Set([...prev, ...temp])]);
    }, [myPosts, newPosts, posts, user]);

    return null;
};

export default useGetUsersInfo;
