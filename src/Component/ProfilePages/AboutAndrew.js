import React from "react";
import image from "../../Images/andrew.JPG"
import "./AboutAndrew.css";
import "../Settings/Settings.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

const AboutAndrew = () => {
    return (
        <div className="settingsContainer">
            <Link to="/settings/general/aboutus">   
                <button className="backButton backButtonCreate">
                    <i className="arrow left"/>
                    Back
                </button>
            </Link>
            <img className="imaging" src={image} alt="Picture of Andrew Jank" />
            <h2>Andrew Jank</h2>
            <h3 className="subheader">Computer Science BS, Senior</h3>
            <p className="paragraph">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;My name is Andrew Jank. I am a currently in my 4th year majoring in Computer Science at University at Buffalo.
                I grew up in the Buffalo area. I started my educational journey going to elementary school at Saint John Vianney and then attending Canisius High School. 
                Some of my interests include gaming, Star Wars, and technology. 
                I spend my free playing video games with friends, reading or watching the newest Star Wars content, or looking into the newest tech seeing if 
                I could have any use for it. 
            </p>
            <p className="paragraph">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;In Spring 2019, I was hired as an Intern at GP Strategies, a provider of sales and technical training, E-learning, management consulting and engineering 
                services. The office I work at develops their application called EtaPRO®, which optimizes the performance of power plants. Working with the team on EtaPRO® 
                has helped me become a better developer. Through my internship I am being mentored by several senior developers on the team. I have learned a lot about
                the .NET Framework, communication skills, user interface design, critical thinking and problem solving. 
            </p>
            <p className="contact">Contact: arjank@buffalo.edu</p>
            <p> </p>
            <p> </p>
            <p> </p>
        </div>
    )
}

export default AboutAndrew
