import React from 'react';
import "./Settings.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import SideMenu from "../atoms/atomComponents/sideMenu"

const Aboutus = () => {
    return (
        <div className="settingsContainer">
            <Link to="/settings/general">   
                <button className="backButton backButtonCreate">
                    <i className="arrow left"/>
                    Back
                </button>
            </Link>
            <Link to="/settings/general/aboutus/andrew" className="settingsMenuButton">
                Andrew Jank
                <div className="triangle-right"/>
            </Link>
            <Link to="/settings/general/aboutus/hector" className="settingsMenuButton">
                Hector J. Sosa
                <div className="triangle-right"/>
            </Link>
            <Link to="/settings/general/aboutus/li" className="settingsMenuButton">
                Li Wei Jiang
                <div className="triangle-right"/>
            </Link>
            <Link to="/settings/general/aboutus/richard" className="settingsMenuButton">
                Richard Wu
                <div className="triangle-right"/>
            </Link>
            <Link to="/settings/general/aboutus/william" className="settingsMenuButton">
                William Phillips
                <div className="triangle-right"/>
            </Link>
        </div>
    )
}

export default Aboutus;