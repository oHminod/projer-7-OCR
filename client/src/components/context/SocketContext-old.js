import React from "react";
import socketio from "socket.io-client";

let token = JSON.parse(window.localStorage.getItem("token_groupomania"));

export let socket;
watchTocken();
function watchTocken() {
    if (!token) {
        console.log("ça tourne");
        setTimeout(() => {
            token = JSON.parse(
                window.localStorage.getItem("token_groupomania")
            );
            watchTocken();
        }, 1000);
    } else {
        console.log("SOCKET GO");
        socket = socketio.connect("http://localhost:36600", {
            transportOptions: {
                polling: {
                    extraHeaders: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            },
        });
    }
}

export const SocketContext = React.createContext();
