import React from 'react';
import { useState, useEffect } from 'react';
import Post from "./Post.jsx";
import "./Posts.css";

const Posts = ({userId}) => {
    const [posts, setPosts] = useState([]);
    const [isError, setError] = useState(false);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const getPosts = async () => {
            await fetchPosts();
        }
        getPosts();
    }, [userId])
    
    const fetchPosts = async () => {
        var url = process.env.REACT_APP_API_PATH+"/posts?sort=newest&parentID=";
        if (userId){
            url += "&authorID="+userId;
        }
        fetch(url, {
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

    const deletePost = async (postID, postContent) => {
        var dialogResult = window.confirm("Are you sure you want to delete this post? This is irreverisible!");
        if (dialogResult){
            var ids = postContent.split("~")
            fetch(process.env.REACT_APP_API_PATH+"/user-artifacts/"+ids[1], {
                method: "DELETE",
                headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+sessionStorage.getItem("token")
                }
                });
            fetch(process.env.REACT_APP_API_PATH+"/user-artifacts/"+ids[2], {
                method: "DELETE",
                headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+sessionStorage.getItem("token")
                }
                });
            fetch(process.env.REACT_APP_API_PATH+"/user-artifacts/"+ids[3], {
                method: "DELETE",
                headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+sessionStorage.getItem("token")
                }
                });
            //make the api call to post
            fetch(process.env.REACT_APP_API_PATH+"/posts/"+postID, {
                method: "DELETE",
                headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+sessionStorage.getItem("token")
                }
                })
                .then(
                    result => {
                        setPosts(posts.filter((post) => post.id != postID ));
                    },
                    error => {
                        alert("error!"+error);
                    }
                    );
        }
     
      }

    if (isError) {
        return <div> ERROR loading Posts </div>;
    } else if (isLoading) {
        return <div> Loading... </div>;
    } else if (posts) {
        if (posts.length > 0){
            if (userId){
                return (
                    <div className="postsProfilePage">
                        {posts.map(post => (
                            <Post key={post.id} post={post} type="postlist" deletePost={deletePost} />
                        ))}
                    </div>
                );
            }else{
                return (
                    <div className="posts">
                        {posts.map(post => (
                            <Post key={post.id} post={post} type="postlist" deletePost={deletePost} />
                        ))}
                    </div>
                );
            }
        }else{
            return (<div> No Posts Found </div>);
        }
    } else {
        return <div> Please Log In... </div>;
    }
}

export default Posts
