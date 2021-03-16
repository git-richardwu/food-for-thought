import React from "react";

import "../App.css";

// the login form will display if there is no session token stored.  This will display
// the login form, and call the API to authenticate the user and store the token in
// the session.

export default class PasswordReset extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      password: ""
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
      token: event.target.value
    });
  };

  passwordChangeHandler = event => {
    this.setState({
      password: event.target.value
    });
  };


  // when the user hits submit, process the email through the API
  submitHandler = event => {
    //keep the form from actually submitting
    event.preventDefault();

    //make the api call to the reset password page to confirm token and new password
    fetch(process.env.REACT_APP_API_PATH+"/auth/reset-password", {
      method: "post",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: this.state.token,
        password: this.state.password
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
                  <label> Token </label>
                  <input name = 'input token' type='token' onChange ={this.myChangeHandler} required></input>
                </p>
                <p>
                <label> New Password </label>
                  <input name = 'password' type='password' onChange ={this.passwordChangeHandler} required></input>
                </p>
                <button>Submit</button>
            </form>
        </div>
      );
  }

}
