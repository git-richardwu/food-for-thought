/*
  App.js is the starting point for the application.   All of the components in your app should have this file as the root.
  This is the level that will handle the routing of requests, and also the one that will manage communication between
  sibling components at a lower level.  It holds the basic structural components of navigation, content, and a modal dialog.
*/

import React from "react";
import "./App.css";
import BlockingForm from "./Component/Blocking/BlockingForm.jsx"
import BlockingList from "./Component/Blocking/BlockingList.jsx"
import PostForm from "./Component/PostForm.jsx";
import FriendList from "./Component/FriendList.jsx";
import LoginForm from "./Component/LoginForm.jsx";
import Profile from "./Component/Settings/AccountSettings.jsx";
import Preferences from "./Component/Settings/Preferences.js"
import Diet from "./Component/Diet.jsx"
import FriendForm from "./Component/FriendForm.jsx";
import Modal from "./Component/Modal.jsx";
import Navbar from "./Component/Navbar.jsx";
import SignUp from "./Component/SignUp_Page/SignUp.jsx";
import AboutAndrew from "./Component/ProfilePages/AboutAndrew.js";
import AboutWilliam from "./Component/ProfilePages/William_Phillips_Profile_Page/AboutWilliam";
import Settings from "./Component/Settings/Settings.js"
import UserProfile from "./Component/UserProfile/UserProfile";
import SideMenu from "./Component/atoms/atomComponents/sideMenu.js"
import styles from "./Component/UserProfile/UserProfile.module.css";
import Banner from "./Component/atoms/atomComponents/banner";
import StyleGuide from "./Component/StyleGuide/StyleGuide";
import PasswordReset from "./Component/PasswordReset.jsx";
import PostingList from "./Component/PostingList.jsx";
import Posts from "./Component/Posts/Posts.js";
import AddPostButton from "./assets/addPost.svg";
import CreateAPost from "./Component/Posts/CreateAPost.js";

import { BrowserRouter as Router, Redirect, Route, Switch, Link } from "react-router-dom";
import LandingPage from "./Component/LandingPage";
import Privacy from "./Component/Settings/Privacy";

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
                    <Switch>
                        {/* <Route path="/friends">
                            <div>
                            <p>Friends</p>
                            <FriendForm userid={sessionStorage.getItem("user")} />
                            <FriendList userid={sessionStorage.getItem("user")} />
                            </div>
                        </Route> */}
                        <Route path="/blocked">
                            <div>
                            <p>Blocked Users</p>
                            <BlockingForm userid={sessionStorage.getItem("user")} />
                            <BlockingList userid={sessionStorage.getItem("user")} />
                            </div>
                        </Route>
                        <Route path="/settings/account">
                            <SideMenu/>
                            <div className="maincontent" id="mainContent">
                                <Banner title ={"Account"}/>
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
                        <Route path="/reset">
                            <div className="maincontent" id="mainContent">
                                <PasswordReset/>
                            </div>
                        </Route>
                        <Route path="/settings/preferences/diet">
                            <SideMenu/>
                            <div className="maincontent" id="mainContent">
                                <Banner title ={"Diet"}/>
                                <div className="diet">
                                    <Diet/>
                                </div>
                            </div>
                          </Route> 
                        <Route path="/settings/preferences">
                            <SideMenu/>
                            <div className="maincontent" id="mainContent">
                                <Banner title ={"Preferences"}/>
                                <Preferences/>
                            </div>
                          </Route>
                        <Route path="/settings/privacy">
                            <SideMenu/>
                            <div className="maincontent" id="mainContent">
                                <Banner title ={"Privacy"}/>
                                <Privacy/>
                            </div>
                        </Route> 
                        <Route path="/settings">
                            <SideMenu/>
                            <div className="maincontent" id="mainContent">
                                <Banner title ={"Settings"}/>
                                <Settings/>
                            </div>
                        </Route>
                        <Route path={["/signup"]}>
                            <div className="maincontent" id="mainContent">
                                <SignUp/>
                            </div>
                        </Route>
                        <Route path="/styleguide">
                            <SideMenu/>
                            <div className="mainHome">
                                <Banner title ={"Style Guide"}/>
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
                        <Route path="/profile/:userID">
                            <SideMenu/>
                            <div className="maincontent" id="mainContent">
                                <Banner title ={"Profile"}/>
                                <div className={styles.innerContent}>
                                    <UserProfile />
                                    <Link to="/create">
                                        <img className="addPostButtonProfile" src ={AddPostButton}></img>
                                    </Link>
                                </div>
                            </div>
                        </Route>
                        <Route path={["/create"]}>
                            <SideMenu/>
                            <div className="maincontent" id="mainContent">
                                <Banner title ={"Create"}/>
                                <CreateAPost/>
                            </div>
                        </Route>
                        <Route path={["/home"]}>
                            <SideMenu/>
                            <div className="mainHome">
                                <Banner title ={"Home"}/>
                                <Posts/>
                                <Link to="/create">
                                    <img className="addPostButtonHome" src ={AddPostButton}></img>
                                </Link>
                            </div>
                        </Route>
                        <Route path={["/login"]}>
                            <div className="maincontent" id="mainContent">
                                <LoginForm refreshPosts={this.doRefreshPosts} />
                            </div>
                        </Route>
                        <Route path={["/"]}>
                            <div className="maincontent" id="mainContent">                               
                                <LandingPage/>
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
      </Router>
    );
  }
}

// export the app for use in index.js
export default App;
