import React from "react";
import salad from "../assets/salad.jpg"
import "../App.css";
import { Redirect } from "react-router-dom";
import "./SignUp_Page/foobar.css";
import Modal from "./Modal.jsx"

// toggleModal will both show and hide the modal dialog, depending on current state.  Note that the
// contents of the modal dialog are set separately before calling toggle - this is just responsible
// for showing and hiding the component
function toggleModal(app) {
    app.setState({
      openModal: !app.state.openModal,
    });
  }

// the login form will display if there is no session token stored.  This will display
// the login form, and call the API to authenticate the user and store the token in
// the session.
export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      alanmessage: "",
      sessiontoken: "",
      redirect: false,
      openModal: false
    };
    this.refreshPostsFromLogin = this.refreshPostsFromLogin.bind(this);
  }

  // once a user has successfully logged in, we want to refresh the post
  // listing that is displayed.  To do that, we'll call the callback passed in
  // from the parent.
  refreshPostsFromLogin(){
    this.props.refreshPosts();
  }

  // change handlers keep the state current with the values as you type them, so
  // the submit handler can read from the state to hit the API layer
  myChangeHandler = event => {
    this.setState({
      username: event.target.value
    });
  };

  passwordChangeHandler = event => {
    this.setState({
      password: event.target.value
    });
  };

  // when the user hits submit, process the login through the API
  submitHandler = event => {
    //keep the form from actually submitting
    event.preventDefault();

    //make the api call to the authentication page
    fetch(process.env.REACT_APP_API_PATH+"/auth/login", {
      method: "post",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.username,
        password: this.state.password
      })
    })
      .then(res => res.json())
      .then(
        result => {
          if (result.userID) {

            // set the auth token and user ID in the session state
            sessionStorage.setItem("token", result.token);
            sessionStorage.setItem("user", result.userID);

            this.setState({
              sessiontoken: result.token
            });

            // call refresh on the posting list
            this.refreshPostsFromLogin();
          } else {

            // if the login failed, remove any infomation from the session state
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("user");
            this.setState({
              sessiontoken: "",
              openModal: !this.state.openModal
            });
          }
        }
      )
      .catch(error => {
        this.setState({
            sessiontoken: "",
            openModal: !this.state.openModal
          });
         console.log(error);
      });
  };

  rdReset = event => {
    this.setState({
      redirect: true
    })
  }
  render() {
    // console.log("Rendering login, token is " + sessionStorage.getItem("token"));

    const { redirect } = this.state;
    if ( redirect ){
      return <Redirect to='/reset'/>
    }

    if (!sessionStorage.getItem("token")) {
      return (
        // <form onSubmit={this.submitHandler}>
        <div className="signUpContainer">
          <div class="col-1">
            <h1 className="header" style={{textAlign: "left"}}>Login</h1>
            <form onSubmit={this.submitHandler}>
                <label>
                    Email:
                    <input className="textbox" type="text" onChange={this.myChangeHandler} />
                </label>
                <br />
                <label>
                    Password:
                    <input className="textbox" type="password" onChange={this.passwordChangeHandler} />
                </label>
                <br />
                <input className="buttonStyle1" type="submit" value="submit" />
                <button onClick = {this.rdReset} className = "buttonStyle1"> Forgot Password </button>
                <p>{this.state.alanmessage}</p>
            </form>
            </div>
            <div id="salad" class="col-2">
            <img style={{ right: "0" ,position: "fixed", height: "110vh"}} src={salad} alt="Fruit Salad"></img>
            </div>
            <Modal
                show={this.state.openModal}
                onClose={(e) => toggleModal(this, e)}>
                <div className="modal-header">
                    <h2 className="modal-header-text">Invalid Credentials</h2>
                </div>
                <div className="modal-body">
                    <p className="modalMessage">Please ensure that the correct email and password is entered. Did you mean to <a href="/signup">register</a>?</p>
                </div>
                <div className="modal-footer">
                    <button  className="yesButton" onClick={e => toggleModal(this, e)}>OK</button>
                </div>
            </Modal>
        </div>
      );
    } else {
      return <Redirect to='/home'/>
    }
  }
}
