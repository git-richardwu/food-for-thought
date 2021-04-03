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
                    setSrc(result[0][0].url)
                }
          })
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
