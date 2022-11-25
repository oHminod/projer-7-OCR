import { PACTIONS } from "../actions/posts";

export function postsReducer(posts, action) {
    switch (action.type) {
        case PACTIONS.ADD_POSTS:
            return [...new Set([...posts, ...action.payload.posts])];
        case PACTIONS.ADD_POSTS_ON_TOP:
            return [...new Set([...action.payload.posts, ...posts])];
        case PACTIONS.ADD_MY_POST_ON_TOP:
            return [...new Set([action.payload.myPost, ...posts])];
        case PACTIONS.UPDATE_POST:
            return posts.map((post) => {
                if (post._id === action.payload.post._id) {
                    return {
                        ...post,
                        ...action.payload.post,
                    };
                }
                return post;
            });
        case PACTIONS.DELETE_POST:
            if (posts.find((post) => post._id === action.payload.id)) {
                return posts.filter((post) => post._id !== action.payload.id);
            }
            return posts;
        case PACTIONS.DELETE_POSTS:
            return [];
        default:
            return posts;
    }
}
// case PACTIONS.GET_POSTS:
//     return action.payload.posts;
