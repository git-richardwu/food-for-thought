import React from 'react';
import "./Settings.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import SideMenu from "../atoms/atomComponents/sideMenu"

const Settings = () => {
    return (
        <div className="settingsContainer">
            <Link to="/settings/account" className="link">
                <button className="settingsMenuButton">
                    Account
                    <div className="triangle-right"/>
                </button>
            </Link>
            <Link to="/settings/privacy">
                <button className="settingsMenuButton">
                    Privacy
                    <div className="triangle-right"/>
                </button>
            </Link>
            <Link to="/settings/notifications">
                <button className="settingsMenuButton">
                    Notifications
                    <div className="triangle-right"/>
                </button>
            </Link>
            <Link to="/settings/preferences">
                <button className="settingsMenuButton">
                    Preferences
                    <div className="triangle-right"/>
                </button>
            </Link>
            <Link to="/settings/general">
                <button className="settingsMenuButton">
                    General
                    <div className="triangle-right"/>
                </button>
            </Link>
        </div>
    )
}

export default Settings
