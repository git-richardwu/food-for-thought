import React from "react";
import "./Settings.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
// import SideMenu from "../atoms/atomComponents/sideMenu"

const Preferences = () => {
  const [weightGoal, setWeightGoal] = React.useState();
  const [weightGoalID, setWeightGoalID] = React.useState(-1);
  const [weightGoalButton, pressedWeightGoalButton] = React.useState(false)
  const [calorieGoal, setCalorieGoal] = React.useState();
  const [calorieGoalID, setCalorieGoalID] = React.useState(-1);
  const [calorieGoalButton, pressedCalorieGoalButton] = React.useState(false)

  React.useEffect(() => {
    fetchWeightGoal();
    fetchCalorieGoal();
  });

  function fetchWeightGoal() {
    fetch(process.env.REACT_APP_API_PATH+"/user-artifacts?category=weightGoal&ownerID="+sessionStorage.getItem("user"),{
      method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      }
    )
      .then((res) => res.json())
      .then(
        (result) => {
          if (result[0].length !== 0) {
            result[0].forEach(function (artifacts) {
              if (artifacts.category == "weightGoal") {
                let goal = artifacts.type;
                console.log("Goal from user preferences: " + goal);
                setWeightGoal(goal);
                console.log("Weight goal id: " + artifacts.id);
                setWeightGoalID(artifacts.id);
              } 
            });
          } else {
            setWeightGoalID(-1);
          }
        }
      ).catch(error => console.log(error));
  }

  function fetchCalorieGoal() {
    fetch(process.env.REACT_APP_API_PATH+"/user-artifacts?category=calorieGoal&ownerID="+sessionStorage.getItem("user"),{
      method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      }
    )
      .then((res) => res.json())
      .then(
        (result) => {
          if (result[0].length !== 0) {
            result[0].forEach(function (artifacts) {
              if (artifacts.category == "calorieGoal") {
                let calorie = artifacts.type;
                console.log("Goal from user preferences: " + calorie);
                setCalorieGoal(calorie);
                console.log("Calorie goal id: " + artifacts.id);
                setCalorieGoalID(artifacts.id);
              } 
            });
          } else {
            setCalorieGoalID(-1);
          }
        }
      ).catch(error => console.log(error));
  }

  async function submitWeightGoal(goal){
    //if weightGoalID == -1 do a post, otherwise do a patch
    await setWeightGoal(goal)
    console.log("Goal in submit func(): " + goal)
    console.log("This is weight goal: hdhnd " + weightGoal)
    console.log("This is the userID " + sessionStorage.getItem("user"))
    if (weightGoalID === -1){

      fetch(process.env.REACT_APP_API_PATH +"/user-artifacts", {
        method:"POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': "Bearer " + sessionStorage.getItem("token"),
        },
        body: JSON.stringify({
          "ownerID": sessionStorage.getItem("user"),
          "category": "weightGoal",
          "type": goal,
          "url": "string",
        }),
      })
        .then((res) => res.json())
        .then(
          (result) => {
            console.log("This is the result:1 " + result);
          }
        ).catch(error => console.log(error));
    }else{
      fetch(
      process.env.REACT_APP_API_PATH +"/user-artifacts/"+weightGoalID,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          'Authorization': "Bearer " + sessionStorage.getItem("token"),
        },
        body: JSON.stringify({
          "type": goal,
        }),
      }
    )
      .then((res) => res.json())
      .then(
        (result) => {
          console.log("This is the result:2 " + result.Status);
        }
      ).catch(error => console.log(error));
  }



    }
    async function submitCalorieGoal(calorie){
      //if calorieGoalID == -1 do a post, otherwise do a patch
      await setCalorieGoal(calorie)
      console.log("Goal in submit func(): " + calorie)
      console.log("This is calorie goal: hdhnd " + calorieGoal)
      console.log("This is the userID " + sessionStorage.getItem("user"))
      if (calorieGoalID === -1){
  
        fetch(process.env.REACT_APP_API_PATH +"/user-artifacts", {
          method:"POST",
          headers: {
            "Content-Type": "application/json",
            'Authorization': "Bearer " + sessionStorage.getItem("token"),
          },
          body: JSON.stringify({
            "ownerID": sessionStorage.getItem("user"),
            "category": "calorieGoal",
            "type": calorie,
            "url": "string",
          }),
        })
          .then((res) => res.json())
          .then(
            (result) => {
              console.log("This is the result:1 " + result);
            }
          ).catch(error => console.log(error));
      }else{
        fetch(
        process.env.REACT_APP_API_PATH +"/user-artifacts/"+calorieGoalID,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            'Authorization': "Bearer " + sessionStorage.getItem("token"),
          },
          body: JSON.stringify({
            "type": calorie,
          }),
        }
      )
        .then((res) => res.json())
        .then(
          (result) => {
            console.log("This is the result:2 " + result.Status);
          },
        ).catch(error => console.log(error));
    }
  
  
  
      }
  
  return (
      <div className="settingsContainer">
        <Link to="/settings">   
            <button className="backButton backButtonCreate">
                <i className="arrow left"/>
                Back
            </button>
        </Link>
        <Link to="/settings/preferences/diet" className="settingsMenuButton">
            Diet
            <div className="triangle-right" />
        </Link>
        <Link to="/settings/preferences/allergies" className="settingsMenuButton">
            Allergies
            <div className="triangle-right" />
        </Link>
        <Link to="/settings/preferences/budget" className="settingsMenuButton">
            Budget
            <div className="triangle-right" />      
        </Link>
        <div className="setWeightGoalButtonContainer">
            <div className="weightAndValue">
                <label for="weightGoal" className="weightBox">Weight Goal:</label>
                {weightGoalButton === false &&
                <   div className="weightText">{weightGoal}</div>
                }
                {weightGoalButton === true &&
                    <input className="inputBox" type = "number" id="weightGoal"/> 
                }
                {weightGoalButton === false &&
                    <button className="setWeightGoalButton" onClick={()=>{
                        pressedWeightGoalButton(true)
                    }}>Set</button>
                }
                {weightGoalButton === true &&
                    <button className="setWeightGoalButton" onClick={ async ()=>{
                        let goal = document.getElementById("weightGoal").value + " lb"
                        await submitWeightGoal(goal)
                        console.log(document.getElementById("weightGoal").value)
                        pressedWeightGoalButton(false)
                    }}>Submit</button>
                }
            </div>
            <div className="weightAndValue">
                <label for="calorieGoal" className="weightBox">Calorie Goal:</label>
                {calorieGoalButton === false &&
                    <div className="weightText">{calorieGoal}</div>
                }
                {calorieGoalButton === true &&
                    <input className="inputBox" type = "number" id="calorieGoal"/> 
                }
                
                {calorieGoalButton === false &&
                    <button className="setWeightGoalButton" onClick={()=>{
                        pressedCalorieGoalButton(true)
                    }}>Set</button>
                }
                {calorieGoalButton === true &&
                    <button className="setWeightGoalButton" onClick={ async ()=>{
                        let calorie = document.getElementById("calorieGoal").value + " kcal/day"
                        await submitCalorieGoal(calorie)
                        console.log(document.getElementById("calorieGoal").value)
                        pressedCalorieGoalButton(false)
                    }}>Submit</button>
                }
            </div>
        </div> 
    </div>
  );
};

export default Preferences;
