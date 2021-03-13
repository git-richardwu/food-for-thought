import React from "react";
import "./Settings.css";
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";


export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      responseMessage: "",
      deletePressed: false,
    };
    this.fieldChangeHandler.bind(this);
  }

  fieldChangeHandler(field, e) {
    console.log("field change");
    this.setState({
      [field]: e.target.value
    });
  }

  componentDidMount() {
    console.log("In profile");
    console.log(this.props);

    // first fetch the user data to allow update of username
    fetch(process.env.REACT_APP_API_PATH+"/users/"+sessionStorage.getItem("user"), {
      method: "get",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+sessionStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(
        result => {
          if (result) {
            console.log(result);

            this.setState({
              // IMPORTANT!  You need to guard against any of these values being null.  If they are, it will
              // try and make the form component uncontrolled, which plays havoc with react
              username: result.username || "",
              email: result.email || "",

            });
          }
        },
        error => {
          alert("error!");
        }
      );
  }

  submitHandler = event => {
    //keep the form from actually submitting
    event.preventDefault();

    //make the api call to the user controller
    fetch(process.env.REACT_APP_API_PATH+"/users/"+sessionStorage.getItem("user"), {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+sessionStorage.getItem("token")
      },
      body: JSON.stringify({
        username: this.state.username,
        email: this.state.email,
      })
    })
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            responseMessage: result.Status
          });
        },
        error => {
          alert("error!");
        }
      );
  };

  logout(){
    var requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+sessionStorage.getItem("token")
      },
    };
    
    fetch(process.env.REACT_APP_API_PATH + "/auth/logout", requestOptions)
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => alert('error'));

      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
  }

    deleteAccount() {
        var dialogResult = window.confirm("Are you sure you want to delete your account?");
        var promises = [];
        if (dialogResult){
            promises.push(this.deleteGeneral("/user-preferences", "?userID=",sessionStorage.getItem("user"))); // user-preferences
            promises.push(this.deleteGeneral("/user-artifacts", "?ownerID=",sessionStorage.getItem("user"))); // user-artifacts
            promises.push(this.deleteGeneral("/connections", "?userID=",sessionStorage.getItem("user"))); // following
            promises.push(this.deleteGeneral("/connections", "?connectedUserID=",sessionStorage.getItem("user"))); // followers
            promises.push(this.deletePosts()); // posts
            promises.push(this.deleteGeneral("/post-tags", "?userID=",sessionStorage.getItem("user"))); // post-tags
            promises.push(this.deleteGroups()); // groups
            promises.push(this.deleteGeneral("/group-members", "?userID=",sessionStorage.getItem("user"))); // group member
            promises.push(this.deleteGeneral("/messages", "?authorID=",sessionStorage.getItem("user"))); // messages

            
            Promise.all(promises).then(() => {
                var promises2 = [];
                var requestOptionsDelete = {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+sessionStorage.getItem("token")
                    },
                };
                promises2.push(fetch(process.env.REACT_APP_API_PATH + "/users/"+sessionStorage.getItem("user"), requestOptionsDelete)
                    .then(response => response.json())
                    .then(result =>console.log(result))
                    .catch(error => console.log(error)));
                Promise.all(promises2).then(() => {

                    this.logout();
                    this.setState({
                        deletePressed: true
                        });
                });
            });       
        }
    }

    deleteSession = () => {

    }

    deleteGeneral(path, query, id){
        var requestOptions = {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+sessionStorage.getItem("token")
            },
        };
        
        return fetch(process.env.REACT_APP_API_PATH + path+query+id, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result){
                    console.log(result);
                    var requestOptionsDelete = {
                        method: 'DELETE',
                        headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+sessionStorage.getItem("token")
                        },
                    };
                    for (var i = 0; i < result[1]; i++){
                        fetch(process.env.REACT_APP_API_PATH + path+"/"+result[0][i].id, requestOptionsDelete)
                            .then(response => response.json())
                            .then(result =>console.log(result))
                            .catch(error => console.log(error));
                    }
                }
            })
            .catch(error => console.log(error));
    }

  deletePosts(){
    var requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+sessionStorage.getItem("token")
        },
      };
      
      fetch(process.env.REACT_APP_API_PATH + "/posts?userID="+sessionStorage.getItem("user"), requestOptions)
        .then(response => response.json())
        .then(result => {
            if (result){
                console.log(result);
                var requestOptionsDelete = {
                    method: 'DELETE',
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': 'Bearer '+sessionStorage.getItem("token")
                    },
                  };
                for (var i = 0; i < result[1]; i++){
                    // delete all tags for comment
                    this.deleteGeneral("/post-tags", "?postID=", result[0][1].id)
                    
                    // delete comments
                    this.deleteCommentsRecursive(result[0][1].id)
                    // delete comment
                    fetch(process.env.REACT_APP_API_PATH + "/posts/"+result[0][i].id, requestOptionsDelete)
                        .then(response => response.json())
                        .then(result =>console.log(result))
                        .catch(error => console.log(error));
                }
            }
        })
        .catch(error => console.log(error));
  }

  deleteCommentsRecursive(id){
    var requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+sessionStorage.getItem("token")
        },
      };
      
      fetch(process.env.REACT_APP_API_PATH + "/posts?parentID="+id, requestOptions)
        .then(response => response.json())
        .then(result => {
            if (result){
                console.log(result);
                var requestOptionsDelete = {
                    method: 'DELETE',
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': 'Bearer '+sessionStorage.getItem("token")
                    },
                  };
                for (var i = 0; i < result[1]; i++){
                    // delete all tags for comment
                    this.deleteGeneral("/post-tags", "?postID=", result[0][1].id)
                    
                    // deleteComments
                    this.deleteCommentsRecursive(result[0][1].id)
                    // delete post
                    fetch(process.env.REACT_APP_API_PATH + "/posts/"+result[0][i].id, requestOptionsDelete)
                        .then(response => response.json())
                        .then(result =>console.log(result))
                        .catch(error => console.log(error));
                }
            }
        })
        .catch(error => console.log(error));
  }

  deleteGroups(){
    var requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+sessionStorage.getItem("token")
        },
      };
      
      fetch(process.env.REACT_APP_API_PATH + "/groups?ownerID="+sessionStorage.getItem("user"), requestOptions)
        .then(response => response.json())
        .then(result => {
            if (result){
                console.log(result);
                var requestOptionsDelete = {
                    method: 'DELETE',
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': 'Bearer '+sessionStorage.getItem("token")
                    },
                  };
                for (var i = 0; i < result[1]; i++){
                    // delete all members for group
                    this.deleteGeneral("/group-members", "?groupID=", result[0][1].id)
                    
                    // delete group
                    fetch(process.env.REACT_APP_API_PATH + "/groups/"+result[0][i].id, requestOptionsDelete)
                        .then(response => response.json())
                        .then(result =>console.log(result))
                        .catch(error => console.log(error));
                }
            }
        })
        .catch(error => console.log(error));
  }

  render() {
    let isRedirect = this.state.deletePressed;
    if(isRedirect){
        return <Redirect to='/' />
    }
    return (
        <div>
            <Link to="/settings/">
                <button className="backButton">
                    <i className="arrow left"></i>
                    Back
                </button>      
            </Link>
            <form onSubmit={this.submitHandler} className="profileform">
                <div className="row">
                    <div className="col-25">
                        <label id="emailID">Email:</label>
                    </div>
                    <div className="col-50">
                        <input
                            id="emailID"
                            type="email"
                            onChange={e => this.fieldChangeHandler("email", e)}
                            value={this.state.email}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-25">
                        <label id="usernameID">Username:</label>
                    </div>
                    <div className="col-50">
                        <input
                            id="usernameID"
                            type="text"
                            onChange={e => this.fieldChangeHandler("username", e)}
                            value={this.state.username}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-25">
                        <label>Password:</label>
                    </div>
                    <div className="col-50">
                        <Link to="/passwordReset"> {/* Li choose what page to redirect here  */}
                            <button className="resetButton">
                                Reset
                                <i className="arrow right"></i>
                            </button>  
                        </Link>
                    </div>
                </div>
                <br/>
                <input type="submit" value="Submit" />
                {this.state.responseMessage}
            </form>
            <Link to="/">
                <button className="redButton" onClick={this.logout}>Log Out</button>    
            </Link>
            <br/>
            <br/>
            
            <button className="redButton" onClick={this.deleteAccount.bind(this)}>Delete Account</button>
        </div>
      
    );
  }
}
