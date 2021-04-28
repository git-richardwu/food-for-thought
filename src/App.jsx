/*
  App.js is the starting point for the application.   All of the components in your app should have this file as the root.
  This is the level that will handle the routing of requests, and also the one that will manage communication between
  sibling components at a lower level.  It holds the basic structural components of navigation, content, and a modal dialog.
*/

import React from "react";
import "./App.css";
import BlockingForm from "./Component/Blocking/BlockingForm.jsx";
import BlockingList from "./Component/Blocking/BlockingList.jsx";
import LoginForm from "./Component/LoginForm.jsx";
import Aboutus from "./Component/Settings/Aboutus.js";
import General from "./Component/Settings/General.js";
import Profile from "./Component/Settings/AccountSettings.jsx";
import Preferences from "./Component/Settings/Preferences.js";
import Diet from "./Component/Settings/Preferences/Diet.js";
import Allergies from "./Component/Settings/Preferences/Allergies.js";
import Budget from "./Component/Settings/Preferences/Budget.js";
import SignUp from "./Component/SignUp_Page/SignUp.jsx";
import AboutAndrew from "./Component/ProfilePages/AboutAndrew.js";
import AboutLi from "./Component/ProfilePages/AboutLiWei.js";
import AboutWilliam from "./Component/ProfilePages/William_Phillips_Profile_Page/AboutWilliam";
import AboutHector from "./Component/ProfilePages/AboutHector.js";
import AboutRichard from "./Component/ProfilePages/AboutRichard.js";
import Settings from "./Component/Settings/Settings.js";
import UserProfile from "./Component/UserProfile/UserProfile";
import FollowingList from "./Component/UserProfile/FollowingList";
import SideMenu from "./Component/atoms/atomComponents/sideMenu.js";
import styles from "./Component/UserProfile/UserProfile.module.css";
import Banner from "./Component/atoms/atomComponents/banner";
import StyleGuide from "./Component/StyleGuide/StyleGuide";
import PasswordReset from "./Component/PasswordReset.jsx";
import Posts from "./Component/Posts/Posts.js";
import AddPostButton from "./assets/addPost.svg";
import CreateAPost from "./Component/Posts/CreateAPost.js";
import Notifications from "./Notifications/Notifications.js";
import Modal from "./Component/Modal.jsx"
import { recieveNotification } from "./Notifications/lib";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  Link,
} from "react-router-dom";
import LandingPage from "./Component/LandingPage";
import Privacy from "./Component/Settings/Privacy";

// toggleModal will both show and hide the modal dialog, depending on current state.  Note that the
// contents of the modal dialog are set separately before calling toggle - this is just responsible
// for showing and hiding the component
let interval;
let notifArray = new Array()
let count = 0;

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
      windowWidth: window.innerWidth,
      count: 0,
    };

    // in the event we need a handle back to the parent from a child component,
    // we can create a reference to this and pass it down.
    this.mainContent = React.createRef();
    this.doRefreshPosts = this.doRefreshPosts.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  
  
  handleResize = (e) => {
    this.setState({ windowWidth: window.innerWidth });
   };

  componentDidMount() {
    // if(sessionStorage.getItem("token") !== null){
      window.addEventListener("resize", this.handleResize);

    interval = setInterval(() => {
     let trigger = async () => {
       if(sessionStorage.getItem("user") == null){
         return;
       }

       var count = await recieveNotification(sessionStorage.getItem("user"), notifArray,count);
       console.log(count);
        if(count > 0){
            this.setState({
                count: count
            })
            toggleModal(this);
        }
      }
      trigger();
     
    }, 3000);
  }

  componentWillUnmount() {
    window.addEventListener("resize", this.handleResize);

    clearInterval(interval);
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
              <Route path="/settings/privacy/blockedUsers">
                <SideMenu />
                {/* <Banner title = {"Block User"}/> */}
                <div className="maincontent" id="mainContent">
                  <Banner title={"Block User"} />
                  <BlockingForm userid={sessionStorage.getItem("user")} />
                  <BlockingList userid={sessionStorage.getItem("user")} />
                </div>
              </Route>
              <Route path="/settings/account">
                <SideMenu />
                <div className="maincontent" id="mainContent">
                  <Banner title={"Account"} />
                  <Profile />
                </div>
              </Route>

              <Route path="/settings/general/styleguide">
                <SideMenu />
                <div className="mainHome">
                  <Banner title={"Style Guide"} />
                  <StyleGuide />
                </div>
              </Route>

              <Route path="/settings/general/aboutus/andrew">
                <SideMenu />
                <div className="mainContent">
                  <Banner title={"About Me"} />
                  <AboutAndrew />
                </div>
              </Route>
              
              <Route path="/settings/general/aboutus/li">
                <SideMenu />
                <div className="mainContent">
                  <Banner title={"About Me"} />
                  <AboutLi />
                </div>
              </Route>

              <Route path="/settings/general/aboutus/william">
                <SideMenu />
                <div className="mainContent">
                  <Banner title={"About Me"} />
                  <AboutWilliam />
                </div>
              </Route>

              <Route path="/settings/general/aboutus/richard">
                <SideMenu />
                <div className="mainContent">
                  <Banner title={"About Me"} />
                  <AboutRichard />
                </div>
              </Route>

              <Route path="/settings/general/aboutus/hector">
                <SideMenu />
                <div className="mainContent">
                  <Banner title={"About Me"} />
                  <AboutHector />
                </div>
              </Route>

              <Route path="/reset">
                <div className="maincontent" id="mainContent">
                  <PasswordReset />
                </div>
              </Route>

              <Route path="/settings/preferences/diet">
                <SideMenu/>
                <div className="maincontent" id="mainContent">
                    <Banner title ={"Diet"}/>
                    <Diet/>
                </div>
              </Route>
              <Route path="/settings/preferences/allergies">
                <SideMenu/>
                <div className="maincontent" id="mainContent">
                    <Banner title ={"Allergies"}/>
                    <Allergies/>
                </div>
              </Route>  
              <Route path="/settings/preferences/budget">
                <SideMenu/>
                <div className="maincontent" id="mainContent">
                    <Banner title ={"Budget"}/>
                    <Budget/>
                </div>
              </Route>   
              <Route path="/settings/notifications">
                <SideMenu />
                <div className="mainHome">
                  <Banner title={"Alerts"} />
                    <Notifications />
                </div>
              </Route>
              <Route path="/settings/general/aboutus">
                <SideMenu />
                <div className="maincontent" id="mainContent">
                  <Banner title={"About Us"} />
                    <Aboutus/>
                </div>
              </Route>
              <Route path="/settings/general">
                <SideMenu />
                <div className="maincontent" id="mainContent">
                  <Banner title={"General"} />
                  <General/>
                </div>
              </Route>
              <Route path="/settings/preferences">
                <SideMenu />
                <div className="maincontent" id="mainContent">
                  <Banner title={"Preferences"} />
                  <Preferences />
                </div>
              </Route>

              <Route path="/settings/privacy">
                <SideMenu />
                <div className="maincontent" id="mainContent">
                  <Banner title={"Privacy"} />
                  <Privacy />
                </div>
              </Route>

              <Route path="/settings">
                <SideMenu />
                <div className="maincontent" id="mainContent">
                  <Banner title={"Settings"} />
                  <Settings />
                </div>
              </Route>

              <Route path={["/signup"]}>
                <div className="maincontent" id="mainContent">
                  <SignUp />
                </div>
              </Route>
              <Route path="/profile/:userID">
                <SideMenu />
                <div className="maincontent" id="mainContent">
                  <Banner title={"Profile"} />
                    {window.innerWidth > 850 && ( 
                  <div className={styles.innerContent}>
                  {/* <div> */}
                    <UserProfile />
                    <Link to="/create">
                      <img
                        className="addPostButtonProfile"
                        src={AddPostButton}
                        alt="Create A Post"
                      ></img>
                    </Link>
                  </div>
                  )}
                    {window.innerWidth <= 850 && ( 
                  // <div className={styles.innerContent}>
                   <div> 
                    <UserProfile />
                    <div>
                    <Link to="/create">
                      <img
                        className="addPostButtonProfile"
                        // style= {{height:50, width:50}}
                        src={AddPostButton}
                        alt="Create A Post"
                      ></img>
                    </Link>
                    </div>
                   </div>
                  )}
                </div>
              </Route>

              <Route path="/following/:userID">
                <SideMenu />
                <div className="maincontent" id="mainContent">
                  <Banner title={"Following"} />
                  <div className={styles.innerContent}>
                    <FollowingList />
                  </div>
                </div>
              </Route>

              <Route path={["/create"]}>
                <SideMenu />
                <div className="maincontent" id="mainContent">
                  <Banner title={"Create"} />
                  <CreateAPost />
                </div>
              </Route>
              <Route path={["/home"]}>
                <SideMenu />
                <div className="mainHome">
                  <Banner title={"Home"} />
                  <Posts />
                  <Link to="/create">
                    <img
                      className="addPostButtonHome"
                      src={AddPostButton}
                      alt="Create A Post"
                    ></img>
                  </Link>
                </div>
              </Route>
              <Route path={["/login"]}>
                <div className="maincontent" id="mainContent">
                  <LoginForm refreshPosts={this.doRefreshPosts} />
                </div>
              </Route>
              <Route path="/notifications">
                <SideMenu />
                <div className="mainHome">
                  <Banner title={"Alerts"} />
                    <Notifications />
                </div>
              </Route>
              <Route path={["/"]}>
                <div className="maincontent" id="mainContent">
                  <LandingPage />
                </div>
              </Route>
                </Switch>
                </div>
            </div>
            <Modal
                show={this.state.openModal}
                onClose={(e) => toggleModal(this, e)}>
                <div className="modal-header">
                    <h2 className="modal-header-text">Notifications</h2>
                </div>
                <div className="modal-body">
                    <p className="modalMessage">You have recieved {this.state.count} notification(s)!</p>
                </div>
                <div className="modal-footer">
                    <button  className="yesButton" onClick={e => toggleModal(this, e)}>OK</button>
                </div>
            </Modal>
      </Router>
    );
  }
}

// export the app for use in index.js
export default App;
