import { MPACTIONS } from "../actions/myPosts";

export function myPostsReducer(myPosts, action) {
    switch (action.type) {
        case MPACTIONS.ADD_MY_POSTS:
            const temp1 = [...myPosts, ...action.payload.myPosts];
            return [...new Set(temp1)];
        case MPACTIONS.ADD_MY_POSTS_ON_TOP:
            const temp2 = [...action.payload.myPosts, ...myPosts];
            return [...new Set(temp2)];
        case MPACTIONS.ADD_MY_POST_ON_TOP:
            const temp3 = [action.payload.myPost, ...myPosts];
            return [...new Set(temp3)];
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

// case MPACTIONS.GET_MY_POSTS:
//     return action.payload.myPosts;
