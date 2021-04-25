import React from "react";
import "../../App.css";
import Autocomplete from "../Autocomplete.jsx"
import BlockingList from "./BlockingList.jsx"
import "./blocking.css"
import "../Settings/Settings.css"

import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";

export default class BlockingForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blockedname: "",
      // userid is a number
      blockedid: "",
    //   responseMessage: "",
    // users are all the users available on the server
      users: []
    };
    this.fieldChangeHandler.bind(this);
  }

  fieldChangeHandler(field, e) {
    console.log("field change");
    this.setState({
      [field]: e.target.value
    });
  }

  selectAutocomplete(blockedid) {
    // const [BlockedUsers, setNumBlockedUsers] = useState(0);
    // let connections = ""
    fetch(process.env.REACT_APP_API_PATH+"/connections?type=block&status=active&userID="+sessionStorage.getItem("user")+"&connectedUserID="+blockedid, {
      method: "GET",
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
              if (blockedid != sessionStorage.getItem("user") && result[1] == 0) {
                this.setState({
                  blockedid: blockedid
                })
                console.log("Block User: "+blockedid)
              };
          }
        },
      ).catch(error => console.log(error));
  }

  componentDidMount() {
    //make the api call to the user API to get the user with all of their attached preferences
    fetch(process.env.REACT_APP_API_PATH+"/users/", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+sessionStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(
        result => {
          if (result) {
            let names = [];

            result[0].forEach(element => {if (element.username){names.push(element)}});

            this.setState({
              users: names,
              responseMessage: result.Status
            });
            console.log(names);
          }
        }
      ).catch(error => console.log(error));
  }

  submitHandler = event => {
    //keep the form from actually submitting
    event.preventDefault();

    console.log("blocked user is ");
    console.log(this.state.blockedid);
    console.log(sessionStorage.getItem("token"))

    
    //make the api call to the user controller
    fetch(process.env.REACT_APP_API_PATH+"/connections", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+sessionStorage.getItem("token")
      },
      body: JSON.stringify({
        userID: sessionStorage.getItem("user"),
        connectedUserID: this.state.blockedid,
        // userID: sessionStorage.getItem("user"),
        type:"block",
        status:"active"
      })
    })
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            // responseMessage: result.Status
          });
          window.location.reload()
        }
      ).catch(error => console.log(error));
    
  };

  render() {
    return (
      <div className = "privacyContainer">
        <form onSubmit={this.submitHandler}>
            <Link to="/settings/privacy">
                <button className = "backButton backButtonCreate">
                <i className = "arrow left"/>
                    Back
                </button>      
            </Link>
            <br/>
            <div className="inputContainer">
                <div className="userInputContainer">
                    <label className="wordfont1"> Block a User! (enter username, not userid or email)</label>
                    <div className="autocomplete" tabIndex="0">
                        <Autocomplete suggestions={this.state.users} selectAutocomplete={e => this.selectAutocomplete(e)} />
                    </div>
                </div>
                <input className= "resetButton" type="submit" value="Block" />
            </div>
            {/* {this.state.responseMessage} */}
        </form>
        <p>Blocked Users:</p>
      </div>
    );
  }
}
