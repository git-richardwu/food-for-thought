import React from "react";
import styles from "./UserProfile.module.css";
import styles2 from "./foobar.css";
import ProfilePictureButton from "../atoms/atomComponents/profilePictureButton";
import InfoContainer from "../atoms/atomComponents/infoContainer";
import FollowerComponent from "../atoms/atomComponents/followerComponent";
import ActivityComponent from "../atoms/atomComponents/activityComponent";
import { BrowserRouter as Router, Redirect, Route, Switch, Link, useParams} from "react-router-dom";

function UserProfile() {
  //need to pull userbio from database and store it in userBio variable
  const {userID} = useParams();
  const [userBio, editUserBio] = React.useState("");
  const [bioID, setBioID] = React.useState();
  const [followingCount, setFollowCount] = React.useState(0);
  const [followerCount, setFollowerCount] = React.useState(0);
  const [artifactID, setArtifactID] =  React.useState(0);
  const [url, setURL] = React.useState("");
  const [followState, setFollowState] = React.useState(false)
  const [username, setUsername] = React.useState("");
  const [weightGoal, setWeightGoal] = React.useState("")
  const [weightGoalID, setWeightGoalID] = React.useState(-1)
  const [calorieID, setCalorieID] = React.useState(-1)
  const [calorieGoal, setCalorieGoal] = React.useState("")
  const [dietTag1, setDietTag1] = React.useState("")
  const [dietTag2, setDietTag2] = React.useState("")
  const [dietTag3, setDietTag3] = React.useState("")
  const [dietTag4, setDietTag4] = React.useState("")
  fetchWeightGoal();
  fetchCalorieGoal();
  fetchDietTags();

 React.useEffect(()=>{
    fetchUserBio();
    fetchFollowingCount();
    fetchFollowerCount();
    fetchProfilePic();
    fetchFollowing();
    fetchUser();
 }, [followState, userID])

  function fetchProfilePic(){
    fetch(process.env.REACT_APP_API_PATH+"/user-artifacts?category=profilePicDisplay&ownerID="+userID, {
      method: "GET",
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
    })
    .then(response => response.json())
    .then(json => {
        console.log(json)
        if(json[1] == 0){
          // this.setState({
          //   url: "https://i.redd.it/32ztztrp4m541.jpg"
          // });
          setURL("https://i.redd.it/32ztztrp4m541.jpg")
          return;
        }
        else {
          // this.setState({
          //   url: json[0][0].url,
          //   artifactID: json[0][0].id
          // });
          setURL(json[0][0].url)
          setArtifactID(json[0][0].id)
        }
        // console.log(json[0][0].url)
    }) 
    }

    function fetchFollowing(){
      fetch(process.env.REACT_APP_API_PATH+"/connections?userID="+sessionStorage.getItem("user")+"&connectedUserID="+userID,{
        method: "GET",
          headers: new Headers({
            'Content-Type': 'application/json',
          }),        
      }).then(response => response.json())
      .then(json => {
          console.log(json)
          if(json[1] != 0){
            setFollowState(true)
          }
        })
    }
 

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
                editUserBio(bio);
                setBioID(result[0][0].id);
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

  function fetchFollowingCount(){
    fetch(process.env.REACT_APP_API_PATH+"/connections?userID="+userID,{
      method: "GET",
        headers: new Headers({
          'Content-Type': 'application/json',
        }),        
    }).then(response => response.json())
    .then(json => {
        // console.log(json)
        setFollowCount(json[1])
      })
  }

  function fetchFollowerCount(){
    fetch(process.env.REACT_APP_API_PATH+"/connections?connectedUserID="+userID,{
      method: "GET",
        headers: new Headers({
          'Content-Type': 'application/json',
        }),        
    }).then(response => response.json())
    .then(json => {
        console.log(json)
        setFollowerCount(json[1])
      })
  }

  function followFunction(){
    fetch(process.env.REACT_APP_API_PATH+"/connections?userID="+sessionStorage.getItem("user")+"&connectedUserID="+userID,{
      method: "GET",
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
    })
    .then(response => response.json())
    .then(json => {
        console.log(json)
        if(json[1] == 0 ){ {/* no connection */}
            fetch(process.env.REACT_APP_API_PATH+"/connections",{
              method: "POST", 
              headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ sessionStorage.getItem("token")
            }),
            body: JSON.stringify({
              userID: sessionStorage.getItem("user"),
              connectedUserID: userID,
              type: "Follow",
              status: "Active"
            })
          }).then(response => response.json())
          .then(thing => {
            console.log(thing)
            console.log("Followed!")
            setFollowState(true)
            
          })
        } 
        else {
          {/* delete connection */}
          const connectionID = json[0][0].id
          console.log(json[0][0].id)
          fetch(process.env.REACT_APP_API_PATH+"/connections/"+connectionID, {
              method: "DELETE", 
              headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ sessionStorage.getItem("token")
            }),
          }).then(response => {
            console.log("Unfollowed!")
            setFollowState(false)
            
          })
        }
        
    }) 
  }

  const updateImageURL = () => {
    const imgTypes = [".jpg", ".jpeg", ".png", ".gif"]
    const user_ID = userID
    const artifact_ID = artifactID
    const newURL = prompt("Please enter the image URL of your new profile picture: [Chrome/Safari/Opera: 'Copy Image Address', Firefox: 'Copy Image Location', Edge: 'Copy']")
    if(newURL == null){ //for cancelling
      return;
    }
    if(!newURL.includes("https://") && newURL.length < 6){
      alert("Please enter a valid URL!")
      return;
    }
    if(!imgTypes.some(i => newURL.includes(i))){
      alert("Please enter a valid image URL!")
      return;
    }
    else {
      if(artifact_ID == 0) { /*User does not have an artifact*/
        fetch(process.env.REACT_APP_API_PATH+"/user-artifacts", {
          method: "POST",
          headers: new Headers({
              'Content-Type': 'application/json',
              'Authorization': 'Bearer '+ sessionStorage.getItem("token")
          }),
          body: JSON.stringify({
            ownerID: user_ID,
            type: "string",
            url: newURL,
            category: "profilePicDisplay"

          })
      }).then(response => response.json())
      .then(json => {
            setArtifactID(json.id)
            setURL(json.url)
            return;
      })
    }
    else { /*User has an artifact*/
      fetch(process.env.REACT_APP_API_PATH+"/user-artifacts/"+artifact_ID, {
        method: "PUT",
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ sessionStorage.getItem("token")
        }),
        body: JSON.stringify({
          ownerID: user_ID,
          type: "string",
          url: newURL,
          category: "profilePicDisplay"

        })
    }).then(response => response.json())
    .then(json => {
          setURL(json.url)
          return;
      })
    }
  }
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
        console.log(error);
        alert("Error occurred when trying to retrieve weight goal");
      }
    );
} 

const fetchUser = async () => {
    var url = process.env.REACT_APP_API_PATH+"/users/"+userID;
    fetch(url, {
      method: "get",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+sessionStorage.getItem("token")
      },

    })
      .then(res => res.json())
      .then(
        result => {
          if (result) {
              setUsername(result.username);
          }
        },
        error => {
          console.log(error);
        }
      );
  }

  function fetchCalorieGoal (){
    fetch(process.env.REACT_APP_API_PATH+"/user-artifacts?category=calorieGoal&ownerID="+sessionStorage.getItem("user"),{
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
              if (artifacts.category == "calorieGoal") {
                let goal = artifacts.type;
                console.log("Goal from user preferences: " + goal);
                setCalorieGoal(goal);
                console.log("Calorie goal id: " + artifacts.id);
                setCalorieID(artifacts.id);
              } 
            });
          }
        },
        (error) => {
          alert("Error occurred when trying to retrieve calorie goal");
        }
      );

  }

  function fetchDietTags(){

    fetch(process.env.REACT_APP_API_PATH+"/user-artifacts?category=dietTag&ownerID="+sessionStorage.getItem("user"),{
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
              if (artifacts.category == "dietTag"){
                if(artifacts.url == "1"){
                  let dietTag = artifacts.type;
                  console.log("Goal from user preferences: " + dietTag);
                  setDietTag1(dietTag);
                }
                if(artifacts.url == "2"){
                  let dietTag = artifacts.type;
                  console.log("Goal from user preferences: " + dietTag);
                  setDietTag2(dietTag);
                }
                if(artifacts.url == "3"){
                  let dietTag = artifacts.type;
                  console.log("Goal from user preferences: " + dietTag);
                  setDietTag3(dietTag);
                }
                if(artifacts.url == "4"){
                  let dietTag = artifacts.type;
                  console.log("Goal from user preferences: " + dietTag);
                  setDietTag4(dietTag);
                }
              } 
            });
          }
        },
        (error) => {
          alert("Error occurred when trying to set diet tags");
        }
      );

  }

    return (
          <div >
            {/* Pic and info container */}
            <div className={styles.picAndInfo}>
              <div>
                <img src={url} className="img1"></img>
                {/* <h5>{this.state.url}</h5> 
                <h5>{this.state.artifactID}</h5> */}

                {userID === sessionStorage.getItem("user") && <button onClick={updateImageURL}>Change Profile Picture</button>}
                {userID !== sessionStorage.getItem("user") && <button onClick={followFunction}> {followState ? "Unfollow" : "Follow" } </button>}
                {/* <ProfilePictureButton name={"Picture Place Holder"} /> */}
              </div>
              
              {/* User info container */}
              <div className={styles.infoContainer}>
                
              <InfoContainer
                name={""}
                username={username}
                bio={userBio}
                dietTag1={dietTag1}
                dietTag2={dietTag2}
                dietTag3={dietTag3}
                dietTag4={dietTag4}
                calories={calorieGoal}
                pounds={weightGoal}
                setUserBio = { () => editUserBio()}
                bioID = {bioID}
                userID = {userID}
                />
              </div>
            </div>
            {/* End of pic and info container*/}

          <div className={styles.followAndActivityContainer}>
            <FollowerComponent
            
              numOfFollowers={followerCount}
              numOfFollowing={followingCount}
            />
            <ActivityComponent activity={userID}/>
          </div>
        </div>
    );
}
export default UserProfile;