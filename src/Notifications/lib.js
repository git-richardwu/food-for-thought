function sendNotification  (userID, recipientID, message ) {
    fetch(process.env.REACT_APP_API_PATH+"/messages",{
    method: "post",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+sessionStorage.getItem("token")
    },
    body: JSON.stringify({
      "authorID": userID,
      "content": JSON.stringify(message),
      "recipientUserID": JSON.stringify(recipientID)
    })
  })
  .then(res => res.json())
    .then(
      result => {
       console.log("Notification was sent ")
      },
      error => {
        console.log("Error occured when send notification!");
      }
    );
};

 async function recieveNotification(userID, notifArray, counter){
    // let notifArray = []
     counter = 0;
    let entryFound = false
    await fetch(process.env.REACT_APP_API_PATH+"/messages",{
        method: "get",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+sessionStorage.getItem("token")
        },
       
      })
      .then(res => res.json())
      .then(
        result => {
          if (result) {
            // console.log(result[0])
            result[0].forEach(async function(notification){
                // console.log("This is notification: " + notification)
                // console.log("This is userid type:  "  + typeof JSON.parse(userID))
                // console.log("This is notification.recipientUser.id " + notification.recipientUser.id )
                if(notification.recipientUser.id ===  JSON.parse(userID)){
                    // console.log("These are mine notifications")
                    // console.log(notification.author.username + " " + notification.content)
                    if(notifArray.length === 0 ){
                      let obj = {"id": notification.id, "sender" : notification.author.username, "message": notification.content}
                      notifArray.push(obj)
                      counter = counter + 1
                      // console.log("This is notification counter in loop: " + counter)
                    }else{
                    notifArray.forEach(function(entry){
                      if(entry.id === notification.id){
                        entryFound = true
                      }
                    })
                    if(entryFound != true){
                      let obj = {"id": notification.id, "sender" : notification.author.username, "message": notification.content}
                      notifArray.push(obj);
                      counter = counter + 1
                      // console.log("This is notification counter in loop: " + counter)

                    }else{
                      entryFound = false
                    }
                  }
                }
            })
            // console.log("This is counter at right before the end: " + counter)
            // console.log("This is the notification array length " + notifArray.length)
            // console.log("This is counter at the end: " + counter)
            // return JSON.stringify(counter);
            return;
          }
          
        },
        error => {
            console.log("Error occured trying to recieve notifications");
            // return -1;
        }
       
      );
     
      return counter;
      // counter = JSON.stringify(counter)
      // return counter;
      // return counter;
}

 

export { sendNotification, recieveNotification}
