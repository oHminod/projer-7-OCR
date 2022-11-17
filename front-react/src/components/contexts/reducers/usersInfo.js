// import { getAvatarAndPseudo } from "../../../utils/axiosCalls";
import { UIACTIONS } from "../actions/usersInfo";

export function usersInfoReducer(usersInfo, action) {
    switch (action.type) {
        case UIACTIONS.ADD_USER:
            if (
                usersInfo.find(
                    (findUser) => findUser.userId === action.payload.user.userId
                )
            )
                return usersInfo;
            return [...usersInfo, action.payload.user];
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
        default:
            return usersInfo;
    }
}

// case UIACTIONS.GET_USERS:
//     if (
//         usersInfo.find(
//             (findUser) => findUser.userId === action.payload.id
//         )
//     )
//         return usersInfo;

//     let newUserInfo;
//     getAvatarAndPseudo(action.payload.id)
//         .then((userInfo) => {
//             console.log(userInfo);
//             newUserInfo = userInfo;
//         })
//         .catch((err) => console.log(err));
//     return [...usersInfo, newUserInfo];
