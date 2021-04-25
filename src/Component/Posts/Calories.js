import React from 'react'
import { useState, useEffect } from 'react';

const Calories = ({postID}) => {
    const [calories, setCalories] = useState(0);

    useEffect(() => {
        const getCalories = async () => {
            await fetchCalories()
        }
        getCalories();
    }, [])

    const fetchCalories = async () => {
        fetch(process.env.REACT_APP_API_PATH+"/post-tags?postID="+postID+"&type=calorie", {
            method: "get",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer '+sessionStorage.getItem("token")
            },
      
          })
            .then(res => res.json())
            .then(
              async result => {
                if (result) {
                    if (result[0][0]){
                        setCalories(result[0][0].name);
                    }
                }
              }
            ).catch(error => console.log(error));
    }

    if (calories){
        return (
            <div className="postLinkContainer">
                <label>Calories: {calories}</label>
            </div>
        )
    }else{
        return <div/>
    }
}

export default Calories
