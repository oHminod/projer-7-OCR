import { MPACTIONS } from "../actions/myPosts";

export function myPostsReducer(myPosts, action) {
    switch (action.type) {
        case MPACTIONS.GET_MY_POSTS:
            return action.payload.myPosts;
        case MPACTIONS.ADD_MY_POSTS:
            return [...new Set([...myPosts, ...action.payload.myPosts])];
        case MPACTIONS.ADD_MY_POSTS_ON_TOP:
            return [...new Set([...action.payload.myPosts, ...myPosts])];
        case MPACTIONS.ADD_MY_POST_ON_TOP:
            return [...new Set([action.payload.myPost, ...myPosts])];
        case MPACTIONS.UPDATE_MY_POST:
            return myPosts.map((post) => {
                if (post._id === action.payload.post._id) {
                    return {
                        ...post,
                        ...action.payload.post,
                    };
                }
                return post;
            });
        case MPACTIONS.DELETE_MY_POST:
            if (myPosts.find((post) => post._id === action.payload.id)) {
                return myPosts.filter((post) => post._id !== action.payload.id);
            }
            return myPosts;
        default:
            return myPosts;
    }
}
