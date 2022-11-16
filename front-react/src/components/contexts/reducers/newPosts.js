import { NPACTIONS } from "../actions/newPosts";

export function newPostsReducer(newPosts, action) {
    switch (action.type) {
        case NPACTIONS.ADD_NEW_POST:
            return [...new Set([action.payload.newPost, ...newPosts])];
        case NPACTIONS.DELETE_NEW_POSTS:
            return [];
        case NPACTIONS.UPDATE_NEW_POST:
            return newPosts.map((post) => {
                if (post._id === action.payload.post._id) {
                    return {
                        ...post,
                        ...action.payload.post,
                    };
                }
                return post;
            });
        case NPACTIONS.DELETE_NEW_POST:
            return newPosts.filter((post) => post._id !== action.payload.id);
        default:
            return newPosts;
    }
}
