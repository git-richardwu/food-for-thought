import React from 'react';
import { useState, useEffect } from 'react';
import Post from "./Post.jsx";
import AddPostButton from "../../assets/addPost.svg";
import "./Posts.css"

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [isError, setError] = useState(false);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const getPosts = async () => {
            const posts = await fetchPosts()
            setPosts(posts)
        }
        getPosts();
    }, [])

    const fetchPosts = async () => {
        fetch(process.env.REACT_APP_API_PATH+"/posts?sort=newest", {
          method: "get",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+sessionStorage.getItem("token")
          },
    
        })
          .then(res => res.json())
          .then(
            result => {
              if (result) {
                  console.log(result[0]);
                  setPosts(result[0]);
                  setLoading(false);
              }
            },
            error => {
              console.log(error);
              setError(true);
              return [];
            }
          );
      }

    if (isError) {
        return <div> ERROR loading Posts </div>;
    } else if (isLoading) {
        return <div> Loading... </div>;
    } else if (posts) {
        if (posts.length > 0){
            return (
                <div className="posts">
                    {posts.map(post => (
                        <Post key={post.id} post={post} type="postlist" />
                    ))}
                    <button className="button">
                        <img className="addPostButton" src ={AddPostButton}></img>
                    </button>
                </div>
            );
        }else{
            return (<div> No Posts Found </div>);
        }
    } else {
        return <div> Please Log In... </div>;
    }
}

export default Posts
