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
        case UIACTIONS.DELETE_USERS:
            return [];
        default:
            return usersInfo;
    }
}
