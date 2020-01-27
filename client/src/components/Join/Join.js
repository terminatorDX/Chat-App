import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Join.css";

export default function Join() {
    const [name, setName] = useState("");
    const [room, setRoom] = useState("");
    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">Join</h1>
                <div className="">
                    <input
                        type="text"
                        placeholder=""
                        className="joinInput"
                        onChange={event => {
                            setName(event.target.value);
                        }}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        placeholder=""
                        className="joinInput"
                        onChange={event => {
                            setRoom(event.target.value);
                        }}
                    />
                </div>
                <Link
                    onClick={event =>
                        !name || !room ? event.preventDefault() : null
                    }
                    to={`/chat?name=${name}&room=${room}`}>
                    <button className="button mt-20" type="submit">
                        Sign In
                    </button>
                </Link>
            </div>
        </div>
    );
}