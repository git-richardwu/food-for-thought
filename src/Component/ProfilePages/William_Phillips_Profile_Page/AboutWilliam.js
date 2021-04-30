import { auto } from "@popperjs/core";
import React from "react";
import image from "../../../Images/William.png";
import "../AboutAndrew.css";
import "../../Settings/Settings.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

function AboutWilliam() {
  return (
    <div className="settingsContainer">
        <Link to="/settings/general/aboutus">   
            <button className="backButton backButtonCreate">
                <i className="arrow left"/>
                Back
            </button>
        </Link>
      <img className="imaging"src={image} alt="Picture of William Phillips" />
      <h2>William Phillips</h2>
      <h3 className="subheader">Computer Science BS, Senior</h3>
      <p className="paragraph">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Hello my name is William Phillips. I am currently a senior studying
        Computer Science at the University at Buffalo. I am currently taking CSE
        370, Human Computer Interaces, and my goal for you as a subscriber is to
        develop a sleek and pristine social networking application that provides
        exploratory content into new meals and recipes. I have experience in
        mobile application development, web development, and research experience
        related to Brain Computer Interfaces. In my spare time, I like to watch
        anime, play video games, hang out with friends and research investment
        oppurtunies.
      </p>
      <p className="paragraph">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;As for backstory in how I got into compture science and application
        development, I developed a mobile application as a junior in high school
        that competed in a county wide competetion. My application was
        recognized as a sleek and consise application that simplified that use
        of a mobile device for senior citizens. My app placed third against over
        250 high school and college students within my region and after that
        experience I was devoted to choose a career path in Computer Science. I
        plan to provide a optimal application for each subscriber to find new
        and creative healthy meal recipes that is currently out of their scope.
      </p>
      <p className="contact">Contact: wp26@buffalo.edu</p>
      <p> </p>
      <p> </p>
      <p> </p>
    </div>
  );
}

export default AboutWilliam;

const wills_style = {
  container: {
    flex: 1,
    justifyContent: "center",
  },
  imageStyle: {
    marginTop: 25,
    height: 250,
    width: 250,
  },
  text: {
    textAlign: "justify",
    marginLeft: 250,
    marginRight: 250,
    fontSize: 20,
  },
};
