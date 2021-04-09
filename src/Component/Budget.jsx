import React,{useState} from 'react';
import "./Diet.css"



export default class Budget extends React.Component {
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

    componentDidMount() {
        // TODO: add GET here setting this.state.tags
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
                           // IMPORTANT!  You need to guard against any of these values being null.  If they are, it will
                           // try and make the form component uncontrolled, which plays havoc with react
                           username: result.username || "",
                           firstname: result.firstName || "",
                           lastname: result.lastName || ""
                          });
                       }
                     },
                     error => {
                       alert("error!");
                     }
                   );
      }

    fieldChangeHandler(value, e) {
        console.log("field change");
        
        
        if (!this.state.tags.includes(value)){
            // TODO: add POST here
            if (this.state.tags == ""){
                this.setState({
                    tags: value
                  });
            }
            else{
                var updated = this.state.tags + ", " + value
                this.setState({
                    tags: updated
                  });
            }
        }
      }
      

    render() {
        return (
            <div className="pref">
                <h2>Budget</h2>
                <p>You would like to spend $<input type="text"></input> dollars a week<button className="Submit">Submit</button></p> 
                
                {/* <p id='demo' style={{display: "none"}} ref = "tag">Hello Javascript</p>      */}

            </div>
        );
    }
}