import React from 'react';

import { useState, useEffect } from 'react';
import "./Posts.css";
import "./CreateAPost.css"
import { BrowserRouter as Router, Redirect, Route, Switch, Link, useHistory} from "react-router-dom";

const Diet = () => {
    const [title, setTitle] = useState("");
    const [steps, setSteps] = useState([]);
    const [step, setStep] = useState("");
    const [ingredients, setIngredients] = useState([]);
    const [ingredient, setIngredient] = useState([]);
    const [image, setImage] = useState("");
    const [link, setLink] = useState("");
    const [redirect, setRedirect] = useState(false);
    const [postTags, setPostTags] = useState([]);
    const [tag, setTag] = useState("");
    const [calorie, setCalorie] = useState(0);
    const fileField = document.querySelector('input[type="file"]');



    const addTag = () => {
        if (tag != "" && !postTags.includes(tag)){
            if (postTags.length < 11){
                var add = postTags;
                add.push(tag);
                setPostTags(add);
                setTag("");
            }else{
                alert("Only 10 tags are allowed per post.")
            }
        }
    }

    const deleteTag = (tagID) => {
        setPostTags(postTags.filter(x => x != tagID));
    }

    return (
        <div className="createAPostContainer">

                <div className="postTagsContainer">
                    <div className="createCalorieContainer">
                        <label className="linkLabel">Calories:</label>
                        <input className="addTagInput" type="number" value={calorie} onChange={e => setCalorie(e.target.value)} step="25" min="0" max="10000"/>
                    </div>
                    <div className="addDietTagsContainer">
                        <label className="linkLabel">Add Diet Tags:</label>
                        <input className="addTagInput" type="url" value={tag} onChange={e => setTag(e.target.value)} maxLength="14" onKeyPress={e => setTagOnKey(e.key)}/>
                        <button className="addToListButtonTags" onClick={e => addTag()}>Add Tag</button>
                        <div className="displayedPostTags">
                            {postTags.map(tag => (
                                <div key={tag} className="postDietTag">
                                    {tag}
                                    <button className="deleteTag" onClick={e => deleteTag(tag)}>x</button>
                                </div>
                            ))}
                        </div>
                    </div>
   

                </div>

                <button className="createButton" onClick={e => createPost()}>Create</button>
            </div>
    )
}

export default Diet


