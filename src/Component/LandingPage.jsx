import React from "react";
import { Redirect, Link } from "react-router-dom";
import "./SignUp_Page/foobar.css"

export default class LandingPage extends React.Component {
    
render() {
    if(!sessionStorage.getItem("token")){
    return (
    <div>
        <div className="landingPageContainer">
            <div className="inline">
            <h2>Welcome to Food for Thought! </h2>
            </div>
        <Link to="/login">
      <button className="buttonStyle">Login</button>
        </Link>
        <br />
        <Link to="/signup">
      <button className="buttonStyle">Sign-Up</button>
        </Link>
        </div>
    </div>
    );
  }
  else {
      return <Redirect to="/home"/>
  }
    }
}