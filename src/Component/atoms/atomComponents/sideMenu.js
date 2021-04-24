import React from "react";
import homeIcon from "../../../assets/home-white-18dp.svg";
import Logo from "../../../Images/logo.jpg"
import personIcon from "../../../assets/person-white-18dp.svg";
import settingsIcon from "../../../assets/settings-white-18dp.svg";
import notificationsIcon from "../../../assets/circle_notifications-white-18dp.svg";
import styles from "../atomStyles/sideMenu.module.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

function SideMenu() {
    return ( 
        <div className={styles.sideMenu}>
            <Link to="/">
                <img className={styles.logo} src={Logo} alt="Food For Thought Logo, clicking navigates to home page and refreshes feed"/>
            </Link>
            <Link to="/home">
                <img className={styles.icon} src={homeIcon} alt="Navigate to the Home page, and refresh feed"/>
            </Link>
            <Link to="/notifications">
                <img className={styles.icon} src={notificationsIcon} alt="Navigate to the Notifications page"/>
            </Link>
            <Link to={`/profile/${sessionStorage.getItem("user")}`}>
                <img className={styles.icon} src={personIcon} alt="Navigate to my Profie page"/>
            </Link>
            <Link to="/settings">
                <img className={styles.icon} src={settingsIcon} alt="Navigate to the Settings page"/>
            </Link>
    </div>
    )
}

export default SideMenu;
