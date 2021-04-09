import React from 'react';
import styles from "../atomStyles/followerComponent.module.css"
import { BrowserRouter as Router, Redirect, Route, Switch, Link } from "react-router-dom";
function FollowerComponent({numOfFollowers, numOfFollowing, userID}){
   return (
       <div className={styles.followerContainer}>
           <link rel="preconnect" href="https://fonts.gstatic.com"/>
<link href="https://fonts.googleapis.com/css2?family=Rubik+Mono+One&display=swap" rel="stylesheet"/>
          <p className={styles.subTitleText}>Followers: {numOfFollowers}</p>
           <p className={styles.subTitleText}> Following: {numOfFollowing}</p>
           {/* <button ><p className={styles.subTitleText}>Following List</p></button> */}
           <Link to={`/following/${userID}`}>
            <button >
               <p className={styles.subTitleText}>Following List</p>
            </button>
            </Link>
       </div>
   )
}

export default FollowerComponent; 