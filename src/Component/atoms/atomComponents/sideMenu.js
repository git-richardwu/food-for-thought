import React from "react";
import homeIcon from "../../../assets/home-white-18dp.svg";
import personIcon from "../../../assets/person-white-18dp.svg";
import settingsIcon from "../../../assets/settings-white-18dp.svg";
import notificationsIcon from "../../../assets/circle_notifications-white-18dp.svg";
import styles from "../atomStyles/sideMenu.module.css"
function SideMenu() {
  return ( 
    <div className={styles.sideMenu}>
    <button className={styles.button}>
      <img className = {styles.icon } src = {homeIcon}></img>
    </button>
    
    <button className={styles.button}>
      <img className = {styles.icon } src = {notificationsIcon}></img>
    </button>

    <button className={styles.button}>
      <img className = {styles.icon } src = {personIcon}></img>
    </button>

    <button className={styles.button}>
      <img className = {styles.icon } src = {settingsIcon}></img>
    </button>

    
   </div>
  )
}

export default SideMenu;
