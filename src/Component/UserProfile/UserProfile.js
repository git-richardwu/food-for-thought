import React from "react";
import styles from "./UserProfile.module.css";
import styles2 from "./foobar.css";
import ProfilePictureButton from "../atoms/atomComponents/profilePictureButton";
import InfoContainer from "../atoms/atomComponents/infoContainer";
import FollowerComponent from "../atoms/atomComponents/followerComponent";
import ActivityComponent from "../atoms/atomComponents/activityComponent";
import Modal from "../Modal.jsx"
import { BrowserRouter as Router, Redirect, Route, Switch, Link, useParams} from "react-router-dom";

function UserProfile() {
  //need to pull userbio from database and store it in userBio variable
  const {userID} = useParams();
  const [userBio, editUserBio] = React.useState("");
  const [bioID, setBioID] = React.useState();
  const [followingCount, setFollowCount] = React.useState(0);
  const [followerCount, setFollowerCount] = React.useState(0);
  const [profilePicID, setProfilePicID] =  React.useState(-1);
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
  const [showUpdatePictureModal, setShowUpdatePictureModal] = React.useState(false);

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
 }, [followState, userID, url])

  function fetchProfilePic(){
    fetch(process.env.REACT_APP_API_PATH+"/user-artifacts?category=profilePicDisplay&ownerID="+userID, {
      method: "GET",
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
    })
    .then(response => response.json())
    .then(json => {
        if (json){
            if(json[1] == 0){
                setURL("https://i.redd.it/32ztztrp4m541.jpg")
                return;
              }
              else {
                  if (json[0][0].url.includes("http")){
                      // backwards compatability
                      setURL(json[0][0].url);
                  }
                  else if (process.env.REACT_APP_API_PATH.includes("localhost")){
                      setURL("http://localhost:3001"+json[0][0].url);
                  }else{
                      setURL("https://webdev.cse.buffalo.edu"+json[0][0].url);
                  }
                  setProfilePicID(json[0][0].id)
              }
        }
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
    fetch(process.env.REACT_APP_API_PATH+"/user-artifacts?category=bio&ownerID="+userID,{
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

  const updateImage = async () => {
    var pictureID = -1;
    var fileField = document.querySelector('input[type="file"]');
    if (profilePicID !== -1){
        var formData = new FormData();
        formData.append('file', fileField.files[0]);
        await fetch(process.env.REACT_APP_API_PATH+"/user-artifacts/"+profilePicID+"/upload", {
            method: "POST",
            headers: {
                'Authorization': 'Bearer '+sessionStorage.getItem("token")
            },
            body: formData
        }).then(res => res.json())
          .then(result => {    
                if (process.env.REACT_APP_API_PATH.includes("localhost")){
                    setURL("http://localhost:3001"+result.url);
                }else{
                    setURL("https://webdev.cse.buffalo.edu"+result.url);
                }
                setShowUpdatePictureModal(!showUpdatePictureModal);
          });
    }else{
        await fetch(process.env.REACT_APP_API_PATH+"/user-artifacts", {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer '+sessionStorage.getItem("token")
            },
            body: JSON.stringify({
                ownerID: sessionStorage.getItem("user"),
                type: "",
                url: "",
                category: "profilePicDisplay"
            })
      
          })
        .then(res => res.json())
        .then(
            async result => {
            var formData = new FormData();
            formData.append('file', fileField.files[0]);
            if (result) {
                pictureID = result.id;
                await fetch(process.env.REACT_APP_API_PATH+"/user-artifacts/"+pictureID+"/upload", {
                    method: "POST",
                    headers: {
                        'Authorization': 'Bearer '+sessionStorage.getItem("token")
                    },
                    body: formData
                    })
                    .then(response => response.json())
                    .then(result => {
                        if (process.env.REACT_APP_API_PATH.includes("localhost")){
                            setURL("http://localhost:3001"+result.url);
                          }else{
                            setURL("https://webdev.cse.buffalo.edu"+result.url);
                          }
                        setProfilePicID(pictureID);
                        setShowUpdatePictureModal(!showUpdatePictureModal);
                    });
                }
            }
        );
    }
    
}

  
function fetchWeightGoal() {
  fetch(process.env.REACT_APP_API_PATH+"/user-artifacts?category=weightGoal&ownerID="+userID,{
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
    fetch(process.env.REACT_APP_API_PATH+"/user-artifacts?category=calorieGoal&ownerID="+userID,{
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

    fetch(process.env.REACT_APP_API_PATH+"/user-artifacts?category=dietTag&ownerID="+userID,{
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

                {userID === sessionStorage.getItem("user") && <button onClick={() => setShowUpdatePictureModal(!showUpdatePictureModal)}>Change Profile Picture</button>}
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
              userID={userID}
            />
            <ActivityComponent userID={userID}/>
          </div>
          <Modal show={showUpdatePictureModal} onClose={e => setShowUpdatePictureModal(!showUpdatePictureModal)}>
            <div className="modal-header">
                <h2 className="modal-header-text">Update Profile Picture</h2>
            </div>
            <div className="modal-body">
                <input className="addImageButton" type="file" accept=".png,.jpg,.jpeg,.gif"/>
            </div>
            <div className="modal-footer">
                <button  className="yesButton" onClick={e => updateImage()}>Submit</button>
                <button className="noButton" onClick={e => setShowUpdatePictureModal(!showUpdatePictureModal)}>Cancel</button>
            </div>
        </Modal>
        </div>
    );
}
export default UserProfile;