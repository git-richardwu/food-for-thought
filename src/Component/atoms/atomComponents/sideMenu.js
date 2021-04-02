import React from "react";
import homeIcon from "../../../assets/home-white-18dp.svg";
import Logo from "../../../Images/logo.jpg"
import personIcon from "../../../assets/person-white-18dp.svg";
import settingsIcon from "../../../assets/settings-white-18dp.svg";
import notificationsIcon from "../../../assets/circle_notifications-white-18dp.svg";
import styles from "../atomStyles/sideMenu.module.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

function SideMenu() {

    const updateProfileID = () =>
    {
        sessionStorage.setItem("profileUser", sessionStorage.getItem("user"));
    }

    return ( 
        <div className={styles.sideMenu}>
            <Link to="/">
                <img className = {styles.logo} src = {Logo}></img>
            </Link>
            <Link to="/home">
                <button className={styles.button}>
                    <img className = {styles.icon } src = {homeIcon}></img>
                </button>
            </Link>
            <Link to="/notifications">
                <button className={styles.button}>
                    <img className = {styles.icon } src = {notificationsIcon}></img>
                </button>
            </Link>
            <Link to="/profile">
                <button className={styles.button} onClick={e => updateProfileID()}>
                    <img className = {styles.icon } src = {personIcon}></img>
                </button>
            </Link>
            <Link to="/settings">
                <button className={styles.button}>
                    <img className = {styles.icon } src = {settingsIcon}></img>
                </button>
            </Link>
    </div>
    )
}

export default SideMenu;
