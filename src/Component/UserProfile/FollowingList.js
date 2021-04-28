import React from "react";
import styles from "./UserProfile.module.css";
import PostProfilePicture from "../Posts/PostProfilePicture";
import { BrowserRouter as Router, Redirect, Route, Switch, Link, useParams} from "react-router-dom";
import ReactDropdown from "react-dropdown";

function FollowingList() {
    const {userID} = useParams();
    const [following_1, updateFollowing] = React.useState([])
    const [following_userID, updateFollowID] = React.useState([])
    const [src, setSrc] = React.useState("");

    React.useEffect(()=>{
        followingFunction();
     }, [userID])

    function followingFunction(){
        fetch(process.env.REACT_APP_API_PATH+"/connections?userID="+userID,{
          method: "GET",
            headers: new Headers({
              'Content-Type': 'application/json',
            }),        
        }).then(response => response.json())
        .then(json => {
            if(json[1] !== 0){
                var jsonList = []
                var otherList = []
                for(var i = 0; i < json[1]; i++){  
                    // console.log(json[0][i].connectedUser.username)
                    // console.log(json[0][i].connectedUser.id)
                    jsonList.push(json[0][i].connectedUser.username)
                    otherList.push(json[0][i].connectedUser.id)
                }
                updateFollowing(jsonList)
                updateFollowID(otherList)
                // console.log(following_1)
                // console.log(following_userID)
            }
        }).catch(error => console.log(error));
      }
    return (
        <div>
        {following_1.length === 0 ? <h2>User is currently not following anyone!</h2> :
        <div>
        {following_1.map((e, index) => {
          const followPicture = following_userID[index]
          return (
            <div>
                <Link style={{ textDecoration: 'none' }} to={`/profile/${followPicture}`}>
                  <div className={styles.divList} key={index}>
                    <h3>{e}</h3>
                  </div>
                </Link>
            </div>
          )
        })}
        </div>
        }
    </div>
  );
}

export default FollowingList;