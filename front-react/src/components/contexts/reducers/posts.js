import { PACTIONS } from "../actions/posts";

export function postsReducer(posts, action) {
    switch (action.type) {
        case PACTIONS.GET_POSTS:
            return action.payload.posts;
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
        // case ACTIONS.ADD_USER:
        //     if (
        //         usersInfo.find(
        //             (findUser) => findUser.userId === action.payload.id
        //         )
        //     )
        //         return usersInfo;
        //     return [...usersInfo, newUser(action.payload.id)];
        // case ACTIONS.UPDATE_USER:
        //     return usersInfo.map((userInfo) => {
        //         if (userInfo.id === action.payload.newUserInfo.userId) {
        //             return {
        //                 ...userInfo,
        //                 ...action.payload.newUserInfo,
        //             };
        //         }
        //         return userInfo;
        //     });
        // case ACTIONS.DELETE_TODO:
        //     return todos.filter((todo) => todo.id !== action.payload.id);
        // case ACTIONS.LOADING_TODOS:
        //     return action.payload.todos;
        default:
            return posts;
    }
}
