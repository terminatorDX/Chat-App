import React, { useState, useEffect } from "react";
import queryString from "query-string";
import "./Chat.css";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import io from "socket.io-client";
import Messages from "../Messages/Messages";
import TextContainer from "../TextContainer/TextContainer";
let socket;

export default function Chat({ location }) {
    const [name, setName] = useState(""),
        [room, setRoom] = useState(""),
        [users, setUsers] = useState(""),
        [messages, setMessages] = useState([]),
        [message, setMessage] = useState(""),
        endpoint = "https://chat-app81.herokuapp.com/";
    useEffect(() => {
        const { name, room } = queryString.parse(location.search);
        socket = io(endpoint);
        setName(name);
        setRoom(room);
        console.log(socket);
        socket.emit("join", { name, room }, error => {
            if (error) {
                alert(error);
            }
        });
        return () => {
            socket.emit("disconnect");
            socket.off();
        };
    }, [endpoint, location.search]);
    useEffect(() => {
        socket.on("message", message => {
            setMessages([...messages, message]);
        });
        socket.on("roomData", ({ users }) => {
            setUsers(users);
        });
        return () => {
            socket.emit("disconnect");
            socket.off();
        };
    }, [messages]);

    //function for sending messages
    const sendMessage = e => {
        e.preventDefault();
        if (message) {
            socket.emit("sendMessage", message, () => setMessage(""));
        }
        console.log(message, "messages ", messages);
    };
    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room} />
                <Messages messages={messages} name={name} />
                <Input
                    message={message}
                    setMessage={setMessage}
                    sendMessage={sendMessage}
                />
                <TextContainer users={users} />
            </div>
        </div>
    );
}
