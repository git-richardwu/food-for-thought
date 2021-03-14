import React from "react";
import styles from "../atomStyles/infoContainer.module.css";

function InfoContainer({
  name,
  username,
  bio,
  dietTag1,
  dietTag2,
  dietTag3,
  dietTag4,
  calories,
  pounds
}) {
  return (
    <div className={styles.infoContainer}>
      <div className={styles.nameContainer}>
        <div className={styles.leftsideOfInfoContainer}>
          <p className={styles.name}>
            |{name}| @{username}
          </p>
          <div className={styles.bioAndButtonsContainer}>
            <p>{bio}</p>
            <div className={styles.editBio_Photo_Container}>
              <button>Change photo button</button>
              <button> Edit bio button</button>
            </div>
          </div>
        </div>
        {/* Right side of info container */}
        <div className={styles.rightSideOfInforContainer}>
          <h2>Diet Interest:</h2>
          {/* Start of diet tag container */}
          <div className={styles.dietTagContainer}>
            <div className={styles.dietTagRow}>
              {/* First row of buttons */}
              <button>{dietTag1}</button>

              <button>{dietTag2}</button>

              <p>more</p>
            </div>
            <div className={styles.dietTagRow}>
              {/* Second row of buttons */}
              <button>{dietTag3}</button>

              <button>{dietTag4}</button>
              <p>more</p>
            </div>
            {/* End of diet tag container */}
          </div>
          {/* Start of calorie and Weight Container */}
          <div className={styles.calorieAndWeightContainer}>
            <div>
              {/* Calorie goal */}
              <p>Calorie Goal : {calories}</p>
            </div>

            <div>
              <p>Weight Goal: {pounds}  </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoContainer;

// Potential props
// {name}, {username}, {bio}, {tags}, {calorieGoal}, {weightGoal}
