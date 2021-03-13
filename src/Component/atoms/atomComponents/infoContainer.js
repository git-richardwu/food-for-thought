import React from "react";
import styles from "../atomStyles/infoContainer.module.css";

function InfoContainer({ name, username }) {
  return (
    <div className={styles.infoContainer}>
      <div className={styles.nameContainer}>

        <div className={styles.leftsideOfInfoContainer}>
          <p className={styles.name}>
            |{name}| @{username}
          </p>
          <p>
              bio
          </p>
        </div>
      </div>
    </div>
  );
}

export default InfoContainer;

// Potential props
// {name}, {username}, {bio}, {tags}, {calorieGoal}, {weightGoal}
