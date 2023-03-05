import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth, useAuthUpdate } from "../components/contexts/AuthContext";
import { useUser, useUserUpdate } from "../components/contexts/UserContext";
import useLogout from "../components/utils/useLogout";
import { API_URL } from "./settings";

export const API = axios.create({
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

    const { logout } = useLogout();

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
                    console.log("authContext : " + err.message);
                    logout();
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

export function postCommentWithoutImage(obj) {
    const token = JSON.parse(window.localStorage.getItem("groupomania-token"));
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
    const token = JSON.parse(window.localStorage.getItem("groupomania-token"));
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

export function loverPost(id, obj) {
    const token = JSON.parse(window.localStorage.getItem("groupomania-token"));
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

export function sharePost(obj) {
    const token = JSON.parse(window.localStorage.getItem("groupomania-token"));
    const headers = token && {
        Authorization: `Bearer ${token}`,
    };
    token &&
        API.post(`post/share`, obj, {
            headers,
        })
            .then(() => {})
            .catch((err) => {
                console.log(err.response.data);
            });
}

export function deletePost(postId) {
    const token = JSON.parse(window.localStorage.getItem("groupomania-token"));
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

export function useSearchUser(query, setUser) {
    const token = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        const headers = token && {
            Authorization: `Bearer ${token}`,
        };
        token &&
            loading &&
            API.post(`user/search`, query, {
                headers,
            })
                .then((user) => {
                    setUser(user.data);
                    setLoading(false);
                    setError(false);
                })
                .catch(() => {
                    setUser(false);
                    setError("Utilisateur introuvable");
                });
    }, [loading, query, setUser, token]);

    return { setLoading, error };
}

export function useAjouterAmi() {
    const token = useAuth();
    const [goAdd, setGoAdd] = useState(false);
    const [idAdd, setIdAdd] = useState();

    useEffect(() => {
        const config = token && {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        goAdd &&
            idAdd &&
            API.get(`user/friends/add/${idAdd}`, config)
                .then(() => {
                    setGoAdd(false);
                    setIdAdd(false);
                })
                .catch((err) => {
                    console.log(err.response.data);
                });
    }, [goAdd, idAdd, token]);

    return { setGoAdd, setIdAdd };
}

export function useRetirerAmi() {
    const token = useAuth();
    const [goRemove, setGoRemove] = useState(false);
    const [idRemove, setIdRemove] = useState();

    useEffect(() => {
        const config = token && {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        goRemove &&
            idRemove &&
            API.get(`user/friends/remove/${idRemove}`, config)
                .then(() => {
                    setGoRemove(false);
                    setIdRemove(false);
                })
                .catch((err) => {
                    console.log(err.response.data);
                });
    }, [goRemove, idRemove, token]);

    return { setGoRemove, setIdRemove };
}

export function useAccepterAmi() {
    const token = useAuth();
    const [goAccept, setGoAccept] = useState(false);
    const [idAccept, setIdAccept] = useState();

    useEffect(() => {
        const config = token && {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        goAccept &&
            idAccept &&
            API.get(`user/friends/accept/${idAccept}`, config)
                .then(() => {
                    setGoAccept(false);
                    setIdAccept(false);
                })
                .catch((err) => {
                    console.log(err.response.data);
                });
    }, [goAccept, idAccept, token]);

    return { setGoAccept, setIdAccept };
}
export function useRefuserAmi() {
    const token = useAuth();
    const [goReject, setGoReject] = useState(false);
    const [idReject, setIdReject] = useState();

    useEffect(() => {
        const config = token && {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        goReject &&
            idReject &&
            API.get(`user/friends/reject/${idReject}`, config)
                .then(() => {
                    setGoReject(false);
                    setIdReject(false);
                })
                .catch((err) => {
                    console.log(err.response.data);
                });
    }, [goReject, idReject, token]);

    return { setGoReject, setIdReject };
}
export function useAnnulerDemande() {
    const token = useAuth();
    const [goCancel, setGoCancel] = useState(false);
    const [idCancel, setIdCancel] = useState();

    useEffect(() => {
        const config = token && {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        goCancel &&
            idCancel &&
            API.get(`user/friends/cancel/${idCancel}`, config)
                .then(() => {
                    setGoCancel(false);
                    setIdCancel(false);
                })
                .catch((err) => {
                    console.log(err.response.data);
                });
    }, [goCancel, idCancel, token]);

    return { setGoCancel, setIdCancel };
}
