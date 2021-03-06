import React from "react";
import logoimage from "../../Images/logo.jpg";
import iconimage from "../../Images/Icon.jpg"
import mainToProfile from "../../Videos/mainToProfile.mp4";
import mainToSettings from "../../Videos/mainToSettings.mp4";
import feedback from "../../Videos/feedback.mp4";
import layout from "../../Videos/layout.mp4";
import inlineError from "../../Videos/inlineError.mp4";
import popup from "../../Videos/popup.mp4";
import "./StyleGuide.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

const StyleGuide = () => {
    return (
        <div className="styleGuideContainer">
            <Link to="/settings/general">   
                <button className="backButton backButtonCreate">
                    <i className="arrow left"/>
                    Back
                </button>
            </Link>
            <h2> Logo </h2>
            <img src = {logoimage} alt = "logo" className = "logosize"/>

            <h2> Icon </h2>
            <img src = {iconimage} alt = "icon" className = "iconsize"/>

            <h2> Fonts</h2>

            <h1 className = "font1h"> 
                Type: Rubik Mono One, Position: Heading 1, Size: 100px
            </h1>
            <h1 className="font1">
                Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj
                Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt
                Uu Vv Ww Xx Yy Zz
            </h1>
 

            <h2 className = "font2h">
                Type: Rubik One, Position: Heading 2, Size: 50px
            </h2>
            <h2 className="font2">
                Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj
                Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt
                Uu Vv Ww Xx Yy Zz      
            </h2>     
            

            <h3 className = "font3h">
                Type: Reem Kufi, Position: Heading 3, Size: 30px
            </h3>
            <h3 className="font3">
                Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj
                Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt
                Uu Vv Ww Xx Yy Zz      
            </h3>             
            


            <h2>Colors</h2>

            <h3> Color: Green, RGB: (111, 211, 151), Hex: #6FD397, Location: Foreground </h3>
            <div><div className="Green"/></div>

            <h3> Color: Light Yellow, RGB: (254, 255, 246), Hex: #FEFFF6, Location: Background </h3>
            <div><div className="LightYellow"/></div>

            <h3> Color: Dark Green, RGB: (89, 163, 118), Hex: #59A376, Location: Background </h3>
            <div><div className="DarkGreen"/></div>

            <h3>Color: White, RGB: (255, 255, 255), Hex: #FFFFFF, Location: Background, Title Text, Icons </h3>
            <div><div className="White"/></div>

            <h3> Color: Black, RGB: (0, 0, 0), Hex: #000000, Location: Body Text</h3>
            <div><div className="Black"/></div>
            <br/>
            <h2>Layout</h2>

            <h3 className="layoutSubHeader">Transition between Pages</h3>
            <p>
                Based on the side navbar: Home (Feed), Notifcations, Profile, Settings.<br/>
                The navbar is the starting point for navigation.<br/>
                Clicking the house gets the user to their main feed. <br/>
                Clicking the bell gets the user to their notifications.<br/>
                Clicking the person gets the user to their profile.<br/>
                Clicking the gear gets the user to the settings page.<br/>
                Friends List on the side allows access to friend???s profiles and access to friend???s chats.</p>
            <video width="750" height="500" controls>
                <source src={mainToProfile} type="video/mp4"/>
            </video>
            <video width="750" height="500" controls>
                <source src={mainToSettings} type="video/mp4"/>
            </video>

            <h3 className="layoutSubHeader">Positioning Guidelines</h3>
            <p>
                The Navbar is on the left hand side, bottom if on mobile.<br/>
                Headers areat the top left-aligned.<br/>
                Contents within a section are center-aligned.<br/>
                Profile pictures are left-aligned.<br/>
                Text is left-aligned.<br/>
                Scroll-bars are right-aligned.<br/>
            </p>
            <video width="750" height="500" controls>
                <source src={layout} type="video/mp4"/>
            </video>

            <h3 className="layoutSubHeader">Styles for Modal Dialogs</h3>
            <p>
                Modal Dialogs appear in three (3) scenarios: displaying a message (such as login failed), <br/>
                requring input (such as submitting profile picture), asking for confirmation <br/>
                (such as deleting a post or comment). <br/> 
                All Modal Dialogs should have a header title, a body displaying the mesasge, and the buttons in the footer. <br/>
                The OK/Yes button should be green while the No/Cancel button should be red.

            </p>
            <video width="750" height="500" controls>
                <source src={popup} type="video/mp4"/>
            </video>

            <h3 className="layoutSubHeader">Inline Error Messages</h3>
            <p>
                Any input that requires validation has inline error messages <br/>
                Inline error messages appear below the specifed input box where input validation has failed.
            </p>
            <video width="750" height="500" controls>
                <source src={inlineError} type="video/mp4"/>
            </video>

            <h3 className="layoutSubHeader">Feedback</h3>
            <p>
                On all buttons, we switch from mouse to a hand cursor.<br/>
                On text fields, we switch from mouse to I-beam pointer.<br/>
                Back buttons have an arrow pointing left on the button.<br/>
                Buttons that go to a another page have an arrow pointing right.<br/>
                The scroll bar provides measured feedback to user and provides the length of <br/>
                the content that has been scrolled within a webpage.<br/>
            </p>
            <video width="750" height="500" controls className="lastVideo">
                <source src={feedback} type="video/mp4"/>
            </video>
        </div>
    )

}

export default StyleGuide