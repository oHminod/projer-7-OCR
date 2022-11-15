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
            return myPosts;
    }
}
