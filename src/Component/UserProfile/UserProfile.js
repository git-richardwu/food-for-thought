import React from "react";
import styles from "./UserProfile.module.css";
import ProfilePictureButton from "../atoms/atomComponents/profilePictureButton";
import InfoContainer from "../atoms/atomComponents/infoContainer";

function UserProfile() {
  return (
    //The parent container
    <div className={styles.container}>
      {/* The banner container */}
      <div className={styles.banner}>
        <h1 className={styles.titleStyle}>Profile</h1>
      </div>

      <div className={styles.mainContent}>
        <div className={styles.sideMenu}>Menu buttons go here</div>

        <div className = {styles.innerContent}>

          <div>
            <ProfilePictureButton name={"Place  holder"} />
          </div>

          <div className={styles.infoContainer}>
            <InfoContainer name={"William"} username={"UltraChefWIll"} />
          </div>

        </div>
      </div>
    </div>
  );
}

export default UserProfile;
