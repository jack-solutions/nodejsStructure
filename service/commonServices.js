let FCM = require('fcm-push');

let emailValidator = (params) => {
  let mailFormat = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  if (mailFormat.test(params) == false) {
    return false
  }
  else {
    return true
  }
};

let randomNumber = () => {
  let text = "";
  let possible = "0123456789";
  for (let i = 0; i < 6; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}

let pushNotigication = (userArray,msg) => {

  let fcm = new FCM(process.env.pushNotificationServerKey);
  let arrays= userArray.map(function(user) {
    if(user.deviceId){
      let message = {
        to: user.deviceId, // required fill with device token or topics
        collapse_key: 'your_collapse_key', 
        data: {
          "title":"Notification from PGYM ",
          "body":msg
        },
        notification: {
            title: 'PGYM',
            body: msg
        }
      };
      //promise style
      fcm.send(message)
      .then(function(response){
          console.log("Successfully sent with response: ", response);
      })
      .catch(function(err){
          console.log("Something has gone wrong!");
          console.error(err);
      })
    }
  });
}


module.exports = {
  emailValidator,
  randomNumber,
  pushNotigication
}