import React from 'react';
import styles from "../atomStyles/postComponent.module.css"
function PostComponent({post}){
  return(
        <div className={styles.postContainer}>
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Reem+Kufi&display=swap" rel="stylesheet"/>

            <p className={styles.post}> {post}</p>
        </div>

    )
}
export default PostComponent;