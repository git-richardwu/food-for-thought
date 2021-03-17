import React from 'react';
import styles from "../atomStyles/followerComponent.module.css"
function FollowerComponent({numOfFollowers, numOfFollowing}){
   return (
       <div className={styles.followerContainer}>
           <link rel="preconnect" href="https://fonts.gstatic.com"/>
<link href="https://fonts.googleapis.com/css2?family=Rubik+Mono+One&display=swap" rel="stylesheet"/>
          <p className={styles.subTitleText}>Followers: {numOfFollowers}</p>
           <p className={styles.subTitleText}> Following: {numOfFollowing}</p>
           <button><p className={styles.subTitleText}>Following List</p></button>
       </div>
   )
}

export default FollowerComponent; 