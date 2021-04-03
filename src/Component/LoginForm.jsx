import React from "react";

import "../App.css";
import { Redirect } from "react-router-dom";
import "./SignUp_Page/foobar.css"

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
      redirect: false
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
              sessiontoken: result.token,
              alanmessage: result.token
            });

            // call refresh on the posting list
            this.refreshPostsFromLogin();
          } else {

            // if the login failed, remove any infomation from the session state
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("user");
            this.setState({
              sessiontoken: "",
              alanmessage: result.message
            });
          }
        },
        error => {
          alert("error!");
        }
      );
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
        <div className="center">
          <h2>Login</h2>
        <form onSubmit={this.submitHandler}>
          <label>
            Username
            <input className="textbox" type="text" onChange={this.myChangeHandler} />
          </label>
          <br />
          <label>
            Password
            <input className="textbox" type="password" onChange={this.passwordChangeHandler} />
          </label>
          <br />
          <input className="buttonStyle1" type="submit" value="submit" />
          <button onClick = {this.rdReset} className = "buttonStyle1"> Forgot Password </button>
          <p>{this.state.alanmessage}</p>
        </form>
        </div>
      );
    } else {
      return <Redirect to='/home'/>
      // console.log("Returning welcome message");
      // if (this.state.username) {
      //   return <p>Welcome, {this.state.username}</p>;
      // } else {
      //   return <p>{this.state.alanmessage}</p>;
      // }
    }
  }
}
