import React from 'react'
import {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";

const Budget = () => {
    const [budget, setBudget] = useState(0);
    const [budgetID, setID] = useState(-1);
    const [isRedirect, setIsRedirect] = useState(false) //setting the state to false, initial state

    useEffect(() => {  //this function is called every time the page loads
        const getBudgetInfo = async () => {
            await fetchBudgetSetting();
        }
        getBudgetInfo();
    }, [])

    const fetchBudgetSetting = async () => {
        var url = process.env.REACT_APP_API_PATH+"/user-preferences?name=budget&userID="+sessionStorage.getItem("user");
        fetch(url, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+sessionStorage.getItem("token")
          },
    
        })
           .then(res => res.json())
           .then(
            result => {
                if (result) {
                    if (result[1] === 0){ // index 1 == length, index 0 ==content
                        setID(-1);
                    }else{
                        setID(result[0][0].id); 
                        setBudget(result[0][0].value);
                        console.log(result)
                    }
                }
            },
            error => {
              console.log(error);
            }
          );
      }

    const updateBudget = async (value) => { //decide if it's patch or post based on ID 
        budgetID != -1
            ? patchBudget(value) //if the ID is not -1 or if something is there, you update the budget
            : postBudget(value); //if the ID is -1 or is there is not input budget, you create a new budget user artifact 
    }

    const patchBudget = async (value) => { 
        var url = process.env.REACT_APP_API_PATH+"/user-preferences/"+budgetID
        fetch(url, {
            method: "PATCH",
            headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+sessionStorage.getItem("token")
            },
            body: JSON.stringify({
                value: value
            })

            })
            .then(res => res.json())
            .then(
            result => {
                if (result) {
                    setBudget(value);
                    setIsRedirect(true);
                }
            },
            error => {
                console.log(error);
            }
            );
        }

    const postBudget = async (value) => {
        var url = process.env.REACT_APP_API_PATH+"/user-preferences";
        fetch(url, {
            method: "POST",
            headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+sessionStorage.getItem("token")
            },                                                       
            body: JSON.stringify({
                userID: sessionStorage.getItem("user"),
                name: "budget",
                value: value //body of the JSON request
            })

            })
            .then(res => res.json())
            .then(
            result => { 
                if (result) { //if you get something back ("result") then you set the value to what you get
                    setBudget(value);
                    setID(result.id);
                    setIsRedirect(true);
                }
            },
            error => {
                console.log(error);
            }
            );
    }
    if (isRedirect === true){
        return <Redirect to='/settings/preferences'></Redirect>
    }
    else{
        return (
            <div className="pref">
                <Link to="/settings/preferences">   
                    <button className="backButton backButtonCreate">
                        <i className="arrow left"/>
                        Back
                    </button>
                </Link>
                <h2>Budget</h2>
                <label className="budgetLabel">You would like to spend $<input className="budgetInput" value={budget} type="number" min="0" max="1,000" step="10" onChange={e => setBudget(e.target.value)} ></input> dollars a week</label>
                <button className="Submit" onClick={() => updateBudget(budget) }>Submit</button>
                {/* e is event, target is input and .value is specific value */}

            </div>
        );
    }
        
}

export default Budget
