import axios from "axios";

export function axiosLogin(
    email,
    password,
    setUser,
    setAuthToken,
    navigate,
    setDbError
) {
    axios
        .post("http://localhost:36600/login", {
            email: email,
            password: password,
        })
        .then((res) => {
            window.localStorage.setItem(
                "token_groupomania",
                JSON.stringify(res.data.token)
            );
            window.localStorage.setItem(
                "userId_groupomania",
                JSON.stringify(res.data.userId)
            );
            setUser(res.data.user);
            setAuthToken(res.data.token);
            navigate("/home");
        })
        .catch((err) => {
            setDbError(err.response.data);
        });
}

export function axiosSignup(
    email,
    pseudo,
    password,
    setUser,
    setAuthToken,
    navigate,
    setDbError
) {
    axios
        .post("http://localhost:36600/signup", {
            email: email,
            pseudo: pseudo,
            password: password,
        })
        .then(() => {
            axios
                .post("http://localhost:36600/login", {
                    email: email,
                    pseudo: pseudo,
                    password: password,
                })
                .then((res) => {
                    window.localStorage.setItem(
                        "token_groupomania",
                        JSON.stringify(res.data.token)
                    );
                    window.localStorage.setItem(
                        "userId_groupomania",
                        JSON.stringify(res.data.userId)
                    );
                    setUser(res.data.user);
                    setAuthToken(res.data.token);
                    navigate("/home");
                })
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

export function axiosUserContext(token, userId, setUser, setLoading) {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    axios
        .get(`http://localhost:36600/membre/${userId}`, config)
        .then((res) => {
            setUser(res.data);
            setLoading(false);
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
        .post(`http://localhost:36600/setuser/${user._id}`, data, {
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
        .post(`http://localhost:36600/setuser/${user._id}`, obj, {
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
