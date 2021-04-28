import React from "react";
import "../../App.css";
import CommentList from "../CommentList.jsx";
import {sendNotification} from "../../Notifications/lib"

export default class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post_text: "",
      postmessage: ""
    };
    this.postListing = React.createRef();
    this.submitHandler.bind(this);
  }

  submitHandler = event => {
    //keep the form from actually submitting
    event.preventDefault();

    //make the api call to the authentication page

    fetch(process.env.REACT_APP_API_PATH+"/posts", {
      method: "post",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+sessionStorage.getItem("token")
      },
      body: JSON.stringify({
        authorID: sessionStorage.getItem("user"),
        content: this.state.post_text,
        parentID: this.props.parent,
        thumbnailURL: "",
        type: "post"
      })
    })
      .then(res => res.json())
      .then(
        result => {
          // update the count in the UI manually, to avoid a database hit
          this.props.onAddComment(this.props.commentCount + 1);
          this.setState({
            post_text: "",
            });
          
          this.postListing.current.loadPosts();
        }, 
        error => {
          console.log(error);
        }
      
      // ).catch(error => console.log(error));
      );
      let userid = sessionStorage.getItem("user");
      let recpientID = this.props.authorID;
      let content = "Your post, "+  this.state.post_text  + ", recieved a comment";
      // let content = "Your post "+  this.state.post_text  + " recieved a comment";

      console.log("Author ID: " + this.props.authorID);
      sendNotification(userid,recpientID , content);
  };

  myChangeHandler = event => {
    this.setState({
      post_text: event.target.value
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.submitHandler}>
          <label for={"comment box"+this.props.parent} className="commentformLabel">Add A Comment To This Post</label>  
          <textarea id={"comment box"+this.props.parent} className="commentForm" value={this.state.post_text} onChange={this.myChangeHandler} />

          <input className="addComment" type="submit" value="Comment" />
        </form>
        <CommentList
          ref={this.postListing}
          parentid={this.props.parent}
          type="commentlist"
          onDeleteComment={this.props.onAddComment}
          commentCount={this.props.commentCount}
        />
      </div>
    );
  }
}
