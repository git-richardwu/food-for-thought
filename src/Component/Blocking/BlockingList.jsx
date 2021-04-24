import React from "react";
import "../../App.css";
import unblockIcon from "../../assets/thumbsup.jpg"
import "./blocking.css"
import "../Settings/Settings.css"

export default class BlockingList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: props.userid,
      connections: []
    };
  }

  componentDidMount() {
    this.loadBlock();
  }

  loadBlock() {

    fetch(process.env.REACT_APP_API_PATH+"/connections?type=block&status=active&userID="+sessionStorage.getItem("user"), {
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
            this.setState({
              connections: result[0]
            });
          }
        }
      ).catch(error => console.log(error));
  }

  unblockConnection(id){
    //make the api call to the user controller
    fetch(process.env.REACT_APP_API_PATH+"/connections/"+id, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+sessionStorage.getItem("token")
      },
    })
      .then(
          result => {
          this.loadBlock();
        }
      ).catch(error => console.log(error));
  }

  conditionalAction(status, id){
    if (status == "active"){
      return(
        <button className="backButton unblock" onClick={e => this.unblockConnection(id)}> Unblock </button>
      )
    }
  }

    render() {
        const {connections} = this.state;
        return (
            <div>
                {connections.map(connection => (
                    <div key={connection.id} className="userlist-block">
                        <p className = "wordfont">{connection.connectedUser.username}</p>
                        <div className="deletePost">
                            {this.conditionalAction(connection.status, connection.id)}
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}
