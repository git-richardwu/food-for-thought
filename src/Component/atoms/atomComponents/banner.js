import React from 'react';
import styles from "../atomStyles/banner.module.css"
import Autocomplete from "../../Autocomplete.jsx";
import Modal from "../../Modal.jsx";
import { BrowserRouter as Router, Redirect, Route, Switch, Link } from "react-router-dom";

function Banner({title}){
    const [friendID, updateFriendID] = React.useState("")
    const [users, updateUsers] = React.useState([])
    const [field, updateField] = React.useState("")
    const [showModal, updateModal] = React.useState(false);

    React.useEffect(()=>{
        fetchUsers();
    }, [field])

    function fetchUsers() {
        fetch(process.env.REACT_APP_API_PATH+"/users/", {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+sessionStorage.getItem("token")
          }
        })
          .then(res => res.json())
          .then(
            result => {
              if (result) {
                let names = [];
                result[0].forEach(element => {if (element.username){names.push(element)}});
                updateUsers(names)
                console.log(names);
              }
            },
          )
          .catch(error => console.log(error));
    }

    function selectAutocomplete(foo) {
        updateFriendID(foo)
        // console.log("Set Friend ID to "+friendID)
    }

      // function submitHandler(name) {
      //   // console.log(name)
      // }
      // document.addEventListener("mousedown", handleClickOutside);
      // document.removeEventListener("mousedown", handleClickOutside);



    return (
      <div>
        <div className={styles.banner}>
            <h1 className={styles.titleStyle}>{title}</h1>
            <button className={styles.button} onClick={() => updateModal(!showModal)}>Find Users!</button> 
        </div>
        <Modal show={showModal} onClose={e => updateModal(!showModal)}>
            <div className="modal-header">
                <h2 className="modal-header-text">Find users to follow!</h2>
            </div>
            <div>
            <form onChange={e => updateField(e.target.value)}>
                <div className="autocomplete">
                    <Autocomplete suggestions={users} selectAutocomplete={e => selectAutocomplete(e)} />
                </div>
            </form>
            </div>
            <div  className="modal-footer">
                <Link to={`/profile/${friendID}`}>
                    <button className="yesButton" onClick={e => updateModal(!showModal)}>Submit</button>
                </Link>
                <button className="noButton" onClick={e => updateModal(!showModal)}>Cancel</button>
            </div>
          </Modal>
          </div>
    )
}

export default Banner;