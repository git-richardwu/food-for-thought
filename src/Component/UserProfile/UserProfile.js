import React from "react";
import styles from "./UserProfile.module.css";
import ProfilePictureButton from "../atoms/atomComponents/profilePictureButton";
import InfoContainer from "../atoms/atomComponents/infoContainer";
import FollowerComponent from "../atoms/atomComponents/followerComponent";
import ActivityComponent from "../atoms/atomComponents/activityComponent";
function UserProfile() {

  //need to pull userbio from database and store it in userBio variable
  const [userBio, editUserBio] = React.useState("");
  const [bioID, setBioID] = React.useState();
  const [weightGoal, setWeightGoal] = React.useState("")
  const [weightGoalID, setWeightGoalID] = React.useState(-1)

 React.useEffect(()=>{
    fetchUserBio();
    fetchWeightGoal();
 })
 

  function fetchUserBio(){
    console.log("User ID " +sessionStorage.getItem("user"))
    fetch(process.env.REACT_APP_API_PATH+"/user-artifacts?category=bio&ownerID="+sessionStorage.getItem("user"),{
      method:"get",
      headers:{
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+sessionStorage.getItem("token")
      }
    }).then(res => res.json())
      .then(
      (result)=>{
        if(result[0].length != 0){
          if(result[0][0].type != null){
                let bio =  result[0][0].type;
                console.log("Bio from user profile: " +bio);
                editUserBio(bio);
                console.log("Bio id: " + result[0][0].id)
                setBioID(result[0][0].id);
                // console.log("This is result: " + result[0][1].ownerID)
          }
              }else{
                let bio = "Please add a bio."
                editUserBio(bio);
                setBioID(-1);
              }

        }
        ,
        error=>{
          alert("Error occurred when trying to retrieve bio")
        }
      );

  }
  
  function fetchWeightGoal() {
    fetch(process.env.REACT_APP_API_PATH+"/user-artifacts?category=weightGoal&ownerID="+sessionStorage.getItem("user"),{
      method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      }
    )
      .then((res) => res.json())
      .then(
        (result) => {
          if (result[0].length != 0) {
            result[0].forEach(function (artifacts) {
              if (artifacts.category == "weightGoal") {
                let goal = artifacts.type;
                console.log("Goal from user preferences: " + goal);
                setWeightGoal(goal);
                console.log("Weight goal id: " + artifacts.id);
                setWeightGoalID(artifacts.id);
              } 
            });
          } else {
            setWeightGoalID(-1);
          }
        },
        (error) => {
          alert("Error occurred when trying to retrieve weight goal");
        }
      );
  }      
    

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
                pounds={weightGoal}
                setUserBio = { () => editUserBio()}
                bioID = {bioID}
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
