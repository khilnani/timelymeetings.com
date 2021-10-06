import { Capacitor } from '@capacitor/core';
import { LocalNotifications } from '@capacitor/local-notifications';


export async function checkNotificationsAvailability () {
  console.log('checkNotificationsAvailability');
  let isCapacitorPluginAvailable = await Capacitor.isPluginAvailable('LocalNotifications');
  console.log('isCapacitorPluginAvailable?', isCapacitorPluginAvailable);

  // https://developer.mozilla.org/en-US/docs/Web/API/Notification/Notification
  // https://web.dev/tags/notifications/
  // https://notifications.spec.whatwg.org/
  var NotificationIsSupported = ('Notification' in window);
  console.log('Browser Notifications supported?', NotificationIsSupported);


  // https://web.dev/notification-triggers/
  if (NotificationIsSupported && 'showTrigger' in Notification.prototype) {
    console.log("Browser Notification Triggers supported?", true);
  } else {
    console.log("Browser Notification Triggers supported?", false);
  }

}


async function checkCapacitorNotificationsAvailability () {
  console.log('checkCapacitorNotificationsAvailability');

  try {
    let isCapacitorPluginAvailable = await Capacitor.isPluginAvailable('LocalNotifications');
    console.log('isCapacitorPluginAvailable?', isCapacitorPluginAvailable);
    
    if ( isCapacitorPluginAvailable ) {
      let p = await LocalNotifications.checkPermissions()
      if (p.display === "granted") {
        return true;
      } else {
        let a = await LocalNotifications.requestPermissions()
        if (a.display === "granted") {
          return true;
        } else {
          return false;
        }
      }
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function sendCapacitorNotification(message, when) {
  console.log('sendCapacitorNotification', message, when);

  let isCapacitorNotificationsAvailable = await checkCapacitorNotificationsAvailability();
  console.log('isCapacitorNotificationsAvailable?', isCapacitorNotificationsAvailable);

  if(isCapacitorNotificationsAvailable) {
    try {
      let success = await LocalNotifications.schedule({
        notifications: [
          {
            title: "TimelyMeetings",
            body: message,
            id: new Date().getTime(),
            schedule: { at: when },
            sound: null,
            attachments: null,
            actionTypeId: "",
            extra: null
          }
        ]
      });
      console.log('Success', success);
      return true; 
    } catch (error) {
      console.error(error);
      return false;
    }
  }
  return false;
}

export async function getPendingNotifications() {
  let pending = await LocalNotifications.getPending();
  let notifications = pending.notifications;
  console.log("Pending Capacitor Notifications", notifications);
  return pending;

}

async function clearCapacitorNotifications() {
  console.log('clearCapacitorNotifications');

  let pending = await getPendingNotifications();
  let notifications = pending.notifications;

  if(notifications && notifications.length > 0) {
    await LocalNotifications.cancel(pending);  
    console.log("Cleared Capacitor Notifications", notifications);
  }
  

}

///////////////////////////////////////////////////////////////

async function sendDefaultNotification(message, when) {

  alert(message);

/*let opts = {
  requireInteraction: true
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
  */
}

///////////////////////////////////////////////////////////////

export async function clearScheduledNotifications() {
  console.log('clearNotifications');
  await clearCapacitorNotifications();
}

export async function sendNotification(message) {
  console.log('sendNotification', message, 'NOW');

  let when = new Date(Date.now() + 1000);
  let success = await sendCapacitorNotification(message, when);
  console.log('Capacitor Notifications Sent?', success);

  if (!success) {
    console.log('Attempting Default Notification.');
    sendDefaultNotification(message, when);
  }
}

export async function scheduleNotification(message, when) {
  console.log('scheduleNotification', message, when);

  let success = await sendCapacitorNotification(message, when);
  console.log('Capacitor Notifications scheduled?', success);

  return success;
}

export async function sendTestNotification() {
  console.log('sendTesteNotification (5s)');
  let when = new Date(Date.now() + 1000 * 5);
  let message = when.toLocaleTimeString();
  await scheduleNotification(message, when);
}