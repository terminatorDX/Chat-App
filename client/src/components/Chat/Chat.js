import React, { useState, useEffect } from "react";
import queryString from "query-string";
import "./Chat.css";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import io from "socket.io-client";
import Messages from "../Messages/Messages";
let socket;

export default function Chat({ location }) {
    const [name, setName] = useState(""),
        [room, setRoom] = useState(""),
        [messages, setMessages] = useState([]),
        [message, setMessage] = useState(""),
        endpoint = "localhost:4000";
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
                <InfoBar room={room} name={name} />
                <Messages messages={messages} />
                <Input
                    message={message}
                    setMessage={setMessage}
                    sendMessage={sendMessage}
                />
                <input
                    type="text"
                    value={message}
                    onChange={event => setMessage(event.target.value)}
                    onKeyPress={event =>
                        event.key === "Enter" ? sendMessage(event) : null
                    }
                />
            </div>
        </div>
    );
}
