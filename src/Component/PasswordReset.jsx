import React from "react";

import {Redirect} from "react-router-dom";

export default class PasswordReset extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      token: "",
      password: "",
      emailErrorStatus: false,
      pwErrorStatus: false,
      redirect: false
    };
  }

  // change handlers keep the state current with the values as you type them, so
  // the submit handler can read from the state to hit the API layer
  emailHandler = event => {
    this.setState({
      email: event.target.value
    });
  };

  tokenHandler = event => {
    this.setState({
      token: event.target.value
    });
  };

  passwordHandler = event => {
    this.setState({
      password: event.target.value
    });
  };

  // when the user hits submit, process the email through the API
  submitHandler = event => {
    //keep the form from actually submitting
    event.preventDefault();

    const email = this.state.email

    if (!email.includes("@") || !email.includes(".com")){
        this.setState({
          emailErrorStatus: true
        })
    }

    else {
        //make the api call to the request-reset page- will send an email(already provided in backend)
        //  with token to user email
    fetch(process.env.REACT_APP_API_PATH+"/auth/request-reset", {
      method: "post",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email
      })
    })
      // test if taking out line 64 changes anything <- yes taking it out runs the lines after, line 64 does nothing
    // .then(response => response.json()) 
    .then(
      result => {
        console.log(result);
        alert("An Email has been sent!");
      });
    }
  };

  submitHandler2 = (event) => {
    //keep the form from actually submitting
    event.preventDefault();
    // console.log("called")

    const token = this.state.token
    const password = this.state.password

    if(password == "" || password.length < 6){
      this.setState({
          pwErrorStatus: true
      })
    }

    else {
      fetch(process.env.REACT_APP_API_PATH+"/auth/reset-password", {
        method: "post",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: token,
          password: password
        })
      })

    // .then(response => response.json())
      .then(
      result => {
        console.log(result);
        alert("New Password Submitted!");

        this.setState({
          redirect: true
        });
      });

    }
  };

  render() {
      const { redirect } = this.state;
      if ( redirect ){
        return <Redirect to='/posts'/>
      }

      return (
        <div>
                <h1> Reset Password </h1>
                <p>
                  <label> Email </label>
                  <input name = 'email' type='email' onChange ={this.emailHandler} value = {this.state.email}></input>
                </p>
                <button onClick = {this.submitHandler}>Get One Time Password!</button>
                { this.state.emailErrorStatus ? <p>Error: Please enter a valid email!</p> : <div/> }


                <p>
                  <label> Token </label>
                  <input name = 'token' type='token' onChange ={this.tokenHandler} value = {this.state.token}></input>
                </p>
                <p>(Make sure your token is typed correctly, otherwise the su)</p>
                
                <p>
                  <label> New Password </label>
                  <input name = 'new password' type='password' onChange ={this.passwordHandler} value = {this.state.password}></input>
                </p>
                <button onClick = {this.submitHandler2}>Submit New Password!</button>
                { this.state.pwErrorStatus ? <p>Error: Please enter a valid password! (Min. Length of 6)</p> : <div/> }

                <p>Note: </p>
                <p>Make sure your token is typed correctly, otherwise the submitted password will not reset the old password.</p>
                <p> Once the new password is submitted, please sign in again.</p>
                <p> If you are unable to login, please try resetting the password again and make sure that the token is typed correctly</p>

        </div>
      );
  }

}
