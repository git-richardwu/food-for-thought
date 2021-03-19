import React from "react";
import styles from "../atomStyles/infoContainer.module.css";
import DietTag from "../atomComponents/dietTag";
import moreIcon from "../../../assets/more_horiz-white-18dp.svg";
import { useEffect } from "react/cjs/react.development";
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
  pounds,
  setUserBio
}) {
  //Dont confuse bio with editBio...one is a string one is a boolean
  const [editBio, isEditingBio] = React.useState(false);
  useEffect(() => {
    console.log("From use effect " + bio);
    
  });


  return (
    <div className={styles.infoContainer}>
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto&display=swap"
        rel="stylesheet"
      />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Rubik+Mono+One&display=swap"
        rel="stylesheet"
      />

      <div className={styles.nameContainer}>
        <div className={styles.leftsideOfInfoContainer}>
          <p className={styles.name}>
            |{name}| @{username}
          </p>
          <div className={styles.bioAndButtonsContainer}>

            {editBio === false && <p className={styles.bioText}>{bio}</p>}
            
            {editBio === true && (
              <textarea type="text" id="userBio" rows="10" cols="20"   ></textarea>
            )}

            {editBio === false && (
              <div className={styles.editBio_Photo_Container}>
                <button onClick={() => isEditingBio(!editBio)}>
                  Edit bio button
                </button>
              </div>
            )}

            {editBio === true && (
              <div className={styles.editBio_Photo_Container}>
                <button onClick={() => {
                  setUserBio(document.getElementById("userBio").value);
                  isEditingBio(!editBio)
                  
                  }}> Submit</button>
              </div>
            )}
          </div>
        </div>
        {/* Right side of info container */}
        <div className={styles.rightSideOfInforContainer}>
          <h2 className={styles.dietInterestStyle}>Diet Interest:</h2>
          {/* Start of diet tag container */}
          <div className={styles.dietTagContainer}>
            <div className={styles.dietTagRow}>
              {/* First row of buttons */}
              <DietTag dietTag={dietTag1} />
              <DietTag dietTag={dietTag2} />
              <div className={styles.invisibleButton}> </div>
            </div>
            <div className={styles.dietTagRow}>
              {/* Second row of buttons */}
              <DietTag dietTag={dietTag3} />
              <DietTag dietTag={dietTag4} />

              <button className={styles.button}>
                {" "}
                <img className={styles.icon} src={moreIcon}></img>
              </button>
            </div>
            {/* End of diet tag container */}
          </div>
          {/* Start of calorie and Weight Container */}
          <div className={styles.calorieAndWeightContainer}>
            <div>
              {/* Calorie goal */}
              <h1 className={styles.calorieAndWeightStyle}>
                Calorie Goal : {calories}
              </h1>
            </div>

            <div>
              <h1 className={styles.calorieAndWeightStyle}>
                Weight Goal: {pounds}{" "}
              </h1>
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
