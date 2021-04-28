import React from "react";
import image from "../../Images/hector.jpg"
import "./AboutAndrew.css";
import "../Settings/Settings.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

const AboutHector = () => {
    return (
        <div className="settingsContainer">
            <Link to="/settings/general/aboutus">   
                <button className="backButton backButtonCreate">
                    <i className="arrow left"/>
                    Back
                </button>
            </Link>
            <img className="imaging"  src={image} alt="Picture of Hector Sosa" />
            <h2>Hector J. Sosa</h2>
            <h3 className="subheader">Psychology BS and Computer Science Minor, Senior</h3>
            <p className="paragraph">
                &nbsp;&nbsp;&nbsp;&nbsp;Hello, my name is Hector. I am 21 years old and I am currently a senior at the University at Buffalo, majoring in Psychology with a minor in Computer Science!
                I was recently accepted into a PhD program for Social Psychology at the University of Massachusetts - Amherst. I hope to combine my computational skills from my minor
                to answer research questions within the field of social psychology. Outside of school, I enjoy listening to music, reading, and watching anime.
            </p>
            <p className="contact">Contact: hectorso@buffalo.edu</p>
        </div>
    )
}

export default AboutHector