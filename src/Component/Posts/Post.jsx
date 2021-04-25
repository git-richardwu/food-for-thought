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
import PostTags from "./PostTags.js";
import Calories from "./Calories.js"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faRetweet } from '@fortawesome/free-solid-svg-icons'
import Modal from "../Modal.jsx";

export default class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      showDeleteModal: false,
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

  showDeleteModal = e => {
    this.setState({
        showDeleteModal: !this.state.showDeleteModal
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
  conditionalCommentDisplay() {
    console.log("Comment count is " + this.props.post.commentCount);
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

  // we only want to display comment information if this is a post that accepts comments
  conditionalDisplay() {
    console.log("Comment count is " + this.props.post.commentCount);
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
              authorID = {this.props.post.author.id}
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
        onClick={e => this.showDeleteModal()}
      />
    );
    }
    return "";
  }

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
                   
                <div className="userProfileContainer">
                    <Link to={`/profile/${this.props.post.author.id}`} className="userProfileContainer">
                        <div className="profilePictureContainer"> 
                            <PostProfilePicture id={this.props.post.author.id} />
                        </div>
                        <div className="postUsername">
                            {this.props.post.author.username}
                        </div>
                    </Link>
                    <div className="postDate">
                        {new Date(this.props.post.createdAt).toLocaleString()}
                    </div>
                </div>
            </div>
            <div className="postTitle">
                {this.getTitle()}
            </div>
            <div className="content">
                <Ingredients id={this.getIngredientsID()}/>
                <Steps id={this.getStepsID()}/>
                <FoodPhoto id={this.getFoodPhotoID()} title={this.getTitle()}/>
            </div>
            <PostURL link={this.props.post.thumbnailURL}/>
            <Calories postID={this.props.post.id} />
            <PostTags postID={this.props.post.id}/>
            {this.conditionalDisplay()}
        </div>
        <Modal show={this.state.showDeleteModal} onClose={e => this.showDeleteModal()}>
            <div className="modal-header">
                <h2 className="modal-header-text">Delete Post</h2>
            </div>
            <div className="modal-body">
                <p className="modalMessage">Are you sure you want to delete this post? This is irreverisible!</p>
            </div>
            <div className="modal-footer">
                <button  className="yesButton" onClick={e => this.props.deletePost(this.props.post.id, this.props.post.content, this.props.post.type)}>Yes</button>
                <button className="noButton" onClick={e => this.showDeleteModal()}>No</button>
            </div>
        </Modal>
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
   
                <div className="userProfileContainer">
                    <Link to={`/profile/${this.props.post.author.id}`} className="userProfileContainer">
                        <div className="profilePictureContainer"> 
                            <PostProfilePicture id={this.props.post.author.id} />
                        </div>
                        <div className="postUsername">
                            {this.props.post.author.username}
                        </div>
                    </Link>
                    <div className="postDate">
                        {new Date(this.props.post.createdAt).toLocaleString()}
                    </div>
                </div>


                <div className="commentBody">
                    {this.getCommentBody()}
                </div>
            </div>
            {this.conditionalCommentDisplay()}
            <Modal show={this.state.showDeleteModal} onClose={e => this.showDeleteModal()}>
                <div className="modal-header">
                    <h2 className="modal-header-text">Delete Comment</h2>
                </div>
                <div className="modal-body">
                    <p className="modalMessage">Are you sure you want to delete this comment? This is irreverisible!</p>
                </div>
                <div className="modal-footer">
                    <button  className="yesButton" onClick={e => this.props.deletePost(this.props.post.id, this.props.post.content, this.props.post.type)}>Yes</button>
                    <button className="noButton" onClick={e => this.showDeleteModal()}>No</button>
                </div>
            </Modal>
        </div>
      </div>
      );
    }
    
  }
}
