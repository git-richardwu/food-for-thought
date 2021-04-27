import React from 'react';
import "./Settings.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import SideMenu from "../atoms/atomComponents/sideMenu"

const Aboutus = () => {
    return (
        <div className="settingsContainer">
            <Link to="/settings/general/aboutus/andrew" className="link">
                <button className="settingsMenuButton">
                    Andrew Jank
                    <div className="triangle-right"/>
                </button>
            </Link>
            <Link to="/settings/general/aboutus/hector">
                <button className="settingsMenuButton">
                    Hector J. Sosa
                    <div className="triangle-right"/>
                </button>
            </Link>
            <Link to="/settings/general/aboutus/li">
                <button className="settingsMenuButton">
                    Li Wei Jiang
                    <div className="triangle-right"/>
                </button>
            </Link>
            <Link to="/settings/general/aboutus/richard">
                <button className="settingsMenuButton">
                     Richard Wu
                    <div className="triangle-right"/>
                </button>
            </Link>
            <Link to="/settings/general/aboutus/william">
                <button className="settingsMenuButton">
                    William Phillips
                    <div className="triangle-right"/>
                </button>
            </Link>
        </div>
    )
}

export default Aboutus;