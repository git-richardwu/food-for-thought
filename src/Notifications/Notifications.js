import React from "react";
import styles from "./Notifications.module.css";
import { recieveNotificationData } from "./lib.js";

function Notifications() {
    const [notifArray, setNotifArray] = React.useState([])
  React.useEffect(() => {
    recieveNotificationData(sessionStorage.getItem("user"))
    console.log(notifArray)
  });
 

  function recieveNotificationData(userID) {
      let notifArray = []
    fetch(process.env.REACT_APP_API_PATH + "/messages", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          if (result) {
            // console.log(result[0])
            result[0].forEach(async function (notification) {
              if (notification.recipientUser.id === JSON.parse(userID)) {
                

                let obj = notification.content + " from " + notification.author.username
                notifArray.push(obj);
              }
            });
                setNotifArray(notifArray);
            // console.log("Notif array: " + notifArray);
          }
        },
        (error) => {
          console.log("Error occured trying to recieve notifications");
        }
      );
  }

  return (
      
    <div >

        {notifArray.length > 0 && (

        notifArray.map(notif=>(
          <li><NotificationComponent key ={notifArray.indexOf(notif)} message={notif}/></li>
        ))
        )}

        <div className={styles.container}>
        {notifArray.length === 0 && (
            <p>You do not have any notifications.</p>
        )}
        </div>

    </div>
    // {notifArray.map(notif=>(
    //     <NotificationComponent message={notif}/>
    // ))}
    // <NotificationComponent message={notifArray[0]}/>

    // {posts.map(post => (
    //     <Post key={post.id} post={post} type={this.props.type} loadPosts={this.loadPosts} parentid={this.props.parentid}/>
    //   ))}
  );
}



function NotificationComponent({key, message}){
    return(
        <div className={styles.container}>
            <div key ={key} className={styles.notification}>
            <p className={styles.text }>{message} </p>

            </div>
        </div>
    )
}
export default Notifications;
