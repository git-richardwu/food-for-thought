import React from "react";
import styles from "./Notifications.module.css";
import { recieveNotificationData } from "./lib.js";

function Notifications() {
    const [notifArray, setNotifArray] = React.useState([])
  React.useEffect(() => {
        recieveNotificationData(sessionStorage.getItem("user"))
  });
 

  function recieveNotificationData(userID) {
      let notifArray1 = []
    fetch(process.env.REACT_APP_API_PATH + "/messages?recipientUserID="+userID, {
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
            result[0].forEach(async function (notification) {
                let obj = notification.content + " from " + notification.author.username
                notifArray1.push(obj);
            });
 
            // for some reason this led to constant api calls (which never stop). This could overload the api and lead to long requests
            if (notifArray.length !== notifArray1.length){
                setNotifArray(notifArray1);
            }
          }
        },
        (error) => {
          console.log("Error occured trying to recieve notifications");
        }
      );
  }

  return (
      
    <div className={styles.container}>
        <div className={styles.notifications}>
            {notifArray.length > 0 && (

            notifArray.map(notif=>(
                <NotificationComponent key={notifArray.indexOf(notif)} message={notif}/>
            ))
            )}

            {notifArray.length === 0 && (
                <p>You do not have any notifications.</p>
            )}
        </div>
    </div>
  );
}



function NotificationComponent({key, message}){
    return(
            <div key ={key} className={styles.notification}>
                <p className={styles.text }>{message} </p>
            </div>
    )
}
export default Notifications;
