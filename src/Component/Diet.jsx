import React,{useState} from 'react';
import "./Diet.css"



export default class Diet extends React.Component {
    onButtonClickHandler = () => {
        this.setState({ showMessage: !this.state.showMessage });
      };

    constructor(props) {
      super(props);
      this.state = {
          tags: "",
      };
      this.fieldChangeHandler.bind(this);
    }

    fieldChangeHandler(value, e) {
      console.log("field change");
      if (!this.state.tags.includes(value)){
          // TODO: add POST here
          if (this.state.tags == ""){
              this.setState({
                  tags: value
                });
                fetch(process.env.REACT_APP_API_PATH+"/users-preferences?userID="+sessionStorage.getItem("user"), {
                  method: "POST",
                  headers: {
                   "Content-Type": "application/json",
                   'Authorization': "Bearer " + sessionStorage.getItem("token"),
                  },
                  body: JSON.stringify({
                   "ownerID": sessionStorage.getItem("user"),
                   "category": "dietTag",
                   "type": this.state.tags,
                   "url": "string",
           
                   })
                })
                  .then(res => res.json())
                  .then(
                    result => {
                    }
                  )
                  .catch(error => console.log(error));
                 }
          }
          else{
              var updated = this.state.tags + ", " + value
              this.setState({
                  tags: updated
                });
                fetch(process.env.REACT_APP_API_PATH +"/user-artifacts", {
                  method:"PATCH",
                  headers: {
                    "Content-Type": "application/json",
                    'Authorization': "Bearer " + sessionStorage.getItem("token"),
                  },
                  body: JSON.stringify({
                    "ownerID": sessionStorage.getItem("user"),
                    "category": "dietTag",
                    "type": this.state.tags,
                    "url": "string",
                  }),
                })
                  .then((res) => res.json())
                  .then(
                    (result) => {
                      console.log("This is the result:1 " + result);
                    }
                  )
                  .catch(error => console.log(error)); 
          }

    }

    componentDidMount() {
      fetch(process.env.REACT_APP_API_PATH+"/users/"+sessionStorage.getItem("user"), {
        method: "get",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+sessionStorage.getItem("token")
        }
      })
        .then(res => res.json())
        .then(
          result => {
            if (result) {
              console.log(result);
               this.setState({
               });
            }
          },
        )
        .catch(error => console.log(error));
      }


      
    render() {
        return (
            <div className="pref">
                <div className="dropdown">
                    <h2>Diet Tag<i className="arrowDiet down"></i></h2>
                    <div className="dropdown-content">
                        <button onClick={e => this.fieldChangeHandler("Keto", e)}>Keto</button>
                        <button onClick={e => this.fieldChangeHandler("Low-carb", e)}>Low-carb</button>
                        <button onClick={e => this.fieldChangeHandler("Mediterranean", e)}>Mediterranean</button>
                        <button onClick={e => this.fieldChangeHandler("Paleo", e)}>Paleo</button>
                        <button onClick={e => this.fieldChangeHandler("Pescatarian", e)}>Pescatarian</button>
                        <button onClick={e => this.fieldChangeHandler("Pizza", e)}>Pizza</button>
                        <button onClick={e => this.fieldChangeHandler("Vegan", e)}>Vegan</button>
                        <button onClick={e => this.fieldChangeHandler("Vegetarian", e)}>Vegetarian</button>
                        
                        {/* <button onClick={e => this.fieldChangeHandler("Other", e)}>Other</button> */}
                        {/* <button onclick={this.onButtonClickHandler}>Other</button> */}
                        {/* <button onclick={this.toggleText()}>Other</button> */}
                        {/* {this.state.showMessage && <p>You would like to add: "<input type="text"></input>" as a Diet Tag</p>} */}

                     {/* add more preferences */}
                    </div>
                </div>

                <p className="tags">You selected "{this.state.tags}" as a Diet Tag</p>
                <p>You would like to add: "<input type="text"></input>" as a Diet Tag <button onclick="fieldChangeHandler(value, e)">Submit</button></p>
                {/* <p id='demo' style={{display: "none"}} ref = "tag">Hello Javascript</p>      */}

            </div>
        );
    }
}
