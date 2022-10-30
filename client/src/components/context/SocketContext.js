import React from "react";
import socketio from "socket.io-client";

const token = JSON.parse(window.localStorage.getItem("token_groupomania"));

export let socket;
token &&
    (socket = socketio.connect("http://localhost:36600", {
        transportOptions: {
            polling: {
                extraHeaders: {
                    Authorization: `Bearer ${token}`,
                },
            },
        },
    }));

export const SocketContext = React.createContext();
