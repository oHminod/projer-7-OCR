import axios from "axios";

const apiURL = "http://localhost:36600/";

export function axiosLogin(email, password, setDbError) {
    return axios
        .post(`${apiURL}user/login`, {
            email: email,
            password: password,
        })
        .then((res) => res.data)
        .catch((err) => {
            setDbError(err.response.data);
        });
}

export function axiosSignup(email, pseudo, password, setDbError) {
    return axios
        .post(`${apiURL}user/signup`, {
            email: email,
            pseudo: pseudo,
            password: password,
        })
        .then(() => {
            return axios
                .post(`${apiURL}user/login`, {
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

    axios
        .get(`${apiURL}verify`, config)
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
    axios
        .get(`${apiURL}user/membre/${userId}`, config)
        .then((res) => {
            setUser(res.data);
        })
        .catch((err) => {
            console.log("userContext : " + err.response.data);
        });
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
    axios
        .post(`${apiURL}user/setuser/${user._id}`, data, {
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
    axios
        .post(`${apiURL}user/setuser/${user._id}`, obj, {
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
    axios
        .post(`${apiURL}post/post`, data, {
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
    axios
        .post(`${apiURL}post/post`, obj, {
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
    return axios
        .get(`${apiURL}post/`, config)
        .then((data) => data.data)
        .catch((err) => {
            console.log(err.response.data);
        });
}

export function axiosGetAllMyPosts(token, id) {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    return axios
        .get(`${apiURL}post/${id}`, config)
        .then((data) => data.data)
        .catch((err) => {
            console.log(err.response.data);
        });
}

export function getAvatarAndPseudo(token, userId) {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    return axios
        .get(`${apiURL}user/posterinfo/${userId}`, config)
        .then((data) => data.data)
        .catch((err) => {
            console.log(err.response.data);
        });
}

export async function getAsyncAvatarAndPseudo(token, userId) {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    try {
        const reponse = await axios.get(
            `${apiURL}user/posterinfo/${userId}`,
            config
        );
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
    axios
        .post(`${apiURL}post/${id}/like`, obj, {
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
    axios
        .post(`${apiURL}post/${id}/love`, obj, {
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
    axios
        .post(`${apiURL}comment/`, obj, {
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
    return axios
        .get(`${apiURL}comment/${id}`, config)
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
