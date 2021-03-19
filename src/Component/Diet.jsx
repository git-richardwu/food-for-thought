// import React from "react";
// import "../App.css";
// import {
//    Link
// } from 'react-router-dom';
 
// export default class Preferences extends React.Component {
//    constructor(props) {
//      super(props);
//      this.state = {
//        username: "",
//        firstname: "",
//        lastname: "",
//        favoritecolor: "",
//        responseMessage: "",
//        Diet: "",
//        Allergies: "",
//        Budget: 0,
//        Calories: 0,
//        weightGoal: 0
//      };
//      this.fieldChangeHandler.bind(this);
//    }
 
//     fieldChangeHandler(field, e) {
//      console.log("field change");
//      this.setState({
//        [field]: e.target.value
//      });
//    }
//     prefChangeHandler(field, e) {
//      console.log("pref field change " + field);
//      console.log(this.state.favoritecolor);
//      const prefs1 = JSON.parse(JSON.stringify(this.state.favoritecolor));
//      console.log(prefs1);
//      prefs1.value = e.target.value;
//      console.log(prefs1);
//       this.setState({
//        [field]: prefs1
//      });
//    }
//     componentDidMount() {
//      console.log("In profile");
//      console.log(this.props);
//       // first fetch the user data to allow update of username
//      fetch(process.env.REACT_APP_API_PATH+"/users/"+sessionStorage.getItem("user"), {
//        method: "get",
//        headers: {
//          'Content-Type': 'application/json',
//          'Authorization': 'Bearer '+sessionStorage.getItem("token")
//        }
//      })
//        .then(res => res.json())
//        .then(
//          result => {
//            if (result) {
//              console.log(result);
//               this.setState({
//                // IMPORTANT!  You need to guard against any of these values being null.  If they are, it will
//                // try and make the form component uncontrolled, which plays havoc with react
//                username: result.username || "",
//                firstname: result.firstName || "",
//                lastname: result.lastName || ""
//               });
//            }
//          },
//          error => {
//            alert("error!");
//          }
//        );
//       //make the api call to the user API to get the user with all of their attached preferences
//      fetch(process.env.REACT_APP_API_PATH+"/user-preferences?userID="+sessionStorage.getItem("user"), {
//        method: "GET",
//        headers: {
//          'Content-Type': 'application/json',
//          'Authorization': 'Bearer '+sessionStorage.getItem("token")
//        }
//      })
//        .then(res => res.json())
//        .then(
//          result => {
//            if (result) {
//              console.log(result);
//              let favoritecolor = "";
//               // read the user preferences and convert to an associative array for reference
//               // result[0].forEach(function(pref) {
//              //   if (pref.name === "favoritecolor") {
//              //     favoritecolor = pref;
//              //   }
//              // });
//               console.log(favoritecolor);
//               this.setState({
//                // IMPORTANT!  You need to guard against any of these values being null.  If they are, it will
//                // try and make the form component uncontrolled, which plays havoc with react
//                favoritecolor: favoritecolor
//              });
//            }
//          },
//          error => {
//            alert("error!");
//          }
//        );
//    }
//     submitHandler = event => {
//      //keep the form from actually submitting
//      event.preventDefault();
//       //make the api call to the user controller
//      fetch(process.env.REACT_APP_API_PATH+"/users/"+sessionStorage.getItem("user"), {
//        method: "PATCH",
//        headers: {
//          'Content-Type': 'application/json',
//          'Authorization': 'Bearer '+sessionStorage.getItem("token")
//        },
//        body: JSON.stringify({
//           username: this.state.username,
//          firstName: this.state.firstname,
//          lastName: this.state.lastname,
//         })
//      })
//        .then(res => res.json())
//        .then(
//          result => {
//            this.setState({
//              responseMessage: result.Status
//            });
//          },
//          error => {
//            alert("error!");
//          }
//        );
//       let url = process.env.REyACT_APP_API_PATH+"/user-preferences";
//      let method = "POST";
//      let value = this.state.favoritecolor;
//       if (this.state.favoritecolor && this.state.favoritecolor.id){
//        url += "/"+this.state.favoritecolor.id;
//        method = "PATCH";
//        value = this.state.favoritecolor.value;
//      }
 
//      //make the api call to the user prefs controller
//      fetch(url, {
//        method: method,
//        headers: {
//          'Content-Type': 'application/json',
//          'Authorization': 'Bearer '+sessionStorage.getItem("token")
//        },
//        body: JSON.stringify({
//          name: "favoritecolor",
//          value: value,
//        })
//      })
//        .then(res => res.json())
//        .then(
//          result => {
//            this.setState({
//              responseMessage: result.Status
//            });
//          },
//          error => {
//            alert("error!");
//          }
//        );
//     };
//     render() {
//      return (
//        <form onSubmit={this.submitHandler} className="profileform">
//          <div className = "pref">
//          <Dropdown>
//           <Dropdown.Toggle variant="success" id="dropdown-basic">
//             Dropdown Button
//           </Dropdown.Toggle>

//           <Dropdown.Menu>
//             <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
//             <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
//             <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
//           </Dropdown.Menu>
//         </Dropdown>
//            </div>
//            <label>
//                Calorie Count : {this.state.Calories}
//            </label>
//            {this.state.responseMessage}
//        </form>
//      );
//    }
//  }
 


// import React, { Component } from 'react'
// import Select from 'react-select'
// import axios from 'axios'

// export default class Diet extends Component {
//   constructor(props){
//     super(props)
//     this.state = {
//       selectOptions : [],
//       value:[]
//     }
//     }
  

//  async getOptions(){
//     const res = await axios.get('https://jsonplaceholder.typicode.com/users')
//     const data = res.data

//     const options = data.map(d => ({
//       "value" : d.id,
//       "label" : d.name

//     }))

//     this.setState({selectOptions: options})

//   }

//   handleChange(e){
//     this.setState({value:e})
//    }

//   componentDidMount(){
//       this.getOptions()
//   }

//   render() {
//     console.log(this.state.value)
//     return (
//       <div className = "pref">
//         <Select options={this.state.selectOptions} onChange={this.handleChange.bind(this)} isMulti />
//         {
//            this.state.value === null ? "" : this.state.value.map(v => <h4>{v.label}</h4>)
//         }
//       </div>
//     )
//   }
// }

// import * as React from 'react';
// import * as ReactDOM from 'react-dom';

// import { DropDownList } from '@progress/kendo-react-dropdowns';

// class Diet extends React.Component {
//     sizes = [ "X-Small", "Small", "Medium", "Large", "X-Large", "2X-Large" ];
//     state = { value: "Large" };

//     handleChange = (event) => {
//         this.setState({
//             value: event.target.value
//         });
//     }

//     render() {
//         return (
//             <div>
//                 <div>T-shirt size:</div>
//                 <DropDownList
//                     data={this.sizes}
//                     value={this.state.value}
//                     onChange={this.handleChange}
//                 />
//             </div>
//         );
//     }
// }

// ReactDOM.render(
//     <Diet />,
//     document.querySelector('my-app')
// );

// export default Diet;

import React,{useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'


function Diet() {
  const [value,setValue]=useState('');
  const handleSelect=(e)=>{
    console.log(e);
    setValue(e)
  }
  return (
    <div className="pref">
      
      <DropdownButton
      title="Diet Tag"
      id="dropdown-menu-align-right"
      onSelect={handleSelect}
        >
              <Dropdown.Item eventKey="Vegetarian">Vegetarian</Dropdown.Item>
              <Dropdown.Item eventKey="Vegan">Vegan</Dropdown.Item>
              <Dropdown.Item eventKey="Pescatarian">Pescatarian</Dropdown.Item>
      </DropdownButton>
      <h4>You selected "{value}" as a Diet Tag</h4>
    </div>
  );
}

export default Diet;

