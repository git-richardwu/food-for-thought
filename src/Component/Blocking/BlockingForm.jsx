import React from "react";
import "../../App.css";
import Autocomplete from "../Autocomplete.jsx"

export default class BlockingForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blockedname: "",
      // userid is a number
      blockedid: 0,
    //   responseMessage: "",
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
      this.setState({
        blockedid: blockedid
      })
      console.log("Block User: "+blockedid)
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
        error => {
          alert("error!");
        }
      );
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
        },
        error => {
          alert("error!");
        }
      );
  };

  render() {
    return (
      <form onSubmit={this.submitHandler} className="profileform1">
        <label>
          Block a User! (enter username, not userid or email)
          
          <br />
          <div className="autocomplete">
            <Autocomplete suggestions={this.state.users} selectAutocomplete={e => this.selectAutocomplete(e)} />
          </div>
        </label>
        <input type="submit" value="submit" />
        {/* {this.state.responseMessage} */}
      </form>
    );
  }
}
