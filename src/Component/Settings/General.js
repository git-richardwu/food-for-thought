import React from 'react';
import "./Settings.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import SideMenu from "../atoms/atomComponents/sideMenu"

const General = () => {
    return (
        <div className="settingsContainer">
            <Link to="/settings/general/styleguide">
                <button className="settingsMenuButton">
                    Style Guide
                    <div className="triangle-right"/>
                </button>
            </Link>
            <Link to="/settings/general/aboutus">
                <button className="settingsMenuButton">
                    About Us
                    <div className="triangle-right"/>
                </button>
            </Link>
        </div>
    )
}

export default General;