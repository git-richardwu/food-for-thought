import React from 'react';
import "./Settings.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

const Settings = () => {
    return (
        <div className="settingsContainer">
            <Link to="/settings/account" className="settingsMenuButton">
                Account
                <div className="triangle-right"/>   
            </Link>
            <Link to="/settings/privacy" className="settingsMenuButton">
                Privacy
                <div className="triangle-right"/>
            </Link>
            <Link to="/settings/preferences" className="settingsMenuButton">
                Preferences
                <div className="triangle-right"/>
            </Link>
            <Link to="/settings/general" className="settingsMenuButton">
                General
                <div className="triangle-right"/>
            </Link>
        </div>
    )
}

export default Settings
