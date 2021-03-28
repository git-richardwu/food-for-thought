import React from 'react';
import { useState, useEffect } from 'react';

const PostProfilePicture = ({id}) => {
    const [src, setSrc] = useState("");

    useEffect(() => {
        const getPicture = async () => {
            const picture = await fetchProfilePicture()
            setSrc(picture)
        }
        getPicture();
    }, [])

    const fetchProfilePicture = async () =>{
        // TODO: profile picture implement needed
        return "";
    }

    if (src){
        <div>
            <button className="profileButton">
                <img src="" alt="profile picture"></img>
            </button>
        </div>
    }else{      
        return (
            <div>
                <button className="profileButton">
                    <img src={src} alt="profile picture"></img>
                </button>
            </div>
    )
    }
}

export default PostProfilePicture
