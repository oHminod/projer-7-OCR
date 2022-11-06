import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../components/context/AuthContext";
import {
    useUsersInfo,
    useUsersInfoUpdate,
} from "../components/context/UsersInfoContext";

const API_URL = process.env.REACT_APP_API_URL;
// const API_IP = process.env.REACT_APP_API_IP;
const API = axios.create({
    baseURL: API_URL,
});

export function axiosLogin(email, password, setDbError) {
    return API.post(`user/login`, {
        email: email,
        password: password,
    })
        .then((res) => res.data)
        .catch((err) => {
            setDbError(err.response.data);
        });
}

export function axiosSignup(email, pseudo, password, setDbError) {
    return API.post(`user/signup`, {
        email: email,
        pseudo: pseudo,
        password: password,
    })
        .then(() => {
            return API.post(`user/login`, {
                email: email,
                pseudo: pseudo,
                password: password,
            })
                .then((res) => res.data)
                .catch((err) => {
                    setDbError(err.response.data);
                });
        })
        .catch((err) => {
            const error = err.response.data.split(".")[1].split(":")[0].trim();
            if (error && error === "Value") {
                setDbError(
                    "Pseudo ou adresse email déjà utilisé par un autre membre."
                );
            } else {
                setDbError(err.response.data);
            }
        });
}

export function axiosAuthContext(token, setAuthToken) {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    API.get(`verify`, config)
        .then((data) => {
            setAuthToken(data.data.token);
            window.localStorage.setItem(
                "token_groupomania",
                JSON.stringify(data.data.token)
            );
        })
        .catch((err) => {
            window.localStorage.removeItem("token_groupomania");
            window.localStorage.removeItem("userId_groupomania");
            setAuthToken();
            console.log("authContext : " + err.message);
        });
}

export function axiosUserContext(token, userId, setUser) {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    API.get(`user/membre/${userId}`, config)
        .then((res) => {
            setUser(res.data);
        })
        .catch((err) => {
            console.log("userContext : " + err.response.data);
        });
}

export function useGetUser() {
    const token = useAuth();
    const [data, setData] = useState();
    const [userId, setuserId] = useState();
    useEffect(() => {
        setuserId(
            JSON.parse(window.localStorage.getItem("userId_groupomania"))
        );
    }, []);
    useEffect(() => {
        const config = token && {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        userId &&
            config &&
            API.get(`user/membre/${userId}`, config)
                .then((res) => {
                    // res.data = {
                    //     ...res.data,
                    //     avatar: res.data.avatar.split("localhost").join(API_IP),
                    // };
                    setData(res.data);
                })
                .catch((err) => {
                    console.log("userContext : " + err.response.data);
                });
    }, [token, userId]);

    return data;
}

export function axiosUserChangeInfoWithImage(
    token,
    user,
    data,
    setUser,
    setModifier,
    obj,
    setDbError
) {
    const headers = {
        Authorization: `Bearer ${token}`,
        // accept: "application/json",
        "Content-Type": `multipart/form-data`,
    };
    API.post(`user/setuser/${user._id}`, data, {
        headers,
    })
        .then(() => {
            setUser({ ...user, ...obj });
            setModifier(false);
        })
        .catch((err) => {
            if (
                err.response.data.split(" ")[1] &&
                err.response.data.split(" ")[1] === "duplicate"
            ) {
                setDbError(
                    "Pseudo ou adresse email déjà utilisé par un autre membre."
                );
            } else {
                console.log(err.response.data);
            }
        });
}

export function axiosUserChangeInfoWithoutImage(
    token,
    user,
    obj,
    setUser,
    setModifier,
    setDbError
) {
    const headers = {
        Authorization: `Bearer ${token}`,
    };
    API.post(`user/setuser/${user._id}`, obj, {
        headers,
    })
        .then(() => {
            setUser({ ...user, ...obj });
            setModifier(false);
        })
        .catch((err) => {
            if (
                err.response.data.split(" ")[1] &&
                err.response.data.split(" ")[1] === "duplicate"
            ) {
                setDbError(
                    "Pseudo ou adresse email déjà utilisé par un autre membre."
                );
            } else {
                console.log(err.response.data);
            }
        });
}

export function axiosPostPostWithImage(token, data, setDbError) {
    const headers = {
        Authorization: `Bearer ${token}`,
    };
    API.post(`post/post`, data, {
        headers,
    })
        .then(() => {})
        .catch((err) => {
            console.log(err.response.data);
            setDbError(err.response.data);
        });
}

export function axiosPostPostWithoutImage(token, obj, setDbError) {
    const headers = {
        Authorization: `Bearer ${token}`,
    };
    API.post(`post/post`, obj, {
        headers,
    })
        .then(() => {})
        .catch((err) => {
            console.log(err.response.data);
            setDbError(err.response.data);
        });
}
export function axiosGetAllPosts(token) {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    return API.get(`post/`, config)
        .then((data) => data.data)
        .catch((err) => {
            console.log(err.response.data);
        });
}
export function useGetAllPosts() {
    const token = useAuth();
    const [data, setData] = useState();
    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        token &&
            API.get(`post/`, config)
                .then((data) => setData(data.data))
                .catch((err) => {
                    console.log(err.response.data);
                });
    }, [token]);

    return data;
}

