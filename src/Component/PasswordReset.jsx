import React from "react";

import "../App.css";

// the login form will display if there is no session token stored.  This will display
// the login form, and call the API to authenticate the user and store the token in
// the session.

export default class PasswordReset extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
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
      email: event.target.value
    });
  };

  // when the user hits submit, process the email through the API
  submitHandler = event => {
    //keep the form from actually submitting
    event.preventDefault();

    //make the api call to the request-reset page- will send an email(already provided in backend)
    //  with token to user email
    fetch(process.env.REACT_APP_API_PATH+"/auth/request-reset", {
      method: "post",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email
      })
    })
    
      .then(res => res.json())
      .then(
        result => {
          console.log("Testing");
          
        },
        error => {
          alert("error!");
        }
      );
  };

  render() {
      return (
        <div>
            <form onSubmit={this.submitHandler}>
                <h1> Reset Password </h1>
                <p>
                  <label> Email </label>
                  <input name = 'email' type='email' onChange ={this.myChangeHandler} required></input>
                </p>
                <button>Get One Time Password</button>
            </form>
        </div>
      );
  }

}
