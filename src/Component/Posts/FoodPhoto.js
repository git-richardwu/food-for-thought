import React from 'react';
import { useState, useEffect } from 'react';

const FoodPhoto = ({id}) => {
    const [foodPhoto, setFoodPhoto] = useState("");

    useEffect(() => {
        const getFoodPhoto = async () => {
            const foodPhoto = await fetchFoodPhoto()
            setFoodPhoto(foodPhoto)
        }
        getFoodPhoto();
    }, [])

    const fetchFoodPhoto = async () => {
        if (id === "-1"){
            setFoodPhoto("");
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
                      if (process.env.REACT_APP_API_PATH.includes("localhost")){
                        setFoodPhoto("http://localhost:3001/"+result.url);
                      }else{
                        setFoodPhoto("https://webdev.cse.buffalo.edu/"+result.url);
                      }
                  }
              })
              .catch(error => {
                  console.log(error);
                  setFoodPhoto("")
              });
        }
    }

    if (foodPhoto){
        return (
            <div className="postImageContainer">
                <img className="postImage" src={foodPhoto} alt="Food"/>
            </div>
        )
    }else{
        return (
            <div>
            </div>
        )
    }

}

export default FoodPhoto
