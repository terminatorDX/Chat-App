import React from "react";
import "./Messages.css";
import ReacScrollToBottom from "react-scroll-to-bottom";
import Message from "../Message/Message";

const Messages = ({ messages, name }) => (
    <ReacScrollToBottom>
        {messages.map((message, index) => (
            <div key={index}>
                <Message message={message} name={name} />
            </div>
        ))}
    </ReacScrollToBottom>
);

export default Messages;
