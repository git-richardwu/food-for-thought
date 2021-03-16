import React from "react";
import styles from "../atomStyles/infoContainer.module.css";
import DietTag from "../atomComponents/dietTag"
// import GoogleFontLoader from 'react-google-font-loader';

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
<link rel="preconnect" href="https://fonts.gstatic.com"/>
<link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet"/>
<link rel="preconnect" href="https://fonts.gstatic.com"/>
<link href="https://fonts.googleapis.com/css2?family=Rubik+Mono+One&display=swap" rel="stylesheet"/>

         {/* <GoogleFontLoader
      fonts={[
        {
          font: 'Roboto',
          weights: [400, '400i'],
        },
      ]}/> */}
      
      <div className={styles.nameContainer}>
        <div className={styles.leftsideOfInfoContainer}>
          <p className={styles.name} >
            |{name}| @{username}
          </p>
          <div className={styles.bioAndButtonsContainer}>
            <p className={styles.bioText}>{bio}</p>
            <div className={styles.editBio_Photo_Container}>
              <button> Edit bio button</button>
            </div>
          </div>
        </div>
        {/* Right side of info container */}
        <div className={styles.rightSideOfInforContainer}>
          <h2 className={styles.dietInterestStyle}>Diet Interest:</h2>
          {/* Start of diet tag container */}
          <div className={styles.dietTagContainer}>
            <div className={styles.dietTagRow}>
              {/* First row of buttons */}
              <DietTag dietTag={dietTag1}/>
              <DietTag dietTag= {dietTag2}/>
              <p className={styles.invisibleText}>more</p>
            </div>
            <div className={styles.dietTagRow}>
              {/* Second row of buttons */}
              <DietTag dietTag={dietTag3}/>
              <DietTag dietTag= {dietTag4}/>
              <button><p>more</p></button>
            </div>
            {/* End of diet tag container */}
          </div>
          {/* Start of calorie and Weight Container */}
          <div className={styles.calorieAndWeightContainer}>
            <div>
              {/* Calorie goal */}
              <h1 className={styles.calorieAndWeightStyle}>Calorie Goal : {calories}</h1>
            </div>

            <div>
              <h1 className={styles.calorieAndWeightStyle}>Weight Goal: {pounds}  </h1>
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
