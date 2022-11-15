import { NPACTIONS } from "../actions/newPosts";

export function newPostsReducer(newPosts, action) {
    switch (action.type) {
        case NPACTIONS.ADD_NEW_POST:
            return [...new Set([action.payload.newPost, ...newPosts])];
        case NPACTIONS.DELETE_NEW_POSTS:
            return [];
        default:
            return newPosts;
    }
}
