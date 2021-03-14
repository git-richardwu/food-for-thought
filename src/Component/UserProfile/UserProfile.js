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
        {/* Side menu buttons view */}
        <div className={styles.sideMenu}>Menu buttons go here</div>
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

          <div >
            hello
          </div>
        </div>
        {/* End of innner container */}
      </div>
    </div>
  );
}

export default UserProfile;
