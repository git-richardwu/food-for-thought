import React from 'react';
import styles from "../atomStyles/postComponent.module.css"
import Posts from "../../Posts/Posts.js"
function PostComponent({post}){
  return(
        <div className={styles.postContainer}>
            {/* need to get user ID from parent when profile can be anyone */}
            <Posts userId={sessionStorage.getItem("user")}/>
        </div>

    )
}
export default PostComponent;