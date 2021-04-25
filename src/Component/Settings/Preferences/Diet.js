import React from 'react';

import { useState, useEffect } from 'react';
import "./Diet.css"
import { BrowserRouter as Router, Redirect, Route, Switch, Link, useHistory} from "react-router-dom";

const Diet = () => {
  
    const [redirect, setRedirect] = useState(false);
    const [dietTags, setDietTags] = useState([]);
    const [tags, setDTags] = useState("");
    const [dietTagsID, setID] = useState(-1)
    const fileField = document.querySelector('input[type="file"]');
    const [postTagLimit, setPostTagLimit] = useState(false);


    useEffect(() => {  //this function is called every time the page loads
        const getDietSettings = async () => {
            await fetchDietTags();
        }
        getDietSettings();
    }, [])

    const addTag = () => {
        if (tags != "" && !dietTags.includes(tags) && dietTagsID === -1){
            if (dietTags.length < 10){
                var add = dietTags;
                add.push(tags);
                setDietTags(add);
                setDTags("");
                postDiet(dietTags)
                setPostTagLimit(false);
            }else{
                alert("Only 10 tags are allowed on your profile.") //in line message for limit
                setPostTagLimit(true);
            }
        }
        else if (tags != "" && !dietTags.includes(tags) && dietTagsID !== -1){
            if (dietTags.length < 10){
                var add = dietTags;
                add.push(tags);
                setDietTags(add);
                setDTags("");
                patchDiet(dietTags)
                setPostTagLimit(false);
            }else{
                setPostTagLimit(true);
            }
        }
    }

    const deleteTag = (tagID) => {
        var removed = dietTags.filter(x => x != tagID)
        setDietTags(removed);
        patchDiet(removed)
    }
    
    const setTagOnKey = (key) => {
        if (key === "Enter"){
            addTag()
        }
    }
    const fetchDietTags = async () => {
        var url = process.env.REACT_APP_API_PATH+"/user-preferences?name=dietTags&userID="+sessionStorage.getItem("user");
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
                        setID(-1); //if there is nothing there setID to -1 

                    }else{
                        var hold = result[0][0].value.split("~")
                        setID(result[0][0].id); //an array of arrays
                        setDietTags(result[0][0].value.split("~").filter(x => x !== ""));
                        console.log(dietTags)
                    }
                    console.log(result)
                }
            },
            error => {
              console.log(error);
            }
          );
      }

    const patchDiet = async (value) => {
        console.log(value)
        var url = process.env.REACT_APP_API_PATH+"/user-preferences/"+dietTagsID
        fetch(url, {
            method: "PATCH",
            headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+sessionStorage.getItem("token")
            },
            body: JSON.stringify({
                value: value.join("~")
            })

            })
            .then(res => res.json())
            .then(
            result => {
                if (result) {
                    setDietTags(value);
                    console.log(result)
 

                    // setIsRedirect(true);
                }
            },
            error => {
                console.log(error);
            }
            );
        }

    const postDiet = async (value) => {
        var url = process.env.REACT_APP_API_PATH+"/user-preferences";
        fetch(url, {
            method: "POST",
            headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+sessionStorage.getItem("token")
            },                                                       
            body: JSON.stringify({
                userID: sessionStorage.getItem("user"),
                name: "dietTags",
                value: value.join("~")
                //body of the JSON request
            })

            })
            .then(res => res.json())
            .then(
            result => { 
                if (result) { //if you get something back ("result") then you set the value to what you get
                    setDietTags(value);
                    setID(result.id)
                    console.log(result)

                }
            },
            error => {
                console.log(error);
            }
            );
    }


        return (
                <div className="createAPostContainer">     
                    <h2>Diet Tags</h2>           
                    <div className="addDietTagsContainer">
                        <label for="add tag" className="linkLabel2">Add Diet Tags:</label>
                        <input id="add tag" className="addTagInput2" type="url" value={tags} onChange={e => setDTags(e.target.value)} maxLength="14" onKeyPress={e => setTagOnKey(e.key)}/>
                        <button className="addToListButtonTags2" onClick={e => addTag()}>Add Tag</button>
                        {postTagLimit && <p className="errorMessage">Only 10 tags are allowed in your preferences.</p>}
                        <div className="displayedPostTags">
                            {dietTags.map(tag => (
                                <div key={tag} className="postDietTag">
                                    {tag}
                                    <button className="deleteTag" onClick={e => deleteTag(tag)}>X</button>
                                </div>
                            ))}

                        </div>
                    </div>
                </div>      
                )
                    }

export default Diet


