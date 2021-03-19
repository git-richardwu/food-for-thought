import React from "react";
import { Redirect, Link } from "react-router-dom";

export default class LandingPage extends React.Component {


render() {
    if(!sessionStorage.getItem("token")){
    return (
    <div>
        <Link to="/login">
      <button>Login</button>
        </Link>

        <Link to="/signup">
      <button>Sign-Up</button>
        </Link>
    </div>
    );
  }
  else {
      return <Redirect to="/main"/>
  }
    }
}