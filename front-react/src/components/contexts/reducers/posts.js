import { PACTIONS } from "../actions/posts";

export function postsReducer(posts, action) {
    switch (action.type) {
        case PACTIONS.GET_POSTS:
            return action.payload.posts;
        case PACTIONS.ADD_POSTS:
            return [...new Set([...posts, ...action.payload.posts])];
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
