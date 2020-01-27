import React from "react";
import "./InfoBar.css";
import closeIcon from "../../icons/closeIcon.png";
import onlineIcon from "../../icons/onlineIcon.png";

const InfoBar = ({ room }) => (
    <div className="InfoBar">
        <div className="leftInnerContainer">
            <img src={onlineIcon} alt="online " className="onlineIcon" />
            <h3>{room}</h3>
        </div>
        <div className="RightInnerContainer">
            <a href="/">
                <img src={closeIcon} alt="close " />
            </a>
        </div>
    </div>
);
export default InfoBar;
