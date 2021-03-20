import React from "react"
import styles from "../atomStyles/activityComponent.module.css"
import PostComponent from "./postComponent"

function ActivityComponent({activity}){
    return(
        <div className={styles.activityContainer}>
            <link rel="preconnect" href="https://fonts.gstatic.com"/>
<link href="https://fonts.googleapis.com/css2?family=Rubik+Mono+One&display=swap" rel="stylesheet"/>
            <div className={styles.activityLog}>
                <p className={styles.title}>Activity Log</p>
            </div>
            <PostComponent post={activity}/>
           
        </div>
    )
}

export default ActivityComponent