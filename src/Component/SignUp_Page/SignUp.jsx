import React from 'react'

// import "../App.css";
import "./foobar.css";
import { Redirect } from "react-router-dom";


export default class SignUp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            errorStatus: false,
            errorStatus2: false, 
            redirect: false
        };
        
    }
    
    updateEmail = (event) => {
        this.setState({
            email: event.target.value
        });
    };

    updatePassword = (event) => {
        this.setState({
          password: event.target.value
        });
      };

    submission = () => {
        const email = this.state.email
        const password = this.state.password
        

        if(!email.includes("@") || !email.includes(".com")){
            this.setState({
                errorStatus: true
            })
            if(password == "" || password.length < 6){
            this.setState({
                errorStatus2: true
            })
        }
        }

        else {
        fetch(process.env.REACT_APP_API_PATH+"/auth/signup", {
        // fetch("http://localhost:3001/api/auth/signup", {   
            method: "POST",
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify({
                email: email,
                password: password
            })
        }).then(response => response.json())
        .then(json => {
            console.log(json)
            console.log("Thank you for signing up!")
            sessionStorage.setItem("token", json.token);
            sessionStorage.setItem("user", json.userID);
            // this.refreshPostsFromSignUp();
            this.setState({
                redirect: true
            });
        })
        }
    }
   
    render() {

        const { redirect } = this.state;
        if(redirect){
           return <Redirect to='/posts'/>
        }

        return (
            
            <div className="foobar">
                <h2>Sign Up</h2>
                <label>
                Email
                <input onChange={this.updateEmail} value={this.state.email}/>
                </label>
                <br />
                <label>
                Password
                <input type="password" onChange={this.updatePassword} value={this.state.password}/>
                <br />
                </label>
                
                <button onClick={this.submission}>Sign Up!</button>
                { this.state.errorStatus ? <p>Error: Please enter a valid email!</p> : <div/> }
                { this.state.errorStatus2 ? <p>Error: Please enter a valid password! (Min. Length of 6)</p> : <div/> }
            </div>
        )
    }

}