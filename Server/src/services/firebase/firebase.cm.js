/**
 * Created by k1nval on 10/15/2016.
 */
import FCM from 'fcm-node';

export class FirebaseCloudMessager {
  constructor(apiKey){
    this.fcm = new FCM(apiKey);
  }

  sendMessage(toToken, title, body){
    var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
      to: toToken,
      collapse_key: 'your_collapse_key',

      notification: {
        title: title,
        body: body
      },

      data: {  //you can send only notification or only data(or include both)
        my_key: 'my value',
        my_another_key: 'my another value'
      }
    };

    var promise = new Promise((res,rej)=>{
      this.fcm.send(message, function(err, response){
        if (err) {
          console.log("Something has gone wrong!",err);
          rej(response);
        } else {
          console.log("Successfully sent with response: ", response);
          res(response);
        }
      });
    })



    return promise;
  }
}
