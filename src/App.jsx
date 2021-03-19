/*
  App.js is the starting point for the application.   All of the components in your app should have this file as the root.
  This is the level that will handle the routing of requests, and also the one that will manage communication between
  sibling components at a lower level.  It holds the basic structural components of navigation, content, and a modal dialog.
*/

import React from "react";
import "./App.css";
import PostForm from "./Component/PostForm.jsx";
import FriendList from "./Component/FriendList.jsx";
import LoginForm from "./Component/LoginForm.jsx";
import Profile from "./Component/Settings/AccountSettings.jsx";
import Preferences from "./Component/Settings/Preferences.js"
import Diet from "./Component/Diet.jsx"
import FriendForm from "./Component/FriendForm.jsx";
import Modal from "./Component/Modal.jsx";
import Navbar from "./Component/Navbar.jsx";
import AboutAndrew from "./Component/ProfilePages/AboutAndrew.js";
import AboutWilliam from "./Component/ProfilePages/William_Phillips_Profile_Page/AboutWilliam";
import Settings from "./Component/Settings/Settings.js"
import UserProfile from "./Component/UserProfile/UserProfile";
import SideMenu from "./Component/atoms/atomComponents/sideMenu.js"
import styles from "./Component/UserProfile/UserProfile.module.css";
import Banner from "./Component/atoms/atomComponents/banner";
import StyleGuide from "./Component/StyleGuide/StyleGuide"

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// toggleModal will both show and hide the modal dialog, depending on current state.  Note that the
// contents of the modal dialog are set separately before calling toggle - this is just responsible
// for showing and hiding the component
function toggleModal(app) {
  app.setState({
    openModal: !app.state.openModal,
  });
}

// the App class defines the main rendering method and state information for the app
class App extends React.Component {
  // the only state held at the app level is whether or not the modal dialog
  // is currently displayed - it is hidden by default when the app is started.
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      refreshPosts: false,
    };

    // in the event we need a handle back to the parent from a child component,
    // we can create a reference to this and pass it down.
    this.mainContent = React.createRef();
    this.doRefreshPosts = this.doRefreshPosts.bind(this);
  }

  // doRefreshPosts is called after the user logs in, to display relevant posts.
  // there are probably more elegant ways to solve this problem, but this is... a way
  doRefreshPosts() {
    this.setState({
      refreshPosts: true,
    });
  }

  render() {
    return (
      // the app is wrapped in a router component, that will render the
      // appropriate content based on the URL path.  Since this is a
      // single page app, it allows some degree of direct linking via the URL
      // rather than by parameters.  Note that the "empty" route "/", which has
      // the same effect as /posts, needs to go last, because it uses regular
      // expressions, and would otherwise capture all the routes.  Ask me how I
      // know this.
      <Router basename={process.env.PUBLIC_URL}>
        <div className={styles.container}>
            <div className={styles.mainContent}>
                {/* Side menu buttons view */}
                <SideMenu/>
                <div className="maincontent" id="mainContent">
                    <Switch>
                        <Route path="/settings/account">
                            <Banner title ={"Account"}/>
                            <div className={styles.innerContent}>
                                <Profile/>
                            </div>
                        </Route>
                        <Route
                            path="/settings/general/aboutus/andrew"
                            component={AboutAndrew}
                            />
                        <Route
                            path="/settings/general/aboutus/william"
                            component={AboutWilliam}
                            />
                          <Route path="/settings/preferences/diet">
                            <Banner title ={"Diet"}/>
                            <div className="diet">
                              <p>Diet</p>
                              <Diet/>
                            </div>
                          </Route>   
                        <Route path="/settings/preferences">
                          <Banner title ={"Preferences"}/>
                            <div className={styles.innerContent}>
                              <Preferences/>
                            </div>
                          </Route>                     
                        <Route path="/settings">
                            <Banner title ={"Settings"}/>
                            <div className={styles.innerContent}>
                                <Settings/>
                            </div>
                        </Route>
                        <Route path="/styleguide">
                            <Banner title ={"Style Guide"}/>
                            <div className={styles.innerContent}>
                                <StyleGuide/>
                            </div>
                        </Route>
                        <Route path="/friends">
                            <div>
                                <p>Friends</p>
                                <FriendForm userid={sessionStorage.getItem("user")} />
                                <FriendList userid={sessionStorage.getItem("user")} />
                            </div>
                        </Route>
                        <Route path="/profile">
                            <Banner title ={"Profile"}/>
                            <div className={styles.innerContent}>
                                <UserProfile/>
                            </div>
                        </Route>
                        <Route path={["/posts", "/"]}>
                            <Banner title ={"Food For Thought"}/>
                            <div className={styles.innerContent}>
                                <div className="container">
                                    <LoginForm refreshPosts={this.doRefreshPosts} />
                                    <PostForm refresh={this.state.refreshPosts} />
                                </div>
                            </div>
                        </Route>
                    </Switch>
                </div>

            <Modal
                show={this.state.openModal}
                onClose={(e) => toggleModal(this, e)}
            >
                This is a modal dialog!
            </Modal>
            </div>
        </div>
      </Router>
    );
  }
}

// export the app for use in index.js
export default App;
