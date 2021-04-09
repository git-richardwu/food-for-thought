import React from "react";
import "./Posts.css";
import CommentForm from "./CommentForm.jsx";
import helpIcon from "../../assets/delete.png";
import commentIcon from "../../assets/comment.svg";
import Ingredients from "./Ingredients.js";
import Steps from "./Steps.js";
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";
import PostProfilePicture from "./PostProfilePicture";
import PostURL from "./PostURL.js"
import FoodPhoto from "./FoodPhoto";
import PostTags from "./PostTags.js"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faRetweet } from '@fortawesome/free-solid-svg-icons'

export default class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      comments: this.props.post.commentCount,
      redirect: false,
    };
    this.post = React.createRef();

  }
  

  showModal = e => {
    this.setState({
      showModal: !this.state.showModal
    });
  };

  setCommentCount = newcount => {
    this.setState({
      comments: newcount
    });
  };

  getCommentCount() {
    if (!this.state.comments || this.state.comments === "0") {
      return 0;
    }
    return parseInt(this.state.comments);
  }

  showHideComments() {
    if (this.state.showModal) {
      return "comments show";
    }
    return "comments hide";
  }


  // we only want to display comment information if this is a post that accepts comments
  conditionalDisplay() {
    console.log("Comment count is " + this.props.post.commentCount);

    //if (this.props.post.commentCount <= 0) {
    //  return "";
    //  }

    //else {
      return (
        <div className="comment-block">

          <div className="comment-indicator">
            <div className="comment-indicator-text">
              {this.getCommentCount()} Comments
            </div>
            <img
              src={commentIcon}
              className="comment-icon"
              onClick={e => this.showModal()}
              alt="View Comments"
            />
            <FontAwesomeIcon 
                style={{ width:"45px", height:"45px", paddingRight:"10px",  paddingBottom:"10px"}} 
                icon={faRetweet} 
                onClick={()=> this.props.resharePost(this.props.post.id, this.props.parentid, this.props.post.content, this.props.post.author.id)}
            />
            
          </div>
          <div className={this.showHideComments()}>
            <CommentForm
              onAddComment={this.setCommentCount}
              parent={this.props.post.id}
              commentCount={this.getCommentCount()}
            />
          </div>
        </div>
      );
    //}

  }

  // we only want to expose the delete post functionality if the user is
  // author of the post
  showDelete(){
    if (this.props.post.author.id == sessionStorage.getItem("user")) {
      return(
      <img
        src={helpIcon}
        className="deleteIcon"
        alt="Delete Post"
        title="Delete Post"
        onClick={e => this.props.deletePost(this.props.post.id, this.props.post.content, this.props.post.type)}
      />
    );
    }
    return "";
  }

  // showDelete1(){
  //   if (this.props.post.author.id == sessionStorage.getItem("user")) {
  //     return(
  //     <img
  //       src={helpIcon}
  //       className="deleteIcon"
  //       alt="Delete Post"
  //       title="Delete Post"
  //       onClick={e => this.props.deletePost(this.props.post.id, this.props.post.comments)}
  //     />
  //   );
  //   }
  //   return "";
  // }

  getCommentBody(){
    return this.props.post.content;
  }

  getIngredientsID(){
    return this.props.post.content.split("~")[2];
  }

  getStepsID(){
      return this.props.post.content.split("~")[1];
  }

  getTitle(){
      return this.props.post.content.split("~")[0];
  }

  getFoodPhotoID(){
        return this.props.post.content.split("~")[3];
  }

  render() {
    if (this.state.redirect){
        <Redirect to="/home"/>
    }
    if (this.props.type === "postlist"){
      return (
      <div>
        <div
            key={this.props.post.id}
            className={[this.props.type, "postbody"].join(" ")}>
            <div className="deletePost">
                {this.showDelete()}
                <div className="profilePictureContainer"> 
                    <Link to={`/profile/${this.props.post.author.id}`}>
                        <PostProfilePicture id={this.props.post.author.id} />
                    </Link>
                </div>
                <div className="postUsername">
                    <Link to={`/profile/${this.props.post.author.id}`}>
                        {sessionStorage.setItem("profileUser", this.props.post.author.id)}
                        {this.props.post.author.username}
                    </Link>
                </div>
                <div className="postDate">
                    {new Date(this.props.post.createdAt).toLocaleString()}
                </div>
            </div>
            <div className="postTitle">
                {this.getTitle()}
            </div>
            <div className="content">
                <Ingredients id={this.getIngredientsID()}/>
                <Steps id={this.getStepsID()}/>
                <FoodPhoto id={this.getFoodPhotoID()}/>
            </div>
            <PostURL link={this.props.post.thumbnailURL}/>
            <PostTags postID={this.props.post.id}/>
            {this.conditionalDisplay()}
        </div>
      </div>
    );
    }
    else {
      return(
      <div>
        <div
            key={this.props.post.id}
            className={[this.props.type, "commentBody"].join(" ")}>
            <div className="deletePost">
                {this.showDelete()}

                <div className="profilePictureContainer"> 
                    <Link to="/profile">
                        {/* need to connect with profile page to get poster's profile*/}
                        <PostProfilePicture id={this.props.post.author.id} />
                    </Link>
                </div>

                <div className="postUsername">
                    <Link to="/profile">
                        {/* need to connect with profile page to get poster's profile*/}
                        {this.props.post.author.username}
                    </Link>
                </div>

                <div className="postDate">
                    {new Date(this.props.post.createdAt).toLocaleString()}
                </div>

                <div className="commentBody">
                    {this.getCommentBody()}
                </div>
            </div>
            {/* <PostURL link={this.props.post.thumbnailURL}/>
            <PostTags postID={this.props.post.id}/> */}
            {/* {this.props.post.content} */}
            {this.conditionalDisplay()}
        </div>
      </div>
      );
    }
    
  }
}
