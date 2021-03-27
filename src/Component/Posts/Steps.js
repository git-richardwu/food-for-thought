import React from 'react';
import { useState, useEffect } from 'react';
import "./Posts.css"

const Steps = ({id}) => {
    const [steps, setSteps] = useState([]);

    useEffect(() => {
        const getSteps = async () => {
            const steps = await getIngredientsForPost()
            setSteps(steps)
        }
        getSteps();
    }, [])

    const getIngredientsForPost = async () => {
        if (id === "-1"){
            setSteps([]);
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
                    setSteps(result.type.split("~"));
                  }
              })
              .catch(error => {
                  console.log(error);
                  setSteps([])
              });
        }
    }

    if (steps){
        return (
            <div className="steps">
                <p className="subHeader">Steps:</p>
                <ol>
                    {steps.length != 0 && steps.map(step => (
                        <li>{step}</li>
                    ))}
                </ol>
            </div>
        )
    }else{
        return (
            <div>
            </div>
        )
    }

}

export default Steps