// import { getAvatarAndPseudo } from "../../../utils/axiosCalls";
import { getAvatarAndPseudo } from "../../../utils/axiosCalls";
import { UIACTIONS } from "../actions/usersInfo";

export function usersInfoReducer(usersInfo, action) {
    switch (action.type) {
        case UIACTIONS.ADD_USER:
            // console.log("action.payload.user");
            if (
                usersInfo.find(
                    (findUser) => findUser.userId === action.payload.user.userId
                )
            )
                return usersInfo;
            return [...usersInfo, action.payload.user];
        case UIACTIONS.GET_USERS:
            if (
                usersInfo.find(
                    (findUser) => findUser.userId === action.payload.id
                )
            )
                return usersInfo;

            let newUserInfo;
            getAvatarAndPseudo(action.payload.id)
                .then((userInfo) => {
                    console.log(userInfo);
                    newUserInfo = userInfo;
                })
                .catch((err) => console.log(err));
            console.log(newUserInfo);
            return [...usersInfo, newUserInfo];
        case UIACTIONS.UPDATE_USER:
            return usersInfo.map((userInfo) => {
                if (userInfo.userId === action.payload.userId) {
                    return {
                        ...userInfo,
                        ...action.payload,
                    };
                }
                return userInfo;
            });
        // case ACTIONS.DELETE_TODO:
        //     return todos.filter((todo) => todo.id !== action.payload.id);
        // case ACTIONS.LOADING_TODOS:
        //     return action.payload.todos;
        default:
            return usersInfo;
    }
}

// function newUser(id) {
//     let user = {};
//     getAvatarAndPseudo(id)
//         .then((userInfo) => (user = userInfo))
//         .catch((err) => console.log(err));
//     return user;
// }
