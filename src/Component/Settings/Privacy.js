import React from 'react'
import {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

const Privacy = () => {
    const [isPrivate, setPrivate] = useState(false);
    const [privateID, setID] = useState(-1);
    const [numBlockedUsers, setNumBlockedUsers] = useState(0);

    useEffect(() => {
        const getPrivacyInfo = async () => {
            await fetchPrivacySetting();
            await fetchNumBlockedUsers();
        }
        getPrivacyInfo();
    }, [])

    const fetchPrivacySetting = async () => {
        var url = process.env.REACT_APP_API_PATH+"/user-preferences?name=privacy&userID="+sessionStorage.getItem("user");
        fetch(url, {
          method: "get",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+sessionStorage.getItem("token")
          },
    
        })
           .then(res => res.json())
           .then(
            result => {
                if (result) {
                    if (result[1] === 0){
                        setID(-1);
                    }else{
                        setID(result[0][0].id);
                        setPrivate(result[0][0].value === "true");
                    }
                }
            },
            error => {
              console.log(error);
            }
          );
      }

    const fetchNumBlockedUsers = async () => {
        var url = process.env.REACT_APP_API_PATH+"/connections?type=blocked&userID="+sessionStorage.getItem("user");
        fetch(url, {
          method: "get",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+sessionStorage.getItem("token")
          },
    
        })
          .then(res => res.json())
          .then(
            result => {
              if (result) {
                  setNumBlockedUsers(result[1]);
              }
            },
            error => {
              console.log(error);
            }
          );
      }
    
    const updatePrivacy = async (isChecked) => {
        privateID != -1
            ? patchPrivacy(isChecked)
            : postPrivacy(isChecked);
    }

    const patchPrivacy = async (isChecked) => {
        var url = process.env.REACT_APP_API_PATH+"/user-preferences/"+privateID
        fetch(url, {
            method: "PATCH",
            headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+sessionStorage.getItem("token")
            },
            body: JSON.stringify({
                value: isChecked.toString()
            })

            })
            .then(res => res.json())
            .then(
            result => {
                if (result) {
                    setPrivate(isChecked);
                }
            },
            error => {
                console.log(error);
            }
            );
        }

    const postPrivacy = async (isChecked) => {
        var url = process.env.REACT_APP_API_PATH+"/user-preferences";
        fetch(url, {
            method: "POST",
            headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+sessionStorage.getItem("token")
            },                                                       
            body: JSON.stringify({
                userID: sessionStorage.getItem("user"),
                name: "privacy",
                value: isChecked.toString()
            })

            })
            .then(res => res.json())
            .then(
            result => {
                if (result) {
                    setPrivate(isChecked);
                    setID(result.id);
                }
            },
            error => {
                console.log(error);
            }
            );
    }

    return (
        <div className="privacyContainer">
            <Link to="/settings">   
                <button className="backButton backButtonCreate">
                    <i className="arrow left"/>
                    Back
                </button>
            </Link>
            <div className="privacy">              
                <label className="privacyLabel">Set Account to Private:</label>
                <label className="switch">
                    <input type="checkbox" onChange={e => updatePrivacy(!isPrivate)} checked={isPrivate}/>
                    <span className="slider round"/>
                </label>
                <p className="privacySubLabel">
                    Your posts will only be shown to people who follow you and who you follow back
                </p>
            </div>
            <Link to="/settings/privacy/blockedUsers">
                <button className="settingsMenuButton">
                    Blocked Accounts
                    <div className="triangle-right"/>
                    <div className="numBlock">    
                        {numBlockedUsers}
                    </div>
                </button>
            </Link>
        </div>
    )
}

export default Privacy
