import axios from "axios";
import { useEffect, useState } from "react";
import { PACTIONS } from "../components/contexts/actions/posts";
import { UIACTIONS } from "../components/contexts/actions/usersInfo";
import { useAuth, useAuthUpdate } from "../components/contexts/AuthContext";
import { useUser, useUserUpdate } from "../components/contexts/UserContext";

const API_URL = process.env.REACT_APP_API_URL;
// const API_IP = process.env.REACT_APP_API_IP;
const API = axios.create({
    baseURL: API_URL,
});

export function useAxiosLogin(email, password, setDbError) {
    const setAuthToken = useAuthUpdate();
    const setUser = useUserUpdate();

    useEffect(() => {
        email &&
            password &&
            API.post(`user/login`, {
                email: email,
                password: password,
            })
                .then((res) => {
                    setAuthToken(res.data.token);
                    setUser(res.data.user);
                })
                .catch((err) => {
                    setDbError(err.response.data);
                });
    }, [email, password, setAuthToken, setDbError, setUser]);
    return null;
}

export function useAxiosSignup(email, pseudo, password, setDbError) {
    const setAuthToken = useAuthUpdate();
    const setUser = useUserUpdate();

    useEffect(() => {
        email &&
            password &&
            pseudo &&
            API.post(`user/signup`, {
                email: email,
                pseudo: pseudo,
                password: password,
            })
                .then(() => {
                    API.post(`user/login`, {
                        email: email,
                        pseudo: pseudo,
                        password: password,
                    })
                        .then((res) => {
                            setAuthToken(res.data.token);
                            setUser(res.data.user);
                        })
                        .catch((err) => {
                            setDbError(err.response.data);
                        });
                })
                .catch((err) => {
                    const error = err.response.data
                        .split(".")[1]
                        .split(":")[0]
                        .trim();
                    if (error && error === "Value") {
                        setDbError(
                            "Pseudo ou adresse email déjà utilisé par un autre membre."
                        );
                    } else {
                        setDbError(err.response.data);
                    }
                });
    }, [email, password, pseudo, setAuthToken, setDbError, setUser]);
    return null;
}

export function useGetUser() {
    const token = useAuth();
    const user = useUser();
    const setUser = useUserUpdate();

    useEffect(() => {
        const config = token && {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        user &&
            config &&
            API.get(`user/membre/${user._id}`, config)
                .then((res) => setUser(res.data))
                .catch((err) => {
                    console.log("userContext : " + err.response.data);
                });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return null;
}

export function useVerify() {
    const token = useAuth();
    const setAuthToken = useAuthUpdate();
    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        token &&
            API.get(`verify`, config)
                .then((data) => {
                    setAuthToken(data.data.token);
                })
                .catch((err) => {
                    setAuthToken();
                    console.log("authContext : " + err.message);
                });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
}

export function useAxiosSetUser(obj, setDbError, go, setGo, setModifier) {
    const user = useUser();
    const token = useAuth();

    useEffect(() => {
        const headers = token && {
            Authorization: `Bearer ${token}`,
            // accept: "application/json",
            "Content-Type": `multipart/form-data`,
        };
        token &&
            obj &&
            go &&
            API.post(`user/setuser/${user._id}`, obj, {
                headers,
            })
                .then(() => {
                    setModifier(false);
                    setGo(false);
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [go]);
}

export function useAxiosPostPost(obj, setDbError, go, setGo) {
    const token = useAuth();

    useEffect(() => {
        const headers = token && {
            Authorization: `Bearer ${token}`,
        };
        token &&
            go &&
            obj &&
            API.post(`post/post`, obj, {
                headers,
            })
                .then(() => setGo(false))
                .catch((err) => {
                    console.log(err.response.data);
                    setDbError(err.response.data);
                });
    }, [go, obj, setDbError, setGo, token]);
}

export function useAxiosGetAllPosts(go, setGo, dispatchPosts) {
    const token = useAuth();
    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        // token && setGo(true);
        token &&
            go &&
            API.get(`post/`, config)
                .then((data) => {
                    dispatchPosts({
                        type: PACTIONS.GET_POSTS,
                        payload: { posts: data.data },
                    });
                    setGo(false);
                })
                .catch((err) => {
                    console.log(err);
                });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [go]);
}

export function getAvatarAndPseudo(userId, dispatchUsersInfo) {
    const token = JSON.parse(window.localStorage.getItem("groupomania-token"));
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    API.get(`user/posterinfo/${userId}`, config)
        .then((data) => {
            const user = (data && data.data) || false;
            user &&
                dispatchUsersInfo({
                    type: UIACTIONS.ADD_USER,
                    payload: { user: user },
                });
            // data.data = {
            //     ...data.data,
            //     avatar: data.data.avatar.split("localhost").join(API_IP),
            // };
            return data.data;
        })
        .catch((err) => {
            console.log(err.response.data);
        });
    return null;
}

export function useGetAllMyPosts(id, setGo) {
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
            setTimeout(() => {
                API.get(`post/${id}`, config)
                    .then((data) => {
                        setData(data.data);
                        setGo(false);
                    })
                    .catch((err) => {
                        console.log(err.response.data);
                    });
            }, 100);
    }, [id, setGo, token]);
    return data;
}
