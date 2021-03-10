import React from 'react';
import "./Settings.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

const Settings = () => {
    return (
        <div>
            <h1>Settings</h1>
            <ul id="side-menu-items">
                <li className="pm admin student">
                    <Link to="/settings/account">
                        <button className="button">
                            Account
                        </button>
                    </Link>
                </li>
                <li className="pm admin student">
                    <Link to="/settings/privacy">
                        <button className="button">
                            Privacy
                        </button>
                    </Link>
                </li>
                <li className="pm admin student">
                    <Link to="/settings/notifications">
                        <button className="button">
                            Notifications
                        </button>
                    </Link>
                </li>
                <li className="pm admin student">
                    <Link to="/settings/preferences">
                        <button className="button">
                            Preferences
                        </button>
                    </Link>
                </li>
                <li className="pm admin student">
                    <Link to="/settings/general">
                        <button className="button">
                            General
                        </button>
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default Settings
