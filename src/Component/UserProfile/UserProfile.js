import React from "react";
import styles from "./UserProfile.module.css";
import ProfilePictureButton from "../atoms/atomComponents/profilePictureButton";
import InfoContainer from "../atoms/atomComponents/infoContainer";
import FollowerComponent from "../atoms/atomComponents/followerComponent";
import ActivityComponent from "../atoms/atomComponents/activityComponent";
import Banner from "../atoms/atomComponents/banner"
import SideMenu from "../atoms/atomComponents/sideMenu"
function UserProfile() {

  //need to pull userbio from database and store it in userBio variable
  const [userBio, editUserBio] = React.useState("Bio");

  return (
        <div >
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
                bio={userBio}
                dietTag1={"dietTag1"}
                dietTag2={"dietTag2"}
                dietTag3={"dietTag3"}
                dietTag4={"dietTag4"}
                calories={"calories go here"}
                pounds={"pounds go here"}
                setUserBio = { editUserBio}
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
  );
}

export default UserProfile;
