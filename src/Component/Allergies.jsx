import React,{useState} from 'react';
import "./Allergies.css"



export default class Allergies extends React.Component {
    onButtonClickHandler = () => {
        this.setState({ showMessage: !this.state.showMessage });
      };

    constructor(props) {
      super(props);
      this.state = {
          tags: "",
          showMessage: false
      };
      this.fieldChangeHandler.bind(this);
    }

    componentDidMount() {
        // TODO: add GET here setting this.state.tags
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
                <div className="allergies">
                    <h2>Allergies<i className="allergy"></i></h2>
                    <div className="allergy-choices">
                        <label class="container"> Corn-Free
                            <input type="checkbox"></input>
                            <span class="checkmark"></span>
                        </label>
                        <label class="container">Egg-Free
                            <input type="checkbox"></input>
                            <span class="checkmark"></span>
                        </label>
                        <label class="container"> Fish-Free
                            <input type="checkbox"></input>
                            <span class="checkmark"></span>
                        </label>
                        <label class="container"> Gluten-Free
                            <input type="checkbox"></input>
                            <span class="checkmark"></span>
                        </label>
                        <label class="container">Milk-Free
                            <input type="checkbox"></input>
                            <span class="checkmark"></span>
                        </label>
                        <label class="container"> Peanuts-Free
                            <input type="checkbox"></input>
                            <span class="checkmark"></span>
                        </label>
                        <label class="container"> Sesame-Free
                            <input type="checkbox"></input>
                            <span class="checkmark"></span>
                        </label>
                        <label class="container"> Shellfish Free
                            <input type="checkbox"></input>
                            <span class="checkmark"></span>
                        </label>
                        <label class="container"> Soy-Free
                            <input type="checkbox"></input>
                            <span class="checkmark"></span>
                        </label>
                        <label class="container">Tree Nut-Free
                            <input type="checkbox"></input>
                            <span class="checkmark"></span>
                        </label>
                        <label class="container">Wheat-Free
                            <input type="checkbox"></input>
                            <span class="checkmark"></span>
                        </label>
                    </div>
                </div>
            </div>
        );
    }
}
