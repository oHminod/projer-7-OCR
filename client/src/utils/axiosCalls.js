import axios from "axios";
import { useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

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

// export function axiosAuthContext(token, setAuthToken) {
//     const config = {
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//     };

//     API.get(`verify`, config)
//         .then((data) => {
//             setAuthToken(data.data.token);
//             window.localStorage.setItem(
//                 "token_groupomania",
//                 JSON.stringify(data.data.token)
//             );
//         })
//         .catch((err) => {
//             window.localStorage.removeItem("token_groupomania");
//             window.localStorage.removeItem("userId_groupomania");
//             setAuthToken();
//             console.log("authContext : " + err.message);
//         });
// }
export function useVerify() {
    const [queryToken, setQueryToken] = useLocalStorage(
        "groupomania-queryToken",
        ""
    );
    // const token = useAuth();
    // const setAuthToken = useAuthUpdate();
    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${queryToken}`,
            },
        };
        queryToken &&
            API.get(`verify`, config)
                .then((data) => {
                    setQueryToken(data.data.token);
                    window.localStorage.setItem(
                        "token_groupomania",
                        JSON.stringify(data.data.token)
                    );
                })
                .catch((err) => {
                    window.localStorage.removeItem("token_groupomania");
                    window.localStorage.removeItem("userId_groupomania");
                    setQueryToken();
                    console.log("authContext : " + err.message);
                });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
}

// export function axiosUserContext(token, userId, setUser) {
//     const config = {
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//     };
//     API.get(`user/membre/${userId}`, config)
//         .then((res) => {
//             setUser(res.data);
//         })
//         .catch((err) => {
//             console.log("userContext : " + err.response.data);
//         });
// }

export function useGetUser() {
    const token = JSON.parse(
        window.localStorage.getItem("groupomania-queryToken")
    );
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    return data;
}

export function axiosUserChangeInfoWithImage(
    user,
    data,
    setUser,
    setModifier,
    obj,
    setDbError
) {
    const token = JSON.parse(
        window.localStorage.getItem("groupomania-queryToken")
    );
    const headers = token && {
        Authorization: `Bearer ${token}`,
        // accept: "application/json",
        "Content-Type": `multipart/form-data`,
    };
    token &&
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
    user,
    obj,
    setUser,
    setModifier,
    setDbError
) {
    const token = JSON.parse(
        window.localStorage.getItem("groupomania-queryToken")
    );
    const headers = token && {
        Authorization: `Bearer ${token}`,
    };
    token &&
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

export function axiosPostPost(obj, setDbError) {
    const token = JSON.parse(
        window.localStorage.getItem("groupomania-queryToken")
    );
    const headers = token && {
        Authorization: `Bearer ${token}`,
    };
    token &&
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
// export function axiosGetAllPosts() {
//     const token = JSON.parse(
//         window.localStorage.getItem("groupomania-queryToken")
//     );
//     const config = {
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//     };
//     return API.get(`post/`, config)
//         .then((data) => data.data)
//         .catch((err) => {
//             console.log(err.response.data);
//         });
// }
// export function useGetAllPosts() {
//     const token = JSON.parse(
//         window.localStorage.getItem("groupomania-queryToken")
//     );
//     const [data, setData] = useState();
//     useEffect(() => {
//         const config = {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         };
//         token &&
//             API.get(`post/`, config)
//                 .then((data) => setData(data.data))
//                 .catch((err) => {
//                     console.log(err.response.data);
//                 });
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, []);

//     return data;
// }

// export function axiosGetAllMyPosts(token, id) {
//     const config = {
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//     };
//     return API.get(`post/${id}`, config)
//         .then((data) => data.data)
//         .catch((err) => {
//             console.log(err.response.data);
//         });
// }

export function useGetAllMyPosts(id) {
    const token = JSON.parse(
        window.localStorage.getItem("groupomania-queryToken")
    );
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

export function getAvatarAndPseudo(userId) {
    const token = JSON.parse(
        window.localStorage.getItem("groupomania-queryToken")
    );
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

export function likerPost(id, obj) {
    const token = JSON.parse(
        window.localStorage.getItem("groupomania-queryToken")
    );
    const headers = token && {
        Authorization: `Bearer ${token}`,
    };
    token &&
        API.post(`post/${id}/like`, obj, {
            headers,
        })
            .then(() => {})
            .catch((err) => {
                console.log(err.response.data);
            });
}

export function loverPost(id, obj) {
    const token = JSON.parse(
        window.localStorage.getItem("groupomania-queryToken")
    );
    const headers = token && {
        Authorization: `Bearer ${token}`,
    };
    token &&
        API.post(`post/${id}/love`, obj, {
            headers,
        })
            .then(() => {})
            .catch((err) => {
                console.log(err.response.data);
            });
}

export function partagerPost(id, obj) {
    const token = JSON.parse(
        window.localStorage.getItem("groupomania-queryToken")
    );
    const headers = token && {
        Authorization: `Bearer ${token}`,
    };
    token &&
        API.post(`post/${id}/share`, obj, {
            headers,
        })
            .then(() => {})
            .catch((err) => {
                console.log(err.response.data);
            });
}

export function deletePost(postId) {
    const token = JSON.parse(
        window.localStorage.getItem("groupomania-queryToken")
    );
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    config &&
        API.delete(`post/delete/${postId}`, config).catch((err) => {
            console.log(err.response.data);
        });
    return;
}
export function deleteSharedPost(postId) {
    const token = JSON.parse(
        window.localStorage.getItem("groupomania-queryToken")
    );
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    config &&
        API.delete(`post/shared/${postId}`, config).catch((err) => {
            console.log(err.response.data);
        });
    return;
}

export function postSharedPost(obj) {
    const token = JSON.parse(
        window.localStorage.getItem("groupomania-queryToken")
    );
    const headers = token && {
        Authorization: `Bearer ${token}`,
    };
    token &&
        API.post(`post/post`, obj, {
            headers,
        })
            .then(() => {})
            .catch((err) => {
                console.log(err.response.data);
            });
}

export function postCommentWithoutImage(obj) {
    const token = JSON.parse(
        window.localStorage.getItem("groupomania-queryToken")
    );
    const headers = token && {
        Authorization: `Bearer ${token}`,
    };
    token &&
        API.post(`comment/`, obj, {
            headers,
        })
            .then(() => {})
            .catch((err) => {
                console.log(err.response.data);
            });
}
export function getThisPostComments(id) {
    const token = JSON.parse(
        window.localStorage.getItem("groupomania-queryToken")
    );
    const config = token && {
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
