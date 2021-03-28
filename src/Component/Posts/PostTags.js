import React from 'react'
import { useState, useEffect } from 'react';

const PostTags = ({postID}) => {
    const [dietTags, setTags] = useState([]);

    useEffect(() => {
        const getTags = async () => {
            const tags = await fetchTags()
            setTags(tags)
        }
        getTags();
    }, [])

    const fetchTags = async () => {
        fetch(process.env.REACT_APP_API_PATH+"/post-tags?postID="+postID+"&type=dietTags", {
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
                        setTags(result[0][0].name.split("~"));
                    }
                }
              },
              error => {
                console.log(error);
                setTags([]);
              }
            );
    }

    if (dietTags){
        return (
            <div className="postTagsContainer">
                {dietTags.map(tag => (
                    <div key={tag} className="postDietTag">
                        {tag}
                    </div>
                ))}
            </div>
        )
    }else{
        return <div/>
    }
}

export default PostTags
