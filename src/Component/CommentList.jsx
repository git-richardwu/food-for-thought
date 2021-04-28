import React from "react";
import Post from "./Posts/Post.jsx";

export default class CommentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      posts: [],
      listType: props.listType
    };
    this.postingList = React.createRef();
  }

  componentDidMount() {

    this.loadPosts();

  }

  componentDidUpdate(prevProps) {
    if (prevProps.refresh !== this.props.refresh){
      this.loadPosts();
    }
  }

  loadPosts() {
    let url = process.env.REACT_APP_API_PATH+"/posts?parentID=";
    if (this.props && this.props.parentid){
      url += this.props.parentid;
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
            this.setState({
              isLoaded: true,
              posts: result[0]
            });
            console.log("Got Posts");
          }
        }
      )
      .catch(error => {
        this.setState({
            error: true
          });
          console.log("ERROR loading Posts")
      });
  }

  deleteComment(postID, postContent, postType){
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
                var filteredPosts = this.state.posts.filter((post) => post.id != postID )
                this.props.onDeleteComment(this.props.commentCount - 1);
                this.setState({
                    isLoaded: true,
                    posts: filteredPosts
                  });
            }
            )
            .catch(error => console.log(error));
  }

  render() {
    //this.loadPosts();
    const {error, isLoaded, posts} = this.state;
    if (error) {
      return <div> <p>Error: {error} </p> </div>;
    } else if (!isLoaded) {
      return <div> <p>Loading...</p></div>;
    } else if (posts) {

      if (posts.length > 0){
      return (
            <div className="postsProfilePage">
                {posts.map(post => (
                <Post key={post.id} post={post} type={this.props.type} deletePost={this.deleteComment.bind(this)} parentid={this.props.parentid}/>
                ))}
            </div>

      );
    }else{
      return (<div> <p>No Comments Found</p></div>);
    }
    } else {
      return <div> Please Log In... </div>;
    }
  }
}
