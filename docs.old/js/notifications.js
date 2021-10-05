//-------------------------------
// https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API/Using_the_Notifications_API
// https://developer.mozilla.org/en-US/docs/Web/API/Notification/Notification


async function checkNativeNotification () {
  console.log('checkNativeNotification');
  try {
    if ( Capacitor.isPluginAvailable('LocalNotifications') ) {
      let p = await Capacitor.Plugins.LocalNotifications.checkPermissions()
      if (p.display == "granted") {
        return true;
      } else {
        let a = await Capacitor.Plugins.LocalNotifications.requestPermissions()
        if (a.display == "granted") {
          return true;
        } else {
          return false;
        }
      }
    } else {
      return false;
    }
  } catch (error) {
    alert(error);
    return false;
  }
}

async function sendNativeNotification(message) {
  console.log('sendNativeNotification');
  try {
    if ( Capacitor.isPluginAvailable('LocalNotifications') ) {
      let e = await Capacitor.Plugins.LocalNotifications.areEnabled()
      if(e.value) {
        let r =  await Capacitor.Plugins.LocalNotifications.schedule({
          notifications: [
            {
              title: "TimelyMeetings",
              body: message,
              id: 1,
              schedule: { at: new Date(Date.now() + 1000 * 5) },
              sound: null,
              attachments: null,
              actionTypeId: "",
              extra: null
            },
          ],
        });
        console.log('r', r);
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } catch (error) {
    alert(error);
    return false;
  }
}


async function notifyUser(message) {
  console.log('notifyUser', message);

    let opts = {
      requireInteraction: true
    }

    let nativeEnabled = await checkNativeNotification();
    console.log('Native Notifications Enabled', nativeEnabled);

    if (nativeEnabled) {
      let success = await sendNativeNotification(message);
      console.log('Native Notification Sent', success);
      if (success) {
        return;
      }
    }

    // Let's check if the browser supports notifications
    if (!("Notification" in window)) {
      console.log('Browser Notifications not supported.');
      alert(message);
    }
  
    // Let's check whether notification permissions have already been granted
    else if (Notification.permission === "granted") {
      // If it's okay let's create a notification
      console.log('Browser Notifications already granted, attempting to send.');
      var notification = new Notification(message, opts);
    }
  
    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== "denied") {
      console.log('Browser Notifications permissions being re-asked.');
      Notification.requestPermission().then(function(permission) {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
          console.log('Browser Notifications granted after being initially denied, attempting to send.');
          var notification = new Notification(message, opts);
        } else {
          console.log('Browser Notifications denied after ask.');
          alert(message);
        }
      });
    } else {
      console.log('Browser Notifications denied.');
      alert(message);
    }
  
    // At last, if the user has denied notifications, and you
    // want to be respectful there is no need to bother them any more.
  }