import React, {
    useState,
    createContext,
    useContext,
    useEffect,
    useReducer,
} from "react";
import { getAvatarAndPseudo } from "../../utils/axiosCalls";
import { usePosts } from "./PostsContext";
import { myPostsReducer } from "./reducers/myPosts";
import { useUsersInfo, useUsersInfoUpdate } from "./UsersInfoContext";

export const MyPostsContext = createContext();
export const MyPostsUpdateContext = createContext();

export function useMyPosts() {
    return useContext(MyPostsContext);
}

export function useMyPostsUpdate() {
    return useContext(MyPostsUpdateContext);
}

export const MyPostsProvider = ({ children }) => {
    const [myPosts, distpatchMyPosts] = useReducer(myPostsReducer, []);
    const [usersWhoHavePost, setUsersWhoHavePost] = useState([]);
    const usersInfo = useUsersInfo();
    const setUsersInfo = useUsersInfoUpdate();
    const posts = usePosts();

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
        usersWhoHavePost &&
            usersWhoHavePost.map((id) => {
                if (usersInfo.find((findUser) => findUser.userId === id))
                    return id;
                getAvatarAndPseudo(id, setUsersInfo);
                return id;
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [usersWhoHavePost]);

    return (
        <MyPostsContext.Provider value={myPosts}>
            <MyPostsUpdateContext.Provider value={distpatchMyPosts}>
                {children}
            </MyPostsUpdateContext.Provider>
        </MyPostsContext.Provider>
    );
};

export default MyPostsProvider;
