import React from 'react'
import {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";
import "./Allergies.css";


const Allergies = () => {
    const [allergies, setAllergies] = useState([]);
    const [allergiesID, setID] = useState(-1);
    const [cornChecked, setCorn] = useState(false)
    const [eggChecked, setEgg] = useState(false)
    const [fishChecked, setFish] = useState(false)
    const [glutenChecked, setGluten] = useState(false)
    const [milkChecked, setMilk] = useState(false)
    const [peanutChecked, setPeanut] = useState(false)
    const [sesameChecked, setSesame] = useState(false)
    const [shellfishChecked, setShellfish] = useState(false)
    const [soyChecked, setSoy] = useState(false)
    const [treeNChecked, setTreeN] = useState(false)
    const [wheatChecked, setWheat] = useState(false)


    const [isRedirect, setIsRedirect] = useState(false) //setting the state to false, initial state

    useEffect(() => {  //this function is called every time the page loads
        const getAllergiesInfo = async () => {
            await fetchAllergiesSetting();
        }
        getAllergiesInfo();
    }, [])

    // function getSelectedCheckboxValues(name) {
    //     const checkboxes = document.querySelectorAll(`input[name="${name}"]:checked`);
    //     let values = [];
    //     checkboxes.forEach((checkbox) => {
    //         values.push(checkbox.value);
    //     });
    //     setAllergies(values); //*where I am working*!!!!
    //     console.log(values);
    //     console.log({allergies})
    // }

    function removeItemAll(arr, value) { //https://stackoverflow.com/questions/5767325/how-can-i-remove-a-specific-item-from-an-array
        var i = 0;
        while (i < arr.length) {
          if (arr[i] === value) {
            arr.splice(i, 1);
          } else {
            ++i;
          }
        }
        return arr;
      }

    const updateCorn = async (value) =>{
        if (value === true){
            var add = allergies
            console.log(allergies)
            add.push("Corn-Free")
            setAllergies(add)
            setCorn(true)
        }  
        else{
            var remove = allergies
            removeItemAll(remove, "Corn-Free")
            setAllergies(remove)
            setCorn(false)
        }
    }
    const updateEgg = async (value) =>{
        if (value === true){
            var add = allergies
            add.push("Egg-Free")
            setAllergies(add)
            setEgg(true)
        }  
        else{
            var remove = allergies
            removeItemAll(remove, "Egg-Free")
            setAllergies(remove)
            setEgg(false)
        }
    }
    const updateFish = async (value) =>{
        if (value === true){
            var add = allergies
            add.push("Fish-Free")
            setAllergies(add)
            setFish(true)
        }  
        else{
            var remove = allergies
            removeItemAll(remove, "Fish-Free")
            setAllergies(remove)
            setFish(false)
        }
    }
    const updateGluten = async (value) =>{
        if (value === true){
            var add = allergies
            add.push("Gluten-Free")
            setAllergies(add)
            setGluten(true)
        }  
        else{
            var remove = allergies
            removeItemAll(remove, "Gluten-Free")
            setAllergies(remove)
            setGluten(false)
        }
    }
    const updateMilk = async (value) =>{
        if (value === true){
            var add = allergies
            add.push("Milk-Free")
            setAllergies(add)
            setMilk(true)
        }  
        else{
            var remove = allergies
            removeItemAll(remove, "Milk-Free")
            setAllergies(remove)
            setMilk(false)
        }
    }
    const updatePeanut = async (value) =>{
        if (value === true){
            var add = allergies
            add.push("Peanut-Free")
            setAllergies(add)
            setPeanut(true)
        }  
        else{
            var remove = allergies
            removeItemAll(remove, "Peanut-Free")
            setAllergies(remove)
            setPeanut(false)
        }
    }
    const updateSesame = async (value) =>{
        if (value === true){
            var add = allergies
            add.push("Sesame-Free")
            setAllergies(add)
            setSesame(true)
        }  
        else{
            var remove = allergies
            removeItemAll(remove, "Sesame-Free")
            setAllergies(remove)
            setSesame(false)
        }
    }
    const updateShellfish = async (value) =>{
        if (value === true){
            var add = allergies
            add.push("Shellfish-Free")
            setAllergies(add)
            setShellfish(true)
        }  
        else{
            var remove = allergies
            removeItemAll(remove, "Shellfish-Free")
            setAllergies(remove)
            setShellfish(false)
        }
    }
    const updateSoy = async (value) =>{
        if (value === true){
            var add = allergies
            add.push("Soy-Free")
            setAllergies(add)
            setSoy(true)
        }  
        else{
            var remove = allergies
            removeItemAll(remove, "Soy-Free")
            setAllergies(remove)
            setSoy(false)
        }
    }
    const updateTreeN = async (value) =>{
        if (value === true){
            var add = allergies
            add.push("TreeNut-Free")
            setAllergies(add)
            setTreeN(true)
        }  
        else{
            var remove = allergies
            removeItemAll(remove, "TreeNut-Free")
            setAllergies(remove)
            setTreeN(false)
        }
    }
    const updateWheat = async (value) =>{
        if (value === true){
            var add = allergies
            add.push("Wheat-Free")
            setAllergies(add)
            setWheat(true)
        }  
        else{
            var remove = allergies
            removeItemAll(remove, "Wheat-Free")
            setAllergies(remove)
            setWheat(false)
        }
    }

    const fetchAllergiesSetting = async () => {
        var url = process.env.REACT_APP_API_PATH+"/user-preferences?name=allergies&userID="+sessionStorage.getItem("user");
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
                        setAllergies(result[0][0].value.split("~"));
                        console.log(allergies)
                        if(hold.includes("Corn-Free")){
                            setCorn(true)
                        }
                        if(hold.includes("Egg-Free")){
                            setEgg(true)
                        }
                        if(hold.includes("Fish-Free")){
                            setFish(true)
                        }
                        if(hold.includes("Gluten-Free")){
                            setGluten(true)
                        }
                        if(hold.includes("Milk-Free")){
                            setMilk(true)
                        }
                        if(hold.includes("Peanut-Free")){
                            setPeanut(true)
                        }
                        if(hold.includes("Sesame-Free")){
                            setSesame(true)
                        }
                        if(hold.includes("Shellfish-Free")){
                            setShellfish(true)
                        }
                        if(hold.includes("Soy-Free")){
                            setSoy(true)
                        }
                        if(hold.includes("TreeNut-Free")){
                            setTreeN(true)
                        }
                        if(hold.includes("Wheat-Free")){
                            setWheat(true)
                        }
 
        
                        console.log(result)
                    }
                }
            },
            error => {
              console.log(error);
            }
          );
      }


    const updateAllergies = async (value,corn,egg,fish,gluten,milk,peanut,sesame,shellfish,soy, treeN, wheat) => { //decide if it's patch or post based on ID 
        allergiesID != -1
            ? patchAllergies(value,corn,egg,fish,gluten,milk,peanut,sesame,shellfish,soy, treeN, wheat) //updates or modifies artifacts, if this statement is true (something is there)
            : postAllergies(value,corn,egg,fish,gluten,milk,peanut,sesame,shellfish,soy, treeN, wheat); //creates a new user artifact, if this statement is false(nothing is there)
    }

    const patchAllergies = async (value,corn,egg,fish,gluten,milk,peanut,sesame,shellfish,soy, treeN, wheat) => {
        console.log(value)
        var url = process.env.REACT_APP_API_PATH+"/user-preferences/"+allergiesID
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
                    setAllergies(value);
                    setIsRedirect(true);
                }
            },
            error => {
                console.log(error);
            }
            );
        }

    const postAllergies = async (value,corn,egg,fish,gluten,milk,peanut,sesame,shellfish,soy, treeN, wheat) => {
        var url = process.env.REACT_APP_API_PATH+"/user-preferences";
        fetch(url, {
            method: "POST",
            headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+sessionStorage.getItem("token")
            },                                                       
            body: JSON.stringify({
                userID: sessionStorage.getItem("user"),
                name: "allergies",
                value: value.join("~")
                //body of the JSON request
            })

            })
            .then(res => res.json())
            .then(
            result => { 
                if (result) { //if you get something back ("result") then you set the value to what you get
                    setAllergies(value);
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
                <div className="allergy-choices">
                    <fieldset>
                    <legend className="legend">Please check off items and then click submit to save!</legend>
                        <label class="container"> Corn-Free
                            <input type="checkbox" name="allergen"  value="Corn-Free" onChange={e => updateCorn(!cornChecked)} checked={cornChecked} ></input>
                            <span class="checkmark"></span>
                        </label>
                        <label class="container">Egg-Free
                        <input type="checkbox" name="allergen"  value="Egg-Free" onChange={e => updateEgg(!eggChecked)} checked={eggChecked} ></input>
                            <span class="checkmark" ></span>
                        </label>
                        <label class="container"> Fish-Free
                            <input type="checkbox" name="allergen"  value="Fish-Free" onChange={e => updateFish(!fishChecked)} checked={fishChecked} ></input>
                            <span class="checkmark"></span>
                        </label>
                        <label class="container"> Gluten-Free
                            <input type="checkbox" name="allergen"  value="Gluten-Free" onChange={e => updateGluten(!glutenChecked)} checked={glutenChecked} ></input>                            
                            <span class="checkmark"></span>
                        </label>
                        <label class="container">Milk-Free
                            <input type="checkbox" name="allergen"  value="Milk-Free" onChange={e => updateMilk(!milkChecked)} checked={milkChecked} ></input>
                            <span class="checkmark"></span>
                        </label>
                        <label class="container"> Peanut-Free
                            <input type="checkbox" name="allergen"  value="Peanut-Free" onChange={e => updatePeanut(!peanutChecked)} checked={peanutChecked}></input>
                            <span class="checkmark"></span>
                        </label>
                        <label class="container"> Sesame-Free
                            <input type="checkbox" name="allergen"  value="Sesame-Free" onChange={e => updateSesame(!sesameChecked)} checked={sesameChecked}></input>
                            <span class="checkmark"></span>
                        </label>
                        <label class="container"> Shellfish-Free
                            <input type="checkbox" name="allergen"  value="Shellfish-Free" onChange={e => updateShellfish(!shellfishChecked)} checked={shellfishChecked} ></input>
                            <span class="checkmark"></span>
                        </label>
                        <label class="container"> Soy-Free
                            <input type="checkbox" name="allergen"  value="Soy-Free" onChange={e => updateSoy(!soyChecked)} checked={soyChecked}></input>
                            <span class="checkmark"></span>
                        </label>
                        <label class="container">Tree Nut-Free
                            <input type="checkbox" name="allergen"  value="TreeNut-Free" onChange={e => updateTreeN(!treeNChecked)} checked={treeNChecked} ></input>
                            <span class="checkmark"></span>
                        </label>
                        <label class="container">Wheat-Free
                            <input type="checkbox" name="allergen"  value="Wheat-Free" onChange={e => updateWheat(!wheatChecked)} checked={wheatChecked} ></input>
                            <span class="checkmark"></span>
                        </label>
                        
                    </fieldset>
                    </div>
                <button id="btn" onClick={() => updateAllergies(allergies,cornChecked,eggChecked,fishChecked,glutenChecked,milkChecked,peanutChecked,sesameChecked,shellfishChecked,soyChecked, treeNChecked, wheatChecked)}>Submit</button>
            </div>
        );
        
        }
    }

export default Allergies
