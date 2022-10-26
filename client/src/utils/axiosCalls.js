import axios from "axios";

export function axiosLogin(email, password, setDbError) {
    return axios
        .post("http://localhost:36600/user/login", {
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
        .post("http://localhost:36600/user/signup", {
            email: email,
            pseudo: pseudo,
            password: password,
        })
        .then(() => {
            return axios
                .post("http://localhost:36600/user/login", {
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
        .get(`http://localhost:36600/verify`, config)
        .then((data) => {
            setAuthToken(data.data.token);
            window.localStorage.setItem(
                "token_groupomania",
                JSON.stringify(data.data.token)
            );
        })
        .catch(() => {
            setAuthToken("fin");
        });
}

export function axiosUserContext(token, userId, setUser) {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    axios
        .get(`http://localhost:36600/user/membre/${userId}`, config)
        .then((res) => {
            setUser(res.data);
        })
        .catch((err) => {
            console.log(err.response.data);
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
        .post(`http://localhost:36600/user/setuser/${user._id}`, data, {
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
        .post(`http://localhost:36600/user/setuser/${user._id}`, obj, {
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
        .post(`http://localhost:36600/post/post`, data, {
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
        .post(`http://localhost:36600/post/post`, obj, {
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
        .get(`http://localhost:36600/post/`, config)
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
        .get(`http://localhost:36600/user/posterinfo/${userId}`, config)
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
