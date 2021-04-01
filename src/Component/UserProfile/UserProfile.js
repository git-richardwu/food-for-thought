import React from "react";
import styles from "./UserProfile.module.css";
import styles2 from "./foobar.css";
import ProfilePictureButton from "../atoms/atomComponents/profilePictureButton";
import InfoContainer from "../atoms/atomComponents/infoContainer";
import FollowerComponent from "../atoms/atomComponents/followerComponent";
import ActivityComponent from "../atoms/atomComponents/activityComponent";

function UserProfile() {
  //need to pull userbio from database and store it in userBio variable
  const [userBio, editUserBio] = React.useState("");
  const [bioID, setBioID] = React.useState();
  const [artifactID, setArtifactID] =  React.useState(0);
  const [userID, setUserID] = React.useState(window.sessionStorage.getItem("user"))
  const [url, setURL] = React.useState("")

    React.useEffect(()=>{
        fetchUserBio();
        fetchProfilePic();
    })

  function fetchProfilePic(){
    fetch(process.env.REACT_APP_API_PATH+"/user-artifacts?ownerID="+userID, {
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
          // if(result){
          //   //edge case is bio not there
          //   if(result[0][0].type != null){
          //     let bio =  result[0][0].type;
          //     console.log("Bio from user profile: " +bio);
          //     editUserBio(bio);
          //     console.log("Bio id: " + result[0][0].id)
          //     setBioID(result[0][0].id);
          //     // console.log("This is result: " + result[0][1].ownerID)
          //   }else{
          //     let bio = "Please add a bio."
          //     editUserBio(bio);
          //   }
            
          // }
        ,
        error=>{
          alert("Error occurred when trying to retrieve bio")
        }
      );

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
            console.log(json)
            console.log(json.id)
            console.log(json.url)
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
          console.log(json)
          console.log(json.url)
          setURL(json.url)
          return;
      })
    }
  }
}
    return (
          <div >
            {/* Pic and info container */}
            <div className={styles.picAndInfo}>
              <div>
                <img src={url} className="img1"></img>
                {/* <h5>{this.state.url}</h5> 
                <h5>{this.state.artifactID}</h5> */}

                <button onClick={updateImageURL}>Change Profile Picture</button>
                {/* <ProfilePictureButton name={"Picture Place Holder"} /> */}
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