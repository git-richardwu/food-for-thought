import React from "react";
import "./Settings.css";
import Modal from "../Modal.jsx";
import "../Modal.css"
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";

// toggleModal will both show and hide the modal dialog, depending on current state.  Note that the
// contents of the modal dialog are set separately before calling toggle - this is just responsible
// for showing and hiding the component
function toggleModal(app) {
    app.setState({
      openModal: !app.state.openModal,
    });
  }

export default class AccountSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      deletePressed: false,
      clickedSubmit: false,
      originalUsername: "",
      originalEmail: "",
      openModal: false,
      invalidEmail: false,
      invalidUsername: false,
      usernameExists: false,
      emailExists: false,
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
              originalUsername: result.username || "",
              originalEmail: result.email || "",
            });
          }
        }
      ).catch(error => console.log(error));
  }

  submitHandler = event => {
    //keep the form from actually submitting
    event.preventDefault();
    this.setState({
        invalidEmail: false,
        invalidUsername: false,
        emailExists: false,
        usernameExists: false
    })
    var requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+sessionStorage.getItem("token")
        },
      };
      
    fetch(process.env.REACT_APP_API_PATH + "/users?email="+this.state.email, requestOptions)
        .then(response => response.json())
        .then(result => {
            if (this.state.email == ""){
                this.setState({
                    invalidEmail: true
                })
            }
            else if (result[1] != 0 && this.state.email != this.state.originalEmail){
                this.setState({
                    emailExists: true
                })
            }

            fetch(process.env.REACT_APP_API_PATH + "/users?username="+this.state.username, requestOptions)
                .then(response => response.json())
                .then(result2 => {
                    if (this.state.username == ""){
                        this.setState({
                            invalidUsername: true
                        })
                    }
                    else if (result2[1] != 0 && this.state.username != this.state.originalUsername){
                        this.setState({
                            usernameExists: true
                        })
                    }

                    if (this.state.invalidEmail || this.state.invalidUsername || this.state.emailExists || this.state.usernameExists){
                        return;
                    }else{
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
                            result3 => {
                                this.setState({
                                clickedSubmit: true,
                                });
                            }
                            ).catch(error => console.log(error));;
                    }
            }).catch(error => console.log(error));
        }).catch(error => console.log(error));
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
      .then(response => response.text())
      .then(result => console.log(result))
      .then(() => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");
      })
      .then(() => {
        this.setState({
            deletePressed: true
            });
      }).catch(error => console.log(error));

  }

  reset(){
    var requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+sessionStorage.getItem("token")
        },
      };
      
      fetch(process.env.REACT_APP_API_PATH + "/auth/logout", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .then(() => {
          sessionStorage.removeItem("token");
          sessionStorage.removeItem("user");
        }).catch(error => console.log(error));
  }

    confirmDelete(){
        this.setState({
            openModal: true
        })
    }
    async deleteAccount() {
        var requestOptionsDelete = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+sessionStorage.getItem("token")
            },
        };
        await this.deleteGeneral("/user-preferences", "?userID=",sessionStorage.getItem("user")) // user-preferences
            .then(await this.deleteGeneral("/user-artifacts", "?ownerID=",sessionStorage.getItem("user"))) // user-artifacts
            .then(await this.deleteGeneral("/connections", "?userID=",sessionStorage.getItem("user"))) // following
            .then(await this.deleteGeneral("/connections", "?connectedUserID=",sessionStorage.getItem("user"))) // followers
            .then(await this.deletePosts()) // posts
            .then(await this.deleteGeneral("/post-tags", "?userID=",sessionStorage.getItem("user"))) // post-tags
            .then(await this.deleteGroups()) // groups
            .then(await this.deleteGeneral("/group-members", "?userID=",sessionStorage.getItem("user"))) // group member
            .then(await this.deleteGeneral("/messages", "?authorID=",sessionStorage.getItem("user"))) // messages sent
            .then(await this.deleteGeneral("/messages", "?recipientUserID=", sessionStorage.getItem("user"))) // messages recieved
            .then(await fetch(process.env.REACT_APP_API_PATH + "/users/"+sessionStorage.getItem("user"), requestOptionsDelete)
                .then(response => response.json())
                .then(result =>console.log(result))
                .catch(error => console.log(error)))
            .then(() => {              
                sessionStorage.removeItem("token");
                sessionStorage.removeItem("user");
                this.setState({
                    deletePressed: true
                    });
            });
    }

    async deleteGeneral(path, query, id){
        var requestOptions = {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+sessionStorage.getItem("token")
            },
        };

        return await fetch(process.env.REACT_APP_API_PATH + path+query+id, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result){
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

  async deletePosts(){
    var requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+sessionStorage.getItem("token")
        },
      };
      
      return fetch(process.env.REACT_APP_API_PATH + "/posts?authorID="+sessionStorage.getItem("user"), requestOptions)
        .then(response => response.json())
        .then(async result => {
            if (result){
                var requestOptionsDelete = {
                    method: 'DELETE',
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': 'Bearer '+sessionStorage.getItem("token")
                    },
                  };
            
                for (var i = 0; i < result[1]; i++){
                    await this.deleteGeneral("/post-tags", "?postID=", result[0][i].id) // delete all tags for post
                        .then(await this.deleteCommentsRecursive(result[0][i].id)) // delete comments
                        .then(await fetch(process.env.REACT_APP_API_PATH + "/posts/"+result[0][i].id, requestOptionsDelete) // delete post
                            .then(response => response.json())
                            .then(result =>console.log(result))
                            .catch(error => console.log(error)));
                }
            }
        })
        .catch(error => console.log(error));
  }

  async deleteCommentsRecursive(id){
    var requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+sessionStorage.getItem("token")
        },
      };
      
      return fetch(process.env.REACT_APP_API_PATH + "/posts?parentID="+id, requestOptions)
        .then(response => response.json())
        .then(async result => {
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
                    await this.deleteGeneral("/post-tags", "?postID=", result[0][i].id) // delete all tags for comment
                        .then(await this.deleteCommentsRecursive(result[0][i].id)) // delete comments
                        .then(await fetch(process.env.REACT_APP_API_PATH + "/posts/"+result[0][i].id, requestOptionsDelete) // delete comment
                            .then(response => response.json())
                            .then(result =>console.log(result))
                            .catch(error => console.log(error)));
                }
            }
        })
        .catch(error => console.log(error));
  }

  async deleteGroups(){
    var requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+sessionStorage.getItem("token")
        },
      };
      
      return fetch(process.env.REACT_APP_API_PATH + "/groups?ownerID="+sessionStorage.getItem("user"), requestOptions)
        .then(response => response.json())
        .then(async result => {
            if (result){
                var requestOptionsDelete = {
                    method: 'DELETE',
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': 'Bearer '+sessionStorage.getItem("token")
                    },
                  };
                
                for (var i = 0; i < result[1]; i++){
                    let response = await this.deleteGeneral("/group-members", "?groupID=", result[0][i].id) // delete all members for group
                        .then(await this.deleteGeneral("/messages", "?recipientGroupID=", result[0][i].id)); // delete all messages from group
                    await fetch(process.env.REACT_APP_API_PATH + "/groups/"+result[0][i].id, requestOptionsDelete) // delete group
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

    if (this.state.clickedSubmit){
        return <Redirect to='/settings'/>
    }
    return (
        <div className="accountSettingsContainer">
            <Link to="/settings/">
                <button className="backButton backButtonCreate">
                    <i className="arrow left"/>
                    Back
                </button>      
            </Link>
            <form onSubmit={this.submitHandler} className="profileform">
                <div className="row">
                    <div className="col-25">
                        <label for="emailID">Email:</label>
                    </div>
                    <div className="col-75">
                        <input
                            id="emailID"
                            type="email"
                            onChange={e => this.fieldChangeHandler("email", e)}
                            value={this.state.email}
                        />
                    </div>
                </div>
                {this.state.invalidEmail && <p className="errorMessage">Email cannot be empty! Please enter an email!</p>}
                {this.state.emailExists && <p className="errorMessage">Please choose another email, this one already exists.</p>}
                <div className="row">
                    <div className="col-25">
                        <label for="usernameID">Username:</label>
                    </div>
                    <div className="col-75">
                        <input
                            id="usernameID"
                            type="text"
                            onChange={e => this.fieldChangeHandler("username", e)}
                            value={this.state.username}
                        />
                    </div>
                </div>
                {this.state.invalidUsername && <p className="errorMessage">Username cannot be empty! Please enter an username!</p>}
                {this.state.usernameExists && <p className="errorMessage">Please choose another username, this one already exists.</p>}
                <div className="row">
                    <div className="col-25">
                        <label>Password:</label>
                    </div>
                    <div className="col-75">
                        <Link to="/reset" className="resetButton" onClick={this.reset}>
                            Reset
                            <i className="arrow right"/>
                        </Link>
                    </div>
                </div>
                <input type="submit" value="Submit" />
            </form>
            <div className="redButtonContainer">
                <button className="redButton" onClick={this.logout.bind(this)}>Log Out</button>    
                <button className="redButton" onClick={this.confirmDelete.bind(this)}>Delete Account</button>
            </div>

            <Modal
                show={this.state.openModal}
                onClose={(e) => toggleModal(this, e)}>
                <div className="modal-header">
                    <h2 className="modal-header-text">Delete Account</h2>
                </div>
                <div className="modal-body">
                    <p className="modalMessage">Are you sure you want to delete your account? This is irreverisible!</p>
                </div>
                <div className="modal-footer">
                    <button  className="yesButton" onClick={this.deleteAccount.bind(this)}>Yes</button>
                    <button className="noButton" onClick={e => toggleModal(this, e)}>No</button>
                </div>
            </Modal>
        </div>
      
    );
  }
}
