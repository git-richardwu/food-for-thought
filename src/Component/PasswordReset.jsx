import React from "react";
import Modal from "./Modal.jsx"
import {Redirect} from "react-router-dom";
import "../App.css";
import "./SignUp_Page/foobar.css";
import { faAssistiveListeningSystems } from "@fortawesome/free-solid-svg-icons";

function toggleModal1(app) {
    app.setState({
      openModal1: !app.state.openModal1,
    });
  }


  function toggleModal2(app) {
    app.setState({
      openModal2: !app.state.openModal2,
    });
  }


export default class PasswordReset extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      token: "",
      password: "",
      redirect: false,
      openModal1: false,
      openModal2: false,
      invalidEmail: false,
      invalidPassword: false
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
    this.setState({
        invalidEmail: false,
    })
    if (email == "" || (!email.includes("@") || !email.includes("buffalo.edu"))){
        this.setState({
            invalidEmail: true,
        })
        return;
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
    .then(
      result => {
        console.log(result);
        this.setState({
            openModal2: true
        })
      })
      .catch(error => console.log(error));
    }
  };

  submitHandler2 = (event) => {
    //keep the form from actually submitting
    event.preventDefault();
    this.setState({
        invalidPassword: false,
    })

    const token = this.state.token
    const password = this.state.password
    if(password == "" || password.length < 6 || password === password.toLowerCase()){
        this.setState({
            invalidPassword: true,
        })
      return;
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
      .then(
      result => {
        console.log(result);
        this.setState({
            openModal1: true
        })
      })
      .catch(error => console.log(error));

    }
  };

  redirect(){
    this.setState({
        redirect: true
      });
  }

  render() {
      const { redirect } = this.state;
      if ( redirect ){
        return <Redirect to='/'/>
      }

      return (
        <div className="signUpContainer">
                <h1 className="header" style={{textAlign: "left"}}>Reset Password</h1>
                <p>
                  <label className="labeling" for="reset email"> Email:</label>
                  <input id="reset email" name = 'email' type='email' onChange ={this.emailHandler} value = {this.state.email}></input>
                </p>
                {this.state.invalidEmail && <p className="errorMessage">Please enter a valid buffalo.edu email!</p>}
                <button className="buttonStyle1" onClick = {this.submitHandler}>Get One-Time Token</button>

                <p>
                  <label className="labeling" for="reset token"> Token:</label>
                  <input id="reset token" name = 'token' type='token' onChange ={this.tokenHandler} value = {this.state.token}></input>
                </p>
                
                <p>
                  <label className="labeling" for="reset password"> New Password:</label>
                  <input id="reset password" name = 'new password' type='password' onChange ={this.passwordHandler} value = {this.state.password}></input>
                </p>
                {this.state.invalidPassword && <p className="errorMessage">Please make sure your password is at least 6 
                    characters and contains at least one capital letter!</p>}
                <button className="buttonStyle1" onClick = {this.submitHandler2}>Submit New Password</button>

                <p className="labeling">Note: </p>
                <p>Make sure your token is typed correctly, otherwise the submitted password will not reset the old password.</p>
                <p>Once the new password is submitted, please sign in again.</p>
                <p>If you are unable to login, please try resetting the password again and make sure that the token is typed correctly.</p>

                <button className="buttonStyle1" onClick = {this.redirect.bind(this)}>Exit Password Reset</button>

                <p> </p>
                <p> </p>
                <p> </p>

            <Modal
                show={this.state.openModal1}
                onClose={(e) => toggleModal1(this, e)}>
                <div className="modal-header">
                    <h2 className="modal-header-text">New Password</h2>
                </div>
                <div className="modal-body">
                    <p className="modalMessage">Your new password has been submitted!</p>
                </div>
                <div className="modal-footer">
                    <button  className="yesButton" onClick={this.redirect.bind(this)}>OK</button>
                </div>
            </Modal>
            <Modal
                show={this.state.openModal2}
                onClose={(e) => toggleModal2(this, e)}>
                <div className="modal-header">
                    <h2 className="modal-header-text">Email Sent</h2>
                </div>
                <div className="modal-body">
                    <p className="modalMessage">An email has been sent!</p>
                </div>
                <div className="modal-footer">
                    <button  className="yesButton" onClick={e => toggleModal2(this, e)}>OK</button>
                </div>
            </Modal>
        </div>
      );
  }

}
