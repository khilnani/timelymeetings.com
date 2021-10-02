//-------------------------------
// https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API/Using_the_Notifications_API
// https://developer.mozilla.org/en-US/docs/Web/API/Notification/Notification

function notifyUser(message) {
  console.log('notifyUser', message);

    let opts = {
      requireInteraction: true
    }
    // Let's check if the browser supports notifications
    if (!("Notification" in window)) {
      console.log('Notifications not supported.');
      alert(message);
    }
  
    // Let's check whether notification permissions have already been granted
    else if (Notification.permission === "granted") {
      // If it's okay let's create a notification
      console.log('Notifications already granted, attempting to send.');
      var notification = new Notification(message, opts);
    }
  
    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== "denied") {
      console.log('Notifications permissions being re-asked.');
      Notification.requestPermission().then(function(permission) {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
          console.log('Notifications granted after being initially denied, attempting to send.');
          var notification = new Notification(message, opts);
        } else {
          console.log('Notifications denied after ask.');
          alert(message);
        }
      });
    } else {
      console.log('Notifications denied.');
      alert(message);
    }
  
    // At last, if the user has denied notifications, and you
    // want to be respectful there is no need to bother them any more.
  }