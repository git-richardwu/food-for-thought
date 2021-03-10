import React from "react";
import "./Settings.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      responseMessage: "",
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

  deleteAccount(){
    // TODO: add all fetches for deleting account
  }

  render() {
    return (
        <div>
            <Link to="/settings/">
                <button className="backButton">
                    <i class="arrow left"></i>
                    Back
                </button>      
            </Link>
            <form onSubmit={this.submitHandler} className="profileform">
                <div className="row">
                    <div class="col-25">
                        <label id="emailID">Email:</label>
                    </div>
                    <div class="col-50">
                        <input
                            id="emailID"
                            type="email"
                            onChange={e => this.fieldChangeHandler("email", e)}
                            value={this.state.email}
                        />
                    </div>
                </div>
                <div className="row">
                    <div class="col-25">
                        <label id="usernameID">Username:</label>
                    </div>
                    <div class="col-50">
                        <input
                            id="usernameID"
                            type="text"
                            onChange={e => this.fieldChangeHandler("username", e)}
                            value={this.state.username}
                        />
                    </div>
                </div>
                <div className="row">
                    <div class="col-25">
                        <label>Password:</label>
                    </div>
                    <div class="col-50">
                    <Link to="/passwordReset">
                        <button className="resetButton">Reset<i class="arrow right"></i></button>  
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
            <Link to="/">
                <button className="redButton" onClick={this.deleteAccount}>Delete Account</button>
            </Link>
        </div>
      
    );
  }
}
