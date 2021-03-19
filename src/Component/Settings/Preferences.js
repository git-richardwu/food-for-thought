import React from 'react';
import "./Settings.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
// import SideMenu from "../atoms/atomComponents/sideMenu"

const Preferences = () => {
    return (
        <div className="settingsContainer">
            <Link to="/settings/preferences/diet">
                <button className="settingsMenuButton">
                    Diet
                    <div className="triangle-right"/>
                </button>
            </Link>
            <Link to="/settings/preferences/allergies">
                <button className="settingsMenuButton">
                    Allergies
                    <div className="triangle-right"/>
                </button>
            </Link>
            <Link to="/settings/preferences/budget">
                <button className="settingsMenuButton">
                    Budget
                    <div className="triangle-right"/>
                </button>
            </Link>
        </div>
    )
}

export default Preferences
