import React,{useState} from 'react';
import "./Allergies.css"



export default class Allergies extends React.Component {
    onButtonClickHandler = () => {
        this.setState({ showMessage: !this.state.showMessage });
      };

    constructor(props) {
      super(props);
      this.state = {
          allergies: "",
      };
      this.fieldChangeHandler.bind(this);
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
 
                           username: result.username || "",
                           firstname: result.firstName || "",
                           lastname: result.lastName || "",
                        //    tags: results.tags || ""
                          });
                       }
                     }
                   )
                   .catch(error => console.log(error));

      }

    fieldChangeHandler(value, e) {
        console.log("field change");
        if (!this.state.allergies.includes(value)){
            if (this.state.allergies == ""){
                this.setState({
                    allergies: value
                  });
                  fetch(process.env.REACT_APP_API_PATH +"/user-artifacts", {
                    method:"POST",
                    headers: {
                      "Content-Type": "application/json",
                      'Authorization': "Bearer " + sessionStorage.getItem("token"),
                    },
                    body: JSON.stringify({
                      "ownerID": sessionStorage.getItem("user"),
                      "category": "allergies",
                      "type": this.state.allergies,
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
            else{
                var updated = this.state.allergies + ", " + value
                this.setState({
                    allergies: updated
                  });
                  

                

            }
        }
};

    render() {
        return (
            <div className="pref">
                <div className="allergies">
                    <h2>Allergies<i className="allergy"></i></h2>
                    <div className="allergy-choices">
                        <label class="container"> Corn-Free
                            <input type="checkbox" onClick={e => this.fieldChangeHandler("Corn-Free", e)}></input>
                            <span class="checkmark"></span>
                        </label>
                        <label class="container">Egg-Free
                            <input type="checkbox" onClick={e => this.fieldChangeHandler("Egg-Free", e)}></input>
                            <span class="checkmark" ></span>
                        </label>
                        <label class="container"> Fish-Free
                            <input type="checkbox" onClick={e => this.fieldChangeHandler("Fish-Free", e)}></input>
                            <span class="checkmark"></span>
                        </label>
                        <label class="container"> Gluten-Free
                            <input type="checkbox" onClick={e => this.fieldChangeHandler("Gluten-Free", e)}></input>
                            <span class="checkmark"></span>
                        </label>
                        <label class="container">Milk-Free
                            <input type="checkbox" onClick={e => this.fieldChangeHandler("Milk-Free", e)}></input>
                            <span class="checkmark"></span>
                        </label>
                        <label class="container"> Peanuts-Free
                            <input type="checkbox" onClick={e => this.fieldChangeHandler("Peanuts-Free", e)}></input>
                            <span class="checkmark"></span>
                        </label>
                        <label class="container"> Sesame-Free
                            <input type="checkbox" onClick={e => this.fieldChangeHandler("Sesame-Free", e)}></input>
                            <span class="checkmark"></span>
                        </label>
                        <label class="container"> Shellfish-Free
                            <input type="checkbox" onClick={e => this.fieldChangeHandler("Shellfish-Free", e)}></input>
                            <span class="checkmark"></span>
                        </label>
                        <label class="container"> Soy-Free
                            <input type="checkbox" onClick={e => this.fieldChangeHandler("Soy-Free", e)}></input>
                            <span class="checkmark"></span>
                        </label>
                        <label class="container">Tree Nut-Free
                            <input type="checkbox" onClick={e => this.fieldChangeHandler("Tree Nut-Free", e)}></input>
                            <span class="checkmark"></span>
                        </label>
                        <label class="container">Wheat-Free
                            <input type="checkbox"onClick={e => this.fieldChangeHandler("Wheat-Free", e)}></input>
                            <span class="checkmark"></span>
                        </label>
                    </div>
                </div>
                <p className="tags">You selected "{this.state.allergies}" as allergies</p>
            </div>
        );
    }
}
