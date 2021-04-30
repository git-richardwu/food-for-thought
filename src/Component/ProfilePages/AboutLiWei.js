import React from "react";
import image from "../../Images/li.jpg"
import "./AboutAndrew.css";
import "../Settings/Settings.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

const AboutLi = () => {
    return (
        <div className="settingsContainer">
            <Link to="/settings/general/aboutus">   
                <button className="backButton backButtonCreate">
                    <i className="arrow left"/>
                    Back
                </button>
            </Link>
            <img className="imaging" src={image} alt="Picture of Li Wei Jiang" />
            <h2>Li Wei Jiang</h2>
            <h3 className="subheader">Computer Science BS, Junior</h3>
            <p className="paragraph">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;I am a Computer Science Major studying at University at Buffalo, and this website is a group project I worked on in CSE 370. 
                I am currently a junior and I want to pursue a career as a software engineer with an interest in front-end design. 
                I worked with my fellow group members to make this website to potentially bring together a community of people who are looking to share and learn more about eating a healthy diet.
                Besides that, I find this to be a interesting project and challenge that will broaden my understanding and skills of software engineering.
            </p>
            <p className="contact">Contact: liweijia@buffalo.edu</p>
            <p> </p>
            <p> </p>
            <p> </p>
        </div>
    )
}

export default AboutLi