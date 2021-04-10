import React from 'react';
import { useState, useEffect } from 'react';
import Post from "./Post.jsx";
import SearchBar from "./SearchBar"
import "./Posts.css";

const Posts = ({userId}) => {
    const [posts, setPosts] = useState([]);
    const [isError, setError] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [showSearchBar, setShowSearchBar] = useState(true); // used if we decide to toggle search bar

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
            async result => {
              if (result) {
                  if (userId){
                    setPosts(result[0]);
                  }else{
                    await setPostsForHomepage(result[0]);
                  }
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
    
     function resharePost (postid, parentID, text, authorID) {

        //keep the form from actually submitting via HTML - we want to handle it in react
        // event.preventDefault();
        console.log("THIS IS THE POST ID:"+  postid)
        console.log("THIS IS THE Parent ID:"+  parentID)
        // return;
        //make the api call to post
        fetch(process.env.REACT_APP_API_PATH+"/posts", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+sessionStorage.getItem("token")
          },
          body: JSON.stringify({
            parentID: parentID,
            content: text,
            type: "repost",
            thumbnailURL: "",
            authorID: sessionStorage.getItem("user"),
    
          })
        })
          .then(res => res.json())
          .then(
            result => {
              console.log("made it this far2");
              // once a post is complete, reload the feed
             fetchPosts()
            },
            error => {
              console.log("made it this far3");
    
              // alert("error!");
              alert(error)
            }
          );
      
    
    }

    const setPostsForHomepage = async (allPosts) => {
        var postsToAdd = [];
        for (var i = 0; i < allPosts.length; i++){
            if (allPosts[i].author.id.toString() === sessionStorage.getItem("user")){
                // add own posts
                postsToAdd.push(allPosts[i]);
            }else{
                if (await isFollowing(allPosts[i].author.id) === true){
                    if (await isPrivate(allPosts[i].author.id) === true){
                        if (await isFollower(allPosts[i].author.id) === true){
                            if (await isnotBlocking(allPosts[i].author.id) === true) {
                                // isnotblocking === true means not blocking and vice versa
                                // add if you follow author, author follows you, and author is private
                            postsToAdd.push(allPosts[i]);
                            }
                        }
                    }else{
                        if (await isnotBlocking(allPosts[i].author.id) === true) {
                            // isnotblocking === true means not blocking and vice versa
                            // add post if following and author is not private
                            postsToAdd.push(allPosts[i]);
                        }
                    }
                }
            }
        }

        setPosts(postsToAdd);
    }

    async function isFollowing(connectedUserID) {
        var retVal = false;
        var url = process.env.REACT_APP_API_PATH+"/connections?userID="+sessionStorage.getItem("user")
            +"&connectedUserID="+connectedUserID;
        await fetch(url, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+sessionStorage.getItem("token")
          },
    
        })
          .then(res => res.json())
          .then(
            result => {
              if (result) {
                  if (result[1] > 0){
                      if (result[0][0].type === "block"){
                          retVal = false;
                      }else{
                        retVal = true;
                      }
                  }else{
                      retVal = false;
                  }
              }
            },
            error => {
                console.log(error);
                retVal = false;
            }
          );
        
          return retVal;
    }
    async function isnotBlocking(connectedUserID) {
        var retVal = false;
        var url = process.env.REACT_APP_API_PATH+"/connections?type=block&userID="+sessionStorage.getItem("user")
            +"&connectedUserID="+connectedUserID;
        await fetch(url, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+sessionStorage.getItem("token")
          },
    
        })
          .then(res => res.json())
          .then(
            result => {
              if (result) {
                  if (result[1] > 0){
                    //   if (result[0][0].type === "block"){
                    //       retVal = false;
                    //   }else{
                        retVal = false;
                    //   }
                  }else{
                      retVal = true;
                  }
              }
            },
            error => {
                console.log(error);
                retVal = false;
            }
          );
        
          return retVal;
    }

    async function isFollower(userId) {
        var retVal = false;
        var url = process.env.REACT_APP_API_PATH+"/connections?connectedUserID="+sessionStorage.getItem("user")
            +"&userID="+userId;
        await fetch(url, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+sessionStorage.getItem("token")
          },
    
        })
          .then(res => res.json())
          .then(
            result => {
                if (result) {
                    if (result[1] > 0){
                        if (result[0][0].type === 'block'){
                            retVal = false;
                        }else{
                            retVal = true;
                        }
                    }else{
                        retVal = false;
                    }
                }
            },
            error => {
                console.log(error);
            }
          );
        return retVal;
    }

    async function isPrivate(userId) {
        var retVal = false;
        var url = process.env.REACT_APP_API_PATH+"/user-preferences?name=privacy&userID="+userId;
        await fetch(url, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+sessionStorage.getItem("token")
          },
    
        })
           .then(res => res.json())
           .then(
            result => {
                if (result) {
                    if (result[1] === 0){
                        retVal = false;
                    }else{
                        retVal = (result[0][0].value === "true");
                    }
                }
            },
            error => {
              console.log(error);
              retVal = false;
            }
          );
        return retVal;
      }

    const deletePost = async (postID, postContent, type) => {
        var dialogResult = window.confirm("Are you sure you want to delete this post? This is irreverisible!");
        if (dialogResult){
            var ids = postContent.split("~");
            if (type !== "repost"){
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
            }
            
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

    const searchPosts = async (searchText, useTitle, useTags, useCalorie) => {
        if (searchText === ""){
            await fetchPosts();
        }else{
            var allPosts = await fetchAllPosts();
            var filteredPosts = [];
            for (var i = 0; i < allPosts.length; i++){
                if (useTitle && allPosts[i].content.toLowerCase().includes(searchText)){
                    console.log(allPosts[i]);
                    filteredPosts.push(allPosts[i]);
                    continue;
                }
    
                if (useTags){
                    var tags = await getPostDietTag(allPosts[i].id);
                    if (tags.includes(searchText)){
                        filteredPosts.push(allPosts[i]);                    
                        continue;
                    }
                }
    
                if (useCalorie && allPosts[i].content.includes(searchText)){
                    var calorie = await getPostCalorieTag(allPosts[i].id);
                    var searchCalorie = parseInt(searchText);
                    if (searchCalorie != NaN && ((searchCalorie - calorie) <= 100)){
                        filteredPosts.push(allPosts[i]);
                        continue;
                    }
                }
            }
    
            setPosts(filteredPosts);
        }

    }

    async function fetchAllPosts() {
        var posts = [];
        var url = process.env.REACT_APP_API_PATH+"/posts?sort=newest&parentID=";
        await fetch(url, {
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
                  posts = result[0];
              }
            }
          );

        return posts;
    }

    async function getPostCalorieTag(id) {
        var calorie = 0;
        await fetch(process.env.REACT_APP_API_PATH+"/post-tags?postID="+id+"&type=calorie", {
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
                        calorie = parseInt(result[0][0].name);
                    }
                }
              },
              error => {
                console.log(error);
              }
            );

        return calorie;
    }

    async function getPostDietTag(id) {
        var dietTags = "";
        await fetch(process.env.REACT_APP_API_PATH+"/post-tags?postID="+id+"&type=dietTags", {
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
                        dietTags = result[0][0].name;
                    }
                }
              },
              error => {
                console.log(error);
              }
            );

        return dietTags.toLowerCase();
    }

    if (isError) {
        return (
            <div className="postsOuter"> 
                <SearchBar searchPosts={searchPosts}/> <br/>
                <div className="posts">
                    <p>Error Loading Posts</p> 
                </div>
            </div>
        );
    } else if (isLoading) {
        return (
            <div className="postsOuter"> 
                <SearchBar searchPosts={searchPosts}/> <br/>
                <div className="posts">
                    <p>Loading...</p> 
                </div>
            </div>
        );
    } else if (posts) {
        if (posts.length > 0){
            if (userId){
                return (
                    <div className="postsProfilePage">
                        {posts.map(post => (
                            <Post key={post.id} post={post} type="postlist" deletePost={deletePost} resharePost={resharePost} />
                        ))}
                    </div>
                );
            }else{
                return (
                    <div className="postsOuter">
                        {showSearchBar && <SearchBar searchPosts={searchPosts}/>}
                        <div className="posts">
                            {posts.map(post => (
                                <Post key={post.id} post={post} type="postlist" deletePost={deletePost} resharePost={resharePost} />
                            ))}
                        </div>
                    </div>
                );
            }
        }else{
            if (userId){
                return (
                    <div className="postsOuter"> 
                        <div className="posts">
                            <p>No Posts Found</p> 
                        </div>
                    </div>
                );
            }
            return (
                <div className="postsOuter"> 
                    <SearchBar searchPosts={searchPosts}/> <br/>
                    <div className="posts">
                        <p>No Posts Found</p> 
                    </div>
                </div>
            );
        }
    } else {
        return <div> Please Log In... </div>;
    }
}

export default Posts
