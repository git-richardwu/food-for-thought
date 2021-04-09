import React,{useState} from 'react';
import { resultsAriaMessage } from 'react-select/src/accessibility';
import "./Allergies.css"



export default class Allergies extends React.Component {
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
                           tags: results.tags || ""
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

        fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+sessionStorage.getItem("token")
                },
                body: JSON.stringify({
                    name: "tags",
                    value: tags,
                })
            })
                .then(res => res.json())
                .then(
                    result => {
                        this.setState({
                            tags: result.tags
                    });
                    },
                    error => {
                        alert("error!");
                    }
                };
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
            </div>
        );
    }
}
