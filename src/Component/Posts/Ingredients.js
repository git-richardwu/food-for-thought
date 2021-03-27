import React from 'react';
import { useState, useEffect } from 'react';

const Ingredients = ({id}) => {
    const [ingredeints, setIngredients] = useState([]);

    useEffect(() => {
        const getIngredients = async () => {
            const ingredeints = await getIngredientsForPost()
            setIngredients(ingredeints)
        }
        getIngredients();
    }, [])

    const getIngredientsForPost = async () => {
        if (id === "-1"){
            setIngredients([]);
        }else{
          fetch(process.env.REACT_APP_API_PATH+"/user-artifacts/"+id,{
              method:"GET",
              headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+sessionStorage.getItem("token")
              }
            }).then(res => res.json())
              .then(result=>{
                  if (result){
                      setIngredients(result.type.split("~"));
                  }
              })
              .catch(error => {
                  console.log(error);
                  setIngredients([])
              });
        }
    }

    if (ingredeints){
        return (
            <div className="ingredients">
                <p className="subHeader">Ingredients:</p>
                <ul>
                    {ingredeints.length != 0 && ingredeints.map(ing => (
                        <li>{ing}</li>
                    ))}
                </ul>
            </div>
        )
    }else{
        return (
            <div>
            </div>
        )
    }

}

export default Ingredients
