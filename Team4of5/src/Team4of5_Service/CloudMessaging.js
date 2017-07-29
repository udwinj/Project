

import * as firebase from 'firebase';
import * as Config from './Config.js';


//firebase.initializeApp(Config.firebase_config);




const messaging = firebase.messaging();
export const requestMsgPermission = function(){
    
    messaging.requestPermission().then(
        function(){
            console.log("Have permission!:"+messaging.getToken())
            return messaging.getToken();
        }
    ).then(function(token){
        console.log("Token: "+token);
    })
    .catch(
        function(err){
            console.log("There is an error!")
           console.log(err)
        }
    )
}

messaging.onMessage(function(payload){
    console.log('OnMessage:', payload);
});

// Callback fired if Instance ID token is updated.
messaging.onTokenRefresh(function() {
  messaging.getToken()
  .then(function(refreshedToken) {
    console.log('Token refreshed.');
    console.log(refreshedToken)
    
  })
  .catch(function(err) {
    console.log('Unable to retrieve refreshed token ', err);
    //showToken('Unable to retrieve refreshed token ', err);
  });
});
