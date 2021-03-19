import React from "react";
import "../App.css";
import {
   Link
} from 'react-router-dom';
// pull in the images for the menu items
// import postIcon from "../assets/post.svg";
import friendIcon from "../assets/friends.svg";
import settingIcon from "../assets/settings.svg";
// import helpIcon from "../assets/help.svg";
import homeIcon from "../assets/home.svg"
import notificationIcon from "../assets/notification.svg"

/* The Navbar class provides navigation through react router links.  Note the callback
   to the parent app class in the last entry... this is an example of calling a function
   passed in via props from a parent component */
class Navbar extends React.Component {

  render() {
    return (
    <div id="sidenav" className="sidenav">
      <ul id="side-menu-items">
        <li className="pm admin student">
          <Link to="/posts">
            <img
              src={homeIcon}
              className="sidenav-icon"
              alt="Home"
              title="Home"
            />
          </Link>
        </li>
        <li className="pm admin">
            <Link>
            <img
              src={notificationIcon}
              className="sidenav-icon"
              alt="Notifications"
              title="Notifications"
            />
            </Link>
          
        </li>
        <li className="pm admin">
          <Link to="/friends">
            <img
              src={friendIcon}
              className="sidenav-icon"
              alt="Friends"
              title="Friends"
            />
          </Link>
        </li>
        <li className="pm admin">
          <Link to="/settings">
            <img
              src={settingIcon}
              className="sidenav-icon"
              alt="Settings"
              title="Settings"
            />
          </Link>
        </li>
      </ul>
    </div>
  );
  }

}
export default Navbar;
