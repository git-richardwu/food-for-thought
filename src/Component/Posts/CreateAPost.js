import React from 'react';

import { useState, useEffect } from 'react';
import "./Posts.css";
import "./CreateAPost.css"
import { BrowserRouter as Router, Redirect, Route, Switch, Link, useHistory} from "react-router-dom";

const CreateAPost = () => {
    const [title, setTitle] = useState("");
    const [invalidTitle, setInvalidTitle] = useState(false)
    const [steps, setSteps] = useState([]);
    const [step, setStep] = useState("");
    const [invalidSteps, setInvalidSteps] = useState(false)
    const [ingredients, setIngredients] = useState([]);
    const [ingredient, setIngredient] = useState([]);
    const [invalidIngredients, setInvalidIngredients] = useState(false);
    const [image, setImage] = useState("");
    const [invalidImage, setInvalidImage] = useState(false)
    const [link, setLink] = useState("");
    const [redirect, setRedirect] = useState(false);
    const [postTags, setPostTags] = useState([]);
    const [postTagLimit, setPostTagLimit] = useState(false);
    const [tag, setTag] = useState("");
    const [calorie, setCalorie] = useState(0);
    const fileField = document.querySelector('input[type="file"]');
    const history = useHistory()

    const addStep = () => {
        if (step != ""){
            var add = step.split("\n").filter((s) => s != "");
            setSteps(add);
            setStep("");
        }
    }

    const addIngredient = () => {
        if (ingredient != ""){
            var add = ingredient.split("\n").filter((i) => i != "");
            setIngredients(add);
            setIngredient("");
        }
    }

    const addTag = () => {
        if (tag != "" && !postTags.includes(tag)){
            if (postTags.length < 11){
                var add = postTags;
                add.push(tag);
                setPostTags(add);
                setTag("");
                setPostTagLimit(false);
            }else{
                setPostTagLimit(true);
            }
        }
    }

    const deleteTag = (tagID) => {
        setPostTags(postTags.filter(x => x != tagID));
    }

    const invalidPost = () => {
        setInvalidTitle(false);
        setInvalidImage(false);
        setInvalidSteps(false);
        setInvalidIngredients(false);
        if (title.length == 0){
            setInvalidTitle(true);
        }
        if (steps.length == 0){
            setInvalidSteps(true);
        }
        if (ingredients.length == 0){
            setInvalidIngredients(true);
        }
        if (image.length == 0){
            setInvalidImage(true);
        }

        return title.length == 0 && steps.length == 0 && ingredients.length == 0 && image.length == 0;
    }

    const createPost = async () => {
        if (!invalidPost()){
            var stepsID = -1;
            var ingredientsID = -1;
            var pictureID = -1;
            await fetch(process.env.REACT_APP_API_PATH+"/user-artifacts", {
                method: "POST",
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer '+sessionStorage.getItem("token")
                },
                body: JSON.stringify({
                    ownerID: sessionStorage.getItem("user"),
                    type: steps.join("~"),
                    url: "",
                    category: "steps"
                })
          
              })
                .then(res => res.json())
                .then(
                  async result => {
                    if (result) {
                        stepsID = result.id;
                        await fetch(process.env.REACT_APP_API_PATH+"/user-artifacts", {
                            method: "POST",
                            headers: {
                              'Content-Type': 'application/json',
                              'Authorization': 'Bearer '+sessionStorage.getItem("token")
                            },
                            body: JSON.stringify({
                                ownerID: sessionStorage.getItem("user"),
                                type: ingredients.join("~"),
                                url: "",
                                category: "ingredients"
                            })
                      
                          })
                            .then(res => res.json())
                            .then(
                              async result => {
                                if (result) {
                                    ingredientsID = result.id;
                                    await fetch(process.env.REACT_APP_API_PATH+"/user-artifacts", {
                                        method: "POST",
                                        headers: {
                                          'Content-Type': 'application/json',
                                          'Authorization': 'Bearer '+sessionStorage.getItem("token")
                                        },
                                        body: JSON.stringify({
                                            ownerID: sessionStorage.getItem("user"),
                                            type: "",
                                            url: "",
                                            category: "postPhoto"
                                        })
                                  
                                      })
                                        .then(res => res.json())
                                        .then(
                                          async result => {
                                            var formData = new FormData();
                                            formData.append('file', fileField.files[0]);
                                            if (result) {
                                                pictureID = result.id;
                                                await fetch(process.env.REACT_APP_API_PATH+"/user-artifacts/"+pictureID+"/upload", {
                                                    method: "POST",
                                                    headers: {
                                                      'Authorization': 'Bearer '+sessionStorage.getItem("token")
                                                    },
                                                    body: formData
                                                  })
                                                    .then(res => res.json())
                                                    .then(
                                                      async result => {
                                                        if (result) {
                                                            await fetch(process.env.REACT_APP_API_PATH+"/posts", {
                                                                method: "POST",
                                                                headers: {
                                                                  'Content-Type': 'application/json',
                                                                  'Authorization': 'Bearer '+sessionStorage.getItem("token")
                                                                },
                                                                body: JSON.stringify({
                                                                    authorID: sessionStorage.getItem("user"),
                                                                    content: title+"~"+stepsID+"~"+ingredientsID+"~"+pictureID,
                                                                    thumbnailURL: link,
                                                                    type: "post"
                                                                })
                                                              }).then(res => res.json())
                                                              .then(async result => {
                                                                  var postId = result.id;
                                                                if (result){
                                                                    console.log(result);
                                                                    await fetch(process.env.REACT_APP_API_PATH+"/post-tags", {
                                                                        method: "POST",
                                                                        headers: {
                                                                          'Content-Type': 'application/json',
                                                                          'Authorization': 'Bearer '+sessionStorage.getItem("token")
                                                                        },
                                                                        body: JSON.stringify({
                                                                            postID: postId,
                                                                            userID: sessionStorage.getItem("user"),
                                                                            name: postTags.join("~"),
                                                                            type: "dietTags"
                                                                        })
                                                                      })
                                                                      .then(res => res.json())
                                                                      .then(async result => {
                                                                        if (result){
                                                                            await fetch(process.env.REACT_APP_API_PATH+"/post-tags", {
                                                                                method: "POST",
                                                                                headers: {
                                                                                  'Content-Type': 'application/json',
                                                                                  'Authorization': 'Bearer '+sessionStorage.getItem("token")
                                                                                },
                                                                                body: JSON.stringify({
                                                                                    postID: postId,
                                                                                    userID: sessionStorage.getItem("user"),
                                                                                    name: calorie.toString(),
                                                                                    type: "calorie"
                                                                                })
                                                                              })
                                                                              .then(result => {
                                                                                  if (result){
                                                                                      setRedirect(true);
                                                                                  }
                                                                              })
                                                                        }
                                                                      })
                                                                }
                                                              })
                                                        }
                                                      },
                                                      error => {
                                                        console.log(error);
                                                      }
                                                    );
                                            }
                                          },
                                          error => {
                                            console.log(error);
                                          }
                                        );
                                }
                              },
                              error => {
                                console.log(error);
                              }
                            );
                    }
                  },
                  error => {
                    console.log(error);
                  }
                );

        }
    }

    const setTagOnKey = (key) => {
        if (key === "Enter"){
            addTag()
        }
    }
    
    if (redirect){
        return <Redirect to="/home"/>
    }
    
    return (
        <div className="createAPostContainer">
            <div className="createForm">
                <button className="backButton backButtonCreate" onClick={e => history.goBack()}>
                    <i className="arrow left"/>
                    Back
                </button>

                <div className="createAPostTitle">
                    <label for="post title" className="titleLabel">Title:</label>
                    <input id="post title" className="titleInput" type="text" value={title} onChange={e => setTitle(e.target.value)}/>
                    {invalidTitle && <p className="errorMessage">A post must have a title!</p>}
                </div>

                <div className="createContent">
                    <div className="createIngredients">
                        <label for="post ingredients" className="textAreaHeader">Ingredients:</label>
                        <button className="addToListButton" onClick={e => addIngredient()}>Add Ingredients</button>
                        <textarea id="post ingredients" className="createTextArea" type="text" value={ingredient} onChange={e => setIngredient(e.target.value)}/>
                        <ul>
                            {ingredients.map(ing => (
                                <li key={ing}>{ing}</li>
                            ))}
                        </ul> 
                        {invalidIngredients && <p className="errorMessage">A post must have at least 1 ingredient!</p>}
                    </div>
                    <div className="createSteps">
                        <label for="post steps" className="textAreaHeader">Steps:</label>
                        <button className="addToListButton" onClick={e => addStep()}>Add Steps</button>
                        <textarea id="post steps" className="createTextArea" type="text" value={step} onChange={e => setStep(e.target.value)}/>
                        <ol>
                            {steps.map(step => (
                                <li key={step}>{step}</li>
                            ))}
                        </ol>
                        {invalidSteps && <p className="errorMessage">A post must have at least 1 step!</p>}
                    </div>
                    <div className="formAddImage">
                        <label for="post image" className="textAreaHeader">Image:</label>
                        <input id="post image" className="addImageButton" type="file" onChange={e => setImage(e.target.value)} accept=".png,.jpg,.jpeg"/>
                        {invalidImage && <p className="errorMessage">A post must have an image!</p>}
                    </div>
                </div>

                <div>
                    <label for="post link" className="linkLabel">Link:</label>
                    <input id="post link" className="linkInput" type="url" value={link} onChange={e => setLink(e.target.value)}/>
                </div>

                <div className="postTagsContainer">
                    <div className="createCalorieContainer">
                        <label for="post calories" className="linkLabel">Calories:</label>
                        <input id="post calories" className="addTagInput" type="number" value={calorie} onChange={e => setCalorie(e.target.value)} step="25" min="0" max="10000"/>
                    </div>
                    <div className="addDietTagsContainer">
                        <label for="post diet tags" className="linkLabel">Add Diet Tags:</label>
                        <input id="post diet tags" className="addTagInput" type="url" value={tag} onChange={e => setTag(e.target.value)} maxLength="14" onKeyPress={e => setTagOnKey(e.key)}/>
                        <button className="addToListButtonTags" onClick={e => addTag()}>Add Tag</button>
                        {postTagLimit && <p className="errorMessage">Only 10 tags are allowed per post.</p>}
                        <div className="displayedPostTags">
                            {postTags.map(tag => (
                                <div key={tag} className="postDietTag">
                                    {tag}
                                    <button className="deleteTag" onClick={e => deleteTag(tag)}>X</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <button className="createButton" onClick={e => createPost()}>Create</button>
            </div>
        </div>
    )
}

export default CreateAPost
