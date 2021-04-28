import React from 'react';
import { useState, useEffect } from 'react';
import Post from "./Post.jsx";
import SearchBar from "./SearchBar";
import Modal from "../Modal.jsx";

import "./Posts.css";

const Posts = ({userId}) => {
    const [posts, setPosts] = useState([]);
    const [isError, setError] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [showSearchBar, setShowSearchBar] = useState(true); // used if we decide to toggle search bar

    // copied from diet.js
    const [dietTags, setDietTags] = useState([]);
    const [tags, setDTags] = useState("");
    const [dietTagsID, setID] = useState(-1)
    const [showModal, updateModal] = useState(false);

    useEffect(() => {
        const getPosts = async () => {
            await fetchPosts();
            await fetchDietTags();
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
              // once a post is complete, reload the feed
             fetchPosts()
            }
          ).catch(error => console.log(error));
      
    
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
        var ids = postContent.split("~");
        if (type !== "repost"){
            fetch(process.env.REACT_APP_API_PATH+"/user-artifacts/"+ids[1], {
                method: "DELETE",
                headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+sessionStorage.getItem("token")
                }
                }).catch(error => console.log(error));;
            fetch(process.env.REACT_APP_API_PATH+"/user-artifacts/"+ids[2], {
                method: "DELETE",
                headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+sessionStorage.getItem("token")
                }
                }).catch(error => console.log(error));;
            fetch(process.env.REACT_APP_API_PATH+"/user-artifacts/"+ids[3], {
                method: "DELETE",
                headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+sessionStorage.getItem("token")
                }
                }).catch(error => console.log(error));;
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
                }
                ).catch(error => console.log(error));
      }

    const searchPosts = async (searchText, useTitle, useTags, useCalorie) => {
        if (searchText === ""){
            await fetchPosts();
        }else{
            var allPosts = await fetchAllPosts();
            var filteredPosts = [];
            for (var i = 0; i < allPosts.length; i++){
                if (useTitle && allPosts[i].content.split("~")[0].toLowerCase().includes(searchText)){
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
    
                if (useCalorie){
                    var calorie = await getPostCalorieTag(allPosts[i].id);
                    var searchCalorie = parseInt(searchText);
                    if (searchCalorie != NaN && (Math.abs(searchCalorie - calorie) <= 100)){
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
          ).catch(error => console.log(error));

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

    // used Fisher-Yates Modern Algorithm: https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    const shuffle = () => {
        var shuffledPosts = posts.slice();
        for (var i = shuffledPosts.length - 1; i > 0; i--){
            var j = Math.floor(Math.random() * i);
            console.log(i);
            console.log(j);
            var temp = shuffledPosts[i];
            shuffledPosts[i] = shuffledPosts[j];
            shuffledPosts[j] = temp;
        }

        setPosts(shuffledPosts);
    }
    // copied from diet.js
    const fetchDietTags = async () => {
        var url = process.env.REACT_APP_API_PATH+"/user-preferences?name=dietTags&userID="+sessionStorage.getItem("user");
        fetch(url, {
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
                    if (result[1] === 0){ // index 1 == length, index 0 ==content
                        setID(-1); //if there is nothing there setID to -1 

                    }else{
                        setID(result[0][0].id); //an array of arrays
                        setDietTags(result[0][0].value.split("~"));
                        console.log(dietTags, "DIET TAGS")
                    }
                    console.log(result, "RESULT")
                }
            },
            error => {
              console.log(error);
            }
        );
    }

    const preferredTags = () => {
        var preferredPosts = posts.slice();
        console.log(preferredPosts, "PREFERRED POSTS");
        // var postsToAdd = [];
        var postdietTags = [];
        var dietTagfilters = [];

        // get post tags of all existing posts
        fetch(process.env.REACT_APP_API_PATH+"/post-tags?type=dietTags", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+sessionStorage.getItem("token")
            }
        }).then(res => res.json())
        .then(
            result => {
                if (result) {
                    console.log(result[0]);
                    postdietTags = result[0];
                    
                    fetch(process.env.REACT_APP_API_PATH+"/user-preferences/"+dietTagsID, {
                        method: "GET",
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer '+sessionStorage.getItem("token")
                        }
                    }).then(res => res.json())
                    .then(
                    result => {
                        if (result) {
                            console.log(result);
                            if (result.value !== ""){
                                dietTagfilters = result.value.split("~");
                                console.log(dietTagfilters, "DIET TAG FILTERS")
                                console.log(postdietTags, "POST DIET TAGS")

                                var prioritizedpost = [];

                                // console.log(postdietTags, "POST DIET TAGS")
                                
                                for (var i=0; i < postdietTags.length; i++){
                                    var included = false;
                                    // var currentposttaglist = postdietTags[i].name.split("~")
                        
                                    for (var j=0; j < dietTagfilters.length; j++){
                                        if (dietTagfilters[j] !== ""){
                                            if ((postdietTags[i].name).includes(dietTagfilters[j])){
                                            included = true;
                                            }
                                        }
                                    }
                        
                                    // if dietTagfilter includes the diet tag that is associated with a post
                                    if (included == true) {
                        
                                        if (!prioritizedpost.includes(postdietTags[i].post)) {
                                            // if it is associated and not exiting in prioritized list, 
                                            // add the id of the post that has the diet tag
                                            prioritizedpost.push(postdietTags[i].post.id.toString());
                                        } 
                                    }
                                }
                        
                                console.log(prioritizedpost, "PRIORITIZED POST");

                                var topallPosts = [];
                                var normalAllPosts = [];
                                // fetch the tags for a specific person from their post-tag connection/user-artifacts
                                for (var i=0; i <preferredPosts.length; i++){
                                    if (prioritizedpost.includes(preferredPosts[i].id.toString())) {
                                        // push post to list that will show on top of page
                                        topallPosts.push(preferredPosts[i]);
                                    }
                                    else {
                                        // push post to normal list
                                        normalAllPosts.push(preferredPosts[i])
                                    }
                                }
                                
                                // concatenate normalAllPosts + topallposts
                                // var allPosts = normalAllPosts.concat(topallPosts);
                                // var allPosts = topallPosts.concat(normalAllPosts);
                                // // }
                                // setPosts(allPosts)
                                console.log(topallPosts, "TOP ALL POSTS")
                                if (topallPosts.length > 0){
                                    var allPosts = topallPosts.concat(normalAllPosts);
                                    // }
                                    setPosts(allPosts)
                                }
                                else{
                                    // switch to modal later
                                    // alert("None of the posts have a preferred tag!")
                                    updateModal(!showModal)
                                }
                            }

                            else{
                                // switch to modal later
                                // alert("You have no preferred diet tags set!")
                                updateModal(!showModal)
                                // dietTagfilters = [result.value];
                                // console.log(dietTagfilters, "DIET TAG FILTERS")
                                // console.log(postdietTags, "POST DIET TAGS")

                            }
                        }
                    })
                }
            }
        )
    }



    if (isError) {
        return (
            <div className="postsOuter"> 
                <SearchBar searchPosts={searchPosts} shuffle={shuffle} preferredTags={preferredTags}/> <br/>
                <div className="posts">
                    <p>Error Loading Posts</p> 
                </div>
                <Modal show={showModal} onClose={e => updateModal(!showModal)}>
                    <div className="modal-header">
                        <h2 className="modal-header-text">Error</h2>
                    </div>
                    <div className="modal-body">
                        <div className="modalMessage">Sorry, we are unable to find any posts on the current listing that have your preferred diet tags or similar! </div>
                        <div className="modalMessage">Please add a diet tag under Diets in the Preferences settings if you have not set any preferred diet tags and try again! </div>
                    </div>
                    <div className="modal-footer">
                        <button className="yesButton" onClick={e => updateModal(!showModal)}>OK</button>
                    </div>
                </Modal>
            </div>
        );
    } else if (isLoading) {
        return (
            <div className="postsOuter"> 
                <SearchBar searchPosts={searchPosts} shuffle={shuffle} preferredTags={preferredTags}/> <br/>
                <div className="posts">
                    <p>Loading...</p> 
                </div>
                <Modal show={showModal} onClose={e => updateModal(!showModal)}>
                    <div className="modal-header">
                        <h2 className="modal-header-text">Error</h2>
                    </div>
                    <div className="modal-body">
                        <p className="modalMessage">The posts are currently loading, please try again once the posts load!</p>
                    </div>
                    <div className="modal-footer">
                        <button className="yesButton" onClick={e => updateModal(!showModal)}>OK</button>
                    </div> 
                </Modal>
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
                        {showSearchBar && <SearchBar searchPosts={searchPosts} shuffle={shuffle} preferredTags={preferredTags}/>}
                        <div className="posts">
                            {posts.map(post => (
                                <Post key={post.id} post={post} type="postlist" deletePost={deletePost} resharePost={resharePost} />
                            ))}
                        </div>
                        <Modal show={showModal} onClose={e => updateModal(!showModal)}>
                            <div className="modal-header">
                                <h2 className="modal-header-text">Error</h2>
                            </div>
                            <div className="modal-body">
                                <div className="modalMessage">Sorry, we are unable to find any posts on the current listing that have your preferred diet tags or similar! </div>
                                <div className="modalMessage">Please add a diet tag under Diets in the Preferences settings if you have not set any preferred diet tags and try again! </div>
                            </div>
                            <div className="modal-footer">
                             <button className="yesButton" onClick={e => updateModal(!showModal)}>OK</button>
                            </div>
                        </Modal>
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
                    <SearchBar searchPosts={searchPosts} shuffle={shuffle} preferredTags={preferredTags}/> <br/>
                    <div className="posts">
                        <p>No Posts Found</p> 
                    </div>
                    <Modal show={showModal} onClose={e => updateModal(!showModal)}>
                        <div className="modal-header">
                            <h2 className="modal-header-text">Error</h2>
                        </div>
                        <div>
                            <div className="modalMessage"> Sorry, we are unable to find any posts on the current listing that have your preferred diet tags or similar! </div>
                            <div className="modalMessage"> Please try again once there are posts showing under your search condition. </div>
                        </div>
                        <div className="modal-footer">
                             <button className="yesButton" onClick={e => updateModal(!showModal)}>OK</button>
                        </div>
                    </Modal>
                </div>
            );
        }
    } else {
        return <div> Please Log In... </div>;
    }
}

export default Posts