export function axiosGetAllMyPosts(token, id) {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    return API.get(`post/${id}`, config)
        .then((data) => data.data)
        .catch((err) => {
            console.log(err.response.data);
        });
}

export function useGetAllMyPosts(id) {
    const token = useAuth();
    const [data, setData] = useState();
    useEffect(() => {
        const config = token && {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        config &&
            id &&
            API.get(`post/${id}`, config)
                .then((data) => setData(data.data))
                .catch((err) => {
                    console.log(err.response.data);
                });
    }, [id, token]);
    return data;
}

export function getAvatarAndPseudo(token, userId) {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    return API.get(`user/posterinfo/${userId}`, config)
        .then((data) => {
            // data.data = {
            //     ...data.data,
            //     avatar: data.data.avatar.split("localhost").join(API_IP),
            // };
            return data.data;
        })
        .catch((err) => {
            console.log(err.response.data);
        });
}

export function getAvatar(token, userId, usersInfo, setUsersInfo) {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    // let userInfo;
    usersInfo &&
        userId &&
        !usersInfo.find((findUser) => findUser.userId === userId) &&
        API.get(`user/posterinfo/${userId}`, config)
            .then((data) => {
                // data.data = {
                //     ...data.data,
                //     avatar: data.data.avatar.split("localhost").join(API_IP),
                // };
                setUsersInfo([...usersInfo, data.data]);
            })
            .catch((err) => {
                console.log(err.response.data);
            });
}

export function useGetAvatarAndPseudo(userId) {
    const token = useAuth();
    const usersInfo = useUsersInfo();
    const setUsersInfo = useUsersInfoUpdate();
    // const [data, setData] = useState();

    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        config &&
            userId &&
            !usersInfo.find((findUser) => findUser.userId === userId) &&
            API.get(`user/posterinfo/${userId}`, config)
                .then((data) => {
                    // data.data = {
                    //     ...data.data,
                    //     avatar: data.data.avatar.split("localhost").join(API_IP),
                    // };
                    // setData(data.data);
                    setUsersInfo([...usersInfo, data.data]);
                })
                .catch((err) => {
                    console.log(err.response.data);
                });
    }, [setUsersInfo, token, userId, usersInfo]);

    // return data;
}

export async function getAsyncAvatarAndPseudo(token, userId) {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    try {
        const reponse = await API.get(`user/posterinfo/${userId}`, config);
        const result = await reponse.data;
        // console.log(result);
        return result;
    } catch (err) {
        console.log(err.response.data);
    }
}

export function likerPost(token, id, obj) {
    const headers = {
        Authorization: `Bearer ${token}`,
    };
    API.post(`post/${id}/like`, obj, {
        headers,
    })
        .then(() => {})
        .catch((err) => {
            console.log(err.response.data);
        });
}

export function loverPost(token, id, obj) {
    const headers = {
        Authorization: `Bearer ${token}`,
    };
    API.post(`post/${id}/love`, obj, {
        headers,
    })
        .then(() => {})
        .catch((err) => {
            console.log(err.response.data);
        });
}
export function postCommentWithoutImage(token, obj) {
    const headers = {
        Authorization: `Bearer ${token}`,
    };
    API.post(`comment/`, obj, {
        headers,
    })
        .then(() => {})
        .catch((err) => {
            console.log(err.response.data);
        });
}
export function getThisPostComments(token, id) {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    return API.get(`comment/${id}`, config)
        .then((data) => data.data)
        .catch((err) => {
            console.log(err.response.data);
        });
}

// export function getAvatarAndPseudo(
//     token,
//     userId,
//     avatarsAndPseudos,
//     setAvatarsAndPseudos
// ) {
//     const config = {
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//     };
//     axios
//         .get(`http://localhost:36600/user/posterinfo/${userId}`, config)
//         .then((data) => {
//             console.log("data = " + data.data);

//             let tempArray = [...avatarsAndPseudos];
//             tempArray.push(data.data);
//             setAvatarsAndPseudos(data.data);
//         })
//         .catch((err) => {
//             console.log(err.response.data);
//         });
// }
