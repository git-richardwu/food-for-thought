import React from 'react';
import "./Settings.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

const Settings = () => {
    return (
        <div>
            <h1>Settings</h1>
            <ul>
                <li>
                    <Link to="/settings/account">
                        <button className="settingsMenuButton">
                            Account
                            <div className="triangle-right"/>
                        </button>
                        
                    </Link>
                </li>
                <li>
                    <Link to="/settings/privacy">
                        <button className="settingsMenuButton">
                            Privacy
                            <div className="triangle-right"/>
                        </button>
                    </Link>
                </li>
                <li>
                    <Link to="/settings/notifications">
                        <button className="settingsMenuButton">
                            Notifications
                            <div className="triangle-right"/>
                        </button>
                    </Link>
                </li>
                <li>
                    <Link to="/settings/preferences">
                        <button className="settingsMenuButton">
                            Preferences
                            <div className="triangle-right"/>
                        </button>
                    </Link>
                </li>
                <li>
                    <Link to="/settings/general">
                        <button className="settingsMenuButton">
                            General
                            <div className="triangle-right"/>
                        </button>
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default Settings
