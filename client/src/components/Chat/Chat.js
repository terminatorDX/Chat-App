import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import "./Chat.css";
let socket;

export default function Chat({ location }) {
    const [name, setName] = useState(""),
        [room, setRoom] = useState(""),
        endpoint = "localhost:4000";
    useEffect(() => {
        const { name, room } = queryString.parse(location.search);
        socket = io(endpoint);
        setName(name);
        setRoom(room);
        console.log(socket);
        socket.emit("join", { name, room }, ({}) => {});
        return () => {
            socket.emit("disconnected");
            socket.off();
        };
    }, [endpoint, location.search]);
    return <div>Chat</div>;
}
