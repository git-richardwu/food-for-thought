import React from "react";
import "../../App.css";
import unblockIcon from "../../assets/thumbsup.jpg"

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

    fetch(process.env.REACT_APP_API_PATH+"/connections?userID="+sessionStorage.getItem("user"), {
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
              isLoaded: true,
              connections: result[0]
            });
          }
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  unblockConnection(id){
    //make the api call to the user controller
    fetch(process.env.REACT_APP_API_PATH+"/connections/"+id, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+sessionStorage.getItem("token")
      },
    //   body: JSON.stringify({
    //     status: status
    //   })
    })
      // .then(res => res.json())
      .then(
        // result => {
          // this.setState({
          //   responseMessage: result.Status
          // });
          result => {
          alert("User Unblocked! Please Refresh Page!");
          this.loadBlock();
        }
        // },
        // error => {
        //   alert("ERROR! ERROR!");
        //   this.loadBlock();
        // }
      );
  }

  conditionalAction(status, id){
    if (status == "active"){
      return(
      <img
        src={unblockIcon}
        className="sidenav-icon deleteIcon"
        alt="Unblock User"
        title="Unblock User"
        onClick={e => this.unblockConnection(id)}
      />
    )
    }
  }

  render() {
    //this.loadPosts();
    const {error, isLoaded, connections} = this.state;
    if (error) {
      return <div> Error: {error.message} </div>;
    } else if (!isLoaded) {
      return <div> Loading... </div>;
    } else {
      return (
        <div className="post">
          <ul>
            {connections.map(connection => (
              <div key={connection.id} className="userlist">
                {connection.connectedUser.username} - {connection.status}
                <div className="deletePost">
                {this.conditionalAction(connection.status, connection.id)}
                </div>
              </div>
            ))}
          </ul>
        </div>
      );
    }
  }
}
