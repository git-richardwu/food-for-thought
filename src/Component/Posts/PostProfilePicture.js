import React from 'react';
import { useState, useEffect } from 'react';

const PostProfilePicture = ({id}) => {
    const [src, setSrc] = useState("");

    useEffect(() => {
        const getPicture = async () => {
            await fetchProfilePicture();
        }
        getPicture();
    }, [])

    const fetchProfilePicture = async () =>{
        fetch(process.env.REACT_APP_API_PATH+"/user-artifacts?category=profilePicDisplay&ownerID="+id, {
            method: "GET",
              headers: new Headers({
                'Content-Type': 'application/json',
              }),
          })
          .then(response => response.json())
          .then(result => {
                if(result[1] == 0){
                    setSrc("https://i.redd.it/32ztztrp4m541.jpg")
                }
                else {
                    if (result[0][0].url.includes("http")){
                        // backwards compatability
                        setSrc(result[0][0].url);
                    }
                    else if (process.env.REACT_APP_API_PATH.includes("localhost")){
                        setSrc("http://localhost:3001"+result[0][0].url);
                    }else{
                        setSrc("https://webdev.cse.buffalo.edu"+result[0][0].url);
                    }
                }
          }).catch(error => console.log(error));
    }

    if (src){
        return (
            <div>
                <img className="profileButton" src={src} alt="profile picture"></img>
            </div>
        )
    }
    else{
        return (
            <div/>
        )
    }
}

export default PostProfilePicture
