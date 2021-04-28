import React from "react";
import image from "../../Images/richard.jpg"
import "./AboutAndrew.css";
import "../Settings/Settings.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

const AboutRichard = () => {
    return (
        <div className="settingsContainer">
            <Link to="/settings/general/aboutus">   
                <button className="backButton backButtonCreate">
                    <i className="arrow left"/>
                    Back
                </button>
            </Link>
            <img className="imaging" src={image} alt="Picture of Richard Wu" />
            <h2>Richard Wu</h2>
            <h3 className="subheader">Computer Science BS, Junior</h3>
            <p className="paragraph">
                &nbsp;&nbsp;&nbsp;&nbsp;My name is Richard Wu. I am a junior computer science student from the University at Buffalo. I possess a strong interest in front-end development
                and have prior experience developing applications in React. Growing up, I have always had an eye for design due to my interest in pursuing an art career. 
                While those ambitions have become more of a hobby, I now strive to use my creativity to help develop a seamless user experience that is also 
                visually appealing. In my free time, I enjoy listening to music, playing video games, and sleeping.
            </p>
            <p className="contact">Contact: rwu23@buffalo.edu</p>
        </div>
    )
}

export default AboutRichard