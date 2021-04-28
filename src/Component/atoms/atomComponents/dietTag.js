import React from "react";
import styles from "../atomStyles/dietTag.module.css";

function DietTag({ dietTag }) {
  return (
    <div className={styles.dietTagContainer}>
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
  <link href="https://fonts.googleapis.com/css2?family=Rubik&display=swap" rel="stylesheet"/>
    {dietTag !== "" &&    
        <div className={styles.profileDietTag}>
            {dietTag}
        </div>   
    }

    </div>
  );
}
export default DietTag;
