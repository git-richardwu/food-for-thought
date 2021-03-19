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
            username: "",
            // errorStatus: false,
            // errorStatus2: false, 
            redirect: false
        };

    }

    updateEmail = (event) => {
        this.setState({
            email: event.target.value
        });
    };

    updateUsername = (event) => {
        this.setState({
            username: event.target.value
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
        const username = this.state.username

        var errorStatusEmail =  false;

        if(email == "" || !email.includes("@") || (!email.includes(".com"))){
           alert("Please enter a valid email!")
           return;
        }
        else {
            fetch(process.env.REACT_APP_API_PATH+"/users?email="+email, {
                method: "GET",
                headers: new Headers({
                    'Content-Type': 'application/json',
                }),
            })
            .then(response => response.json())
            .then(json => {
                // console.log(json)
                if(json[1] != 0){
                    errorStatusEmail = true
                    alert("error! Email is taken!")
                    return;
                }
            })   
        }


        if(username == ""){
            alert("Please enter a valid username!")
            return;
         }
         else {
             fetch(process.env.REACT_APP_API_PATH+"/users?username="+username, {
                 method: "GET",
                 headers: new Headers({
                     'Content-Type': 'application/json',
                 }),
             })
             .then(response => response.json())
             .then(json => {
                 // console.log(json)
                 if(json[1] != 0){
                     alert("error! Username is taken!")
                     return;
                 }
             })   
         }

        if(password == "" || password.length < 6 || password == password.toLowerCase){
            alert("Please make sure your password is at least 6 characters and contains at least one capital letter!")
            return;
        }

        // if(errorStatusEmail){    
        //     return;
        // }
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
            this.setState({
                redirect: true
            });
            fetch(process.env.REACT_APP_API_PATH+"/users/"+sessionStorage.getItem("user"), {
            method: "PUT",
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ sessionStorage.getItem("token")
            }),
            body: JSON.stringify({
                email: email,
                username: username
                
            })
        }).then(response => response.json())
            .then(json => {
                console.log(json)
                
        })       
            // this.refreshPostsFromSignUp();
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
                Username
                <input onChange={this.updateUsername} value={this.state.username}/>
                </label>
                <br />
                <label>
                Email
                <input type="email" onChange={this.updateEmail} value={this.state.email} />
                </label>
                <br />
                <label>
                Password
                <input type="password" onChange={this.updatePassword} value={this.state.password}/>
                <br />
                </label>

                <button onClick={this.submission}>Sign Up!</button>
                {/* { this.state.errorStatus ? <p>Error: Please enter a valid email!</p> : <div/> }
                { this.state.errorStatus2 ? <p>Error: Please enter a valid password! (Min. Length of 6)</p> : <div/> } */}
            </div>
        )
    }

} 