import React from "react";
import styles from "./UserProfile/UserProfile.module.css";
import styles2 from "./UserProfile/foobar.css";
import ProfilePictureButton from "./atoms/atomComponents/profilePictureButton";
import InfoContainer from "./atoms/atomComponents/infoContainer";
import FollowerComponent from "./atoms/atomComponents/followerComponent";
import ActivityComponent from "./atoms/atomComponents/activityComponent";

function NonUserProfile(props) {
  const [userBio, editUserBio] = React.useState("");
  const [bioID, setBioID] = React.useState();
  const [artifactID, setArtifactID] =  React.useState(0);
  const [NONuserID, setUserID] = React.useState(props.match.params.userID)
  const [url, setURL] = React.useState("")
  const [followState, setFollowState] = React.useState(false)
  const [followingCount, setFollowCount] = React.useState(0)
  const [followerCount, setFollowerCount] = React.useState(0)

    React.useEffect(()=>{
        fetchUserBio();
        fetchProfilePic();
        fetchFollowing();
        fetchFollowingCount();
        fetchFollowerCount();
    }, [followState])
    
  function fetchFollowing(){
    fetch(process.env.REACT_APP_API_PATH+"/connections?userID="+sessionStorage.getItem("user")+"&connectedUserID="+NONuserID,{
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

  function fetchProfilePic(){
    fetch(process.env.REACT_APP_API_PATH+"/user-artifacts?ownerID="+NONuserID, {
      method: "GET",
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
    })
    .then(response => response.json())
    .then(json => {
        // console.log(json)
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

    function fetchFollowingCount(){
      fetch(process.env.REACT_APP_API_PATH+"/connections?userID="+NONuserID,{
        method: "GET",
          headers: new Headers({
            'Content-Type': 'application/json',
          }),        
      }).then(response => response.json())
      .then(json => {
          console.log(json)
          setFollowCount(json[1])
        })
    }

    function fetchFollowerCount(){
      fetch(process.env.REACT_APP_API_PATH+"/connections?connectedUserID="+NONuserID,{
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
 

  function fetchUserBio(){
    // console.log("User ID " + NONuserID)
    fetch(process.env.REACT_APP_API_PATH+"/user-artifacts?category=bio&ownerID="+NONuserID,{
      method:"GET",
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
                // console.log("Bio from user profile: " +bio);
                editUserBio(bio);
                // console.log("Bio id: " + result[0][0].id)
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

  function followFunction(){
    fetch(process.env.REACT_APP_API_PATH+"/connections?userID="+sessionStorage.getItem("user")+"&connectedUserID="+NONuserID,{
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
              connectedUserID: NONuserID,
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
  

    return (
          <div >
            {/* Pic and info container */}
            <div className={styles.picAndInfo}>
              <div>
                <img src={url} className="img1"></img>
                {/* { this.state.errorStatus2 ? <h5>Following!</h5> : <div/> } */}
                <button onClick={followFunction}>
                  {followState ? "Unfollow" : "Follow" }
                </button>
                {/* { followState ? <button onClick={followFunction}>Unfollow</button> : <button onClick={followFunction}>Follow</button>} */}
                {/* <button onClick={followFunction}>{ followState ? <h5>Unfollow</h5> : Follow }</button> */}
                {/* <h5>{this.state.url}</h5> 
                <h5>{this.state.artifactID}</h5> */}
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
              
                numOfFollowers={followerCount}
                numOfFollowing={followingCount}
              />
              <ActivityComponent activity={"{post goes here}"}/>
            </div>
          </div>
    );
}
export default NonUserProfile;