import React from 'react'

// import "../App.css";
import "./foobar.css";
import { Redirect } from "react-router-dom";
import { faKaaba, faShareSquare } from '@fortawesome/free-solid-svg-icons';


export default class SignUp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            username: "",
            invalidEmail: false, 
            emailExists: false,
            usernameExists: false,
            invalidUsername: false,
            invalidPassword: false,
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
        this.setState({
            invalidEmail: false,
            invalidUsername: false,
            invalidPassword: false,
            emailExists: false,
            usernameExists: false
        });
        var errorStatusEmail =  false;

        if(email == "" || !email.includes("@")){
            this.setState({
                invalidEmail: true,
            });
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
                    this.setState({
                        emailExists: true,
                    });
                    return;
                }
            }).catch(error => console.log(error)); 
        }


        if(username == ""){
            this.setState({
                invalidUsername: true,
            });
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
                    this.setState({
                        usernameExists: true,
                    });
                     return;
                 }
             }).catch(error => console.log(error));  
         }
         
        if(password == "" || password.length < 6 || password === password.toLowerCase()){
            this.setState({
                invalidPassword: true,
            });
            return;
        }
        else if (!this.state.emailExists && !this.state.usernameExists) {
        fetch(process.env.REACT_APP_API_PATH+"/auth/signup", { 
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
                
        }).catch(error => console.log(error));       
            // this.refreshPostsFromSignUp();
        }).catch(error => console.log(error));
        }
    }

    render() {
       
        const { redirect } = this.state;
        if(redirect){
           return <Redirect to='/main'/>
        }

        return (

            <div className="signUpContainer">
                <h1 className="header">Sign Up</h1>
                <label>
                    Username: 
                    <input className="textbox" onChange={this.updateUsername} value={this.state.username}/>
                </label>
                
                {this.state.invalidUsername && <p className="errorMessage">Please enter a valid username!</p>}
                {this.state.usernameExists && <p className="errorMessage">Please choose another username, this one already exists. Did you mean to <a href="/login">login</a>?</p>}
                <br />
                <label>
                    Email: 
                    <input className="textbox" type="email" onChange={this.updateEmail} value={this.state.email} />
                </label>
                {this.state.invalidEmail && <p className="errorMessage">Please enter a valid email!</p>}
                {this.state.emailExists && <p className="errorMessage">Please choose another email, this one already exists. Did you mean to <a href="/login">login</a>?</p>}
                <br />
                <label>
                    Password:
                    <input className="textbox" type="password" onChange={this.updatePassword} value={this.state.password}/>
                </label>
                {this.state.invalidPassword && <p className="errorMessage">Please make sure your password is at least 6 
                    characters and contains at least one capital letter!</p>}
                <br/>

                <button className="buttonStyle1" onClick={this.submission}>Sign Up!</button>
            </div>
        )
    }

} 