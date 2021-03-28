import React from 'react';

import { useState, useEffect } from 'react';
import "./Posts.css";
import "./CreateAPost.css"
import { BrowserRouter as Router, Redirect, Route, Switch, Link, useHistory} from "react-router-dom";

const CreateAPost = () => {
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
    const fileField = document.querySelector('input[type="file"]');
    const history = useHistory()

    const addStep = () => {
        if (step != ""){
            var add = steps;
            add.push(step);
            setSteps(add);
            setStep("");
        }
    }

    const addIngredient = () => {
        if (ingredient != ""){
            var add = ingredients;
            add.push(ingredient);
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
            }else{
                alert("Only 10 tags are allowed per post.")
            }
        }
    }

    const deleteTag = (tagID) => {
        setPostTags(postTags.filter(x => x != tagID));
    }

    const validatePost = () => {
        var message = "";
        if (title.length == 0){
            message += "A post must a title!\n";
        }
        if (steps.length == 0){
            message += "A post must have at least 1 steps!\n";
        }
        if (ingredients.length == 0){
            message += "A post must have at least 1 ingredient!\n";
        }
        if (image.length == 0){
            message += "A post must have an image!\n";
        }

        if (message.length == 0){
            return true;
        }else{
            alert("ERROR(S):\n" + message);
            return false;
        }
    }

    const createPost = async () => {
        if (validatePost()){
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
                                                              .then(result => {
                                                                if (result){
                                                                    console.log(result);
                                                                    fetch(process.env.REACT_APP_API_PATH+"/post-tags", {
                                                                        method: "POST",
                                                                        headers: {
                                                                          'Content-Type': 'application/json',
                                                                          'Authorization': 'Bearer '+sessionStorage.getItem("token")
                                                                        },
                                                                        body: JSON.stringify({
                                                                            postID: result.id,
                                                                            userID: sessionStorage.getItem("user"),
                                                                            name: postTags.join("~"),
                                                                            type: "dietTags"
                                                                        })
                                                                      })
                                                                      .then(result => {
                                                                        if (result){
                                                                            setRedirect(true)
                                                                        }
                                                                      })
                                                                    setRedirect(true)
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
                    <label className="titleLabel">Title:</label>
                    <input className="titleInput" type="text" value={title} onChange={e => setTitle(e.target.value)}/>
                </div>

                <div className="createContent">
                    <div className="createIngredients">
                        <label className="textAreaHeader">Ingredients:</label>
                        <button className="addToListButton" onClick={e => addIngredient()}>Add Ingredient</button>
                        <textarea className="createTextArea" type="text" value={ingredient} onChange={e => setIngredient(e.target.value)}/>
                        <ul>
                            {ingredients.map(ing => (
                                <li key={ing}>{ing}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="createSteps">
                        <label className="textAreaHeader">Steps:</label>
                        <button className="addToListButton" onClick={e => addStep()}>Add Step</button>
                        <textarea className="createTextArea" type="text" value={step} onChange={e => setStep(e.target.value)}/>
                        <ol>
                            {steps.map(step => (
                                <li key={step}>{step}</li>
                            ))}
                        </ol>
                    </div>
                    <div className="formAddImage">
                        <label className="textAreaHeader">Image:</label>
                        <input className="addImageButton" type="file" onChange={e => setImage(e.target.value)} accept=".png,.jpg,.jpeg"/>
                    </div>
                </div>

                <div>
                    <label className="linkLabel">Link:</label>
                    <input className="linkInput" type="url" value={link} onChange={e => setLink(e.target.value)}/>
                </div>

                <div>
                    <label className="linkLabel">Add Diet Tags:</label>
                    <input className="addTagInput" type="url" value={tag} onChange={e => setTag(e.target.value)} maxLength="16"/>
                    <button className="addToListButtonTags" onClick={e => addTag()}>Add Tag</button>
                    <div className="postTagsContainer">
                        {postTags.map(tag => (
                            <div key={tag} className="postDietTag">
                                {tag}
                                <button className="deleteTag" onClick={e => deleteTag(tag)}>x</button>
                            </div>
                        ))}
                    </div>
                </div>

                <button className="createButton" onClick={e => createPost()}>Create</button>
            </div>
        </div>
    )
}

export default CreateAPost
