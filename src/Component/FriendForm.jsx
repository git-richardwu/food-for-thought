import React from "react";
import "../App.css";
import Autocomplete from "./Autocomplete.jsx";
import { BrowserRouter as Router, Redirect, Route, Switch, Link } from "react-router-dom";

export default class FriendForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      friendname: "",
      friendid: "",
      responseMessage: "",
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

  selectAutocomplete(friendID) {
      this.setState({
        friendid:friendID
      })
      console.log("Set Friend ID to "+friendID)
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
        },
      )
      .catch(error => console.log(error));
  }

  render() {
    return (
      <form onSubmit={this.submitHandler} className="profileform1">
        <label>
          Find users to follow!
          <br />
          <div className="autocomplete">
            <Autocomplete suggestions={this.state.users} selectAutocomplete={e => this.selectAutocomplete(e)} />
          </div>
        </label>
        {/* <input type="submit" value="submit" /> */}
        {/* <Link to={{
          pathname: "/user",
          search: "?userID="+this.state.friendid
        }}>
          <button>Submit</button>
        </Link> */}
        <Link to={`/user/${this.state.friendid}`}>
          <button>Submit</button>
         </Link>
        {this.state.responseMessage}
      </form>
    );
  }
}
