import React from "react";
import styles from "./UserProfile.module.css";
import ProfilePictureButton from "../atoms/atomComponents/profilePictureButton";
import InfoContainer from "../atoms/atomComponents/infoContainer";
import FollowerComponent from "../atoms/atomComponents/followerComponent";
import ActivityComponent from "../atoms/atomComponents/activityComponent";
import homeIcon from "../../assets/home-white-18dp.svg";
import personIcon from "../../assets/person-white-18dp.svg";
import settingsIcon from "../../assets/settings-white-18dp.svg";
import notificationsIcon from "../../assets/circle_notifications-white-18dp.svg";
function UserProfile() {
  return (
    //The parent container
    <div className={styles.container}>
      {/* The banner container */}
      <div className={styles.banner}>
        <h1 className={styles.titleStyle}>Profile</h1>
      </div>

      <div className={styles.mainContent}>
        {/* Side menu buttons view */}
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
        {/* Everything else goes in this view */}
        <div className={styles.innerContent}>
          {/* Pic and info container */}
          <div className={styles.picAndInfo}>
            <div>
              <ProfilePictureButton name={"Picture Place Holder"} />
            </div>
            {/* User info container */}
            <div className={styles.infoContainer}>
              <InfoContainer
                name={"Name Place Holder"}
                username={"Username Placeholders"}
                bio={"Bio"}
                dietTag1={"dietTag1"}
                dietTag2={"dietTag2"}
                dietTag3={"dietTag3"}
                dietTag4={"dietTag4"}
                calories={"calories go here"}
                pounds={"pounds go here"}
              />
            </div>
          </div>
          {/* End of pic and info container*/}

          <div className={styles.followAndActivityContainer}>
            <FollowerComponent
              numOfFollowers={"{Number of followers go here}"}
              numOfFollowing={
                "{Number of people current user follows goes here}"
              }
            />
            <ActivityComponent activity={"{post goes here}"}/>
          </div>
        </div>
        {/* End of innner container */}
      </div>
    </div>
  );
}

export default UserProfile;
