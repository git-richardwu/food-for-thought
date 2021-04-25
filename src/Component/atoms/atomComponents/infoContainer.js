import React from "react";
import styles from "../atomStyles/infoContainer.module.css";
import DietTag from "../atomComponents/dietTag";
import moreIcon from "../../../assets/more_horiz-white-18dp.svg";
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
  setUserBio,
  bioID,
  userID
  
}) {
  //Dont confuse bio with editBio...one is a string one is a boolean
  const [editBio, isEditingBio] = React.useState(false);

  async function updateUserBio(test) {
    setUserBio(test)
    console.log(bioID)
    console.log(test);
    if(bioID === -1){ //If user never created a bio
      await fetch(process.env.REACT_APP_API_PATH +"/user-artifacts", {
        method:"POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': "Bearer " + sessionStorage.getItem("token"),
        },
        body: JSON.stringify({
          "ownerID": sessionStorage.getItem("user"),
          "category": "bio",
          "type": test,
          "url": "string",

        }),
      })
        .then((res) => res.json())
        .then(
          (result) => {
              if (result){
                console.log("This is the result: " + result);
              }
          }
        )
        .catch(error => console.log(error));
    }else{
        await fetch(
        process.env.REACT_APP_API_PATH +"/user-artifacts/"+bioID,
        {
            method: "PATCH",
            headers: {
            "Content-Type": "application/json",
            'Authorization': "Bearer " + sessionStorage.getItem("token"),
            },
            body: JSON.stringify({
            "type": test,
            }),
        }
        )
        .then((res) => res.json())
        .then(
            (result) => {
                if (result){
                    console.log(result);
                }
            }
        ).catch(error => console.log(error));
  }
}

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
            @{username}
          </p>
          <div className={styles.bioAndButtonsContainer}>
            {editBio === false && <p className={styles.bioText}>{bio}</p>}


            <label for="bio edit" hidden>Bio</label>
            {editBio === true && (
                    <textarea className={styles.bioText} id="bio edit" type="text" rows="10" cols="20"/>
            )}

            {userID === sessionStorage.getItem("user") && editBio === false && (
              <div className={styles.editBio_Photo_Container}>
                <button className={styles.editBioButton} onClick={() => isEditingBio(!editBio)}>
                  Edit Bio
                </button>
              </div>
            )}

            {editBio === true && (
              <div className={styles.editBio_Photo_Container}>
                <button className={styles.editBioButton}
                  onClick={ async () => {
                   console.log("Thsi is user input: " +document.getElementById("bio edit").value)
                    let test = document.getElementById("bio edit").value;
                    isEditingBio(!editBio);
                    await updateUserBio(test);
                  }}
                >
                  {" "}
                  Submit
                </button>
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
              {/* <div className={styles.invisibleButton}> </div> */}
            </div>
            <div className={styles.dietTagRow}>
              {/* Second row of buttons */}
              <DietTag dietTag={dietTag3} />
              <DietTag dietTag={dietTag4} />

              {/* <button className={styles.button}>
                {" "}
                <img className={styles.icon} src={moreIcon}></img>
              </button> */}
            </div>
            {/* End of diet tag container */}
          </div>
          {/* Start of calorie and Weight Container */}
          <div className={styles.calorieAndWeightContainer}>
            <div>
              {/* Weight goal */}
              <h1 className={styles.calorieAndWeightStyle}>
                Weight Goal: {pounds}{" "}
              </h1>
            </div>

            <div>
                {/* Calorie goal */}
              <h1 className={styles.calorieAndWeightStyle}>
                Calorie Goal: {calories}
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
