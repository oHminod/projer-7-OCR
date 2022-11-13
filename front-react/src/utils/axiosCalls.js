import axios from "axios";
import { useEffect } from "react";
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
    }, [go, obj, setDbError, setGo, setModifier, token, user._id]);
}
