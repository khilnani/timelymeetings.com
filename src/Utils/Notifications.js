import { Capacitor } from '@capacitor/core';
import { LocalNotifications } from '@capacitor/local-notifications';

//////////////////////////////////////////////////////

import doubleBeepAudio from './../assets/audio/double-beep.mp3';
import blankAudio from './../assets/audio/blank.mp3';
import icon128 from './../assets/images/icon-128.png';

//////////////////////////////////////////////////////
//////////////////////////////////////////////////////

let doubleBeepIOSAudioPath = './public/assets/audio/double-beep.aiff';
let enabled = true;

//////////////////////////////////////////////////////
//////////////////////////////////////////////////////

function playEmptyAudio() {
  console.log('playEmptyAudio');
  let a = new Audio(blankAudio);
  a.crossorigin = 'anonymous';
  a.autoplay = true;
  a.play();
}

function playNotificationAudio() {
  console.log('playNotificationAudio');
  let a = new Audio(doubleBeepAudio);
  a.crossorigin = 'anonymous';
  a.autoplay = true;
  a.play();
}

async function checkNativeNotificationsAvailability () {
  console.log('checkNativeNotificationsAvailability');

  playEmptyAudio();
  
  // web, ios, android?
  let isNative = (Capacitor.getPlatform() !== "web");
  console.log('checkNativeNotificationsAvailability - isNative?', isNative);

  // Capacitor?
  let isCapacitorPluginAvailable = await Capacitor.isPluginAvailable('LocalNotifications');    
  console.log('checkNativeNotificationsAvailability - isCapacitorPluginAvailable?', isCapacitorPluginAvailable);

  let avail = false;
  //avail = (isCapacitorPluginAvailable);
  avail = (isNative && isCapacitorPluginAvailable);
  console.log('checkNativeNotificationsAvailability?', avail);
  return avail;
}

async function requestNativeNotificationsPermissions () {
  console.log('requestNativeNotificationsPermissions');

  let avail = false;

  try {
    let p = await LocalNotifications.checkPermissions();
    if (p.display === "granted") {
      avail = true;
    } else {
      let a = await LocalNotifications.requestPermissions();
      if (a.display === "granted") {
        avail = true;
      }
    }
  } catch (error) {
    console.error(error);
  }

  console.log('requestNativeNotificationsPermissions - avail', avail);  
  return avail;
}

async function sendNativeNotification(message, when) {
  console.log('sendNativeNotification', message, when);

  let isNativeNotificationsAvailable = await checkNativeNotificationsAvailability();
  console.log('sendNativeNotification - isNativeNotificationsAvailable?', isNativeNotificationsAvailable);

  if(isNativeNotificationsAvailable && await requestNativeNotificationsPermissions()) {
    try {
      let success = await LocalNotifications.schedule({
        notifications: [
          {
            title: "Timely Meetings",
            body: message,
            id: new Date().getTime(),
            schedule: { at: when },
            sound: doubleBeepIOSAudioPath,
            vibrate: true,
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

async function clearNativeNotifications() {
  console.log('clearNativeNotifications');

  let pending = await getPendingNotifications();
  let notifications = pending.notifications;

  if(notifications && notifications.length > 0) {
    await LocalNotifications.cancel(pending);  
    console.log("clearNativeNotifications - Notifications", notifications);
  }
}

//////////////////////////////////////////////////////
//////////////////////////////////////////////////////

async function checkBrowserNotificationsAvailability () {
  console.log('checkBrowserNotificationsAvailability');

  // https://developer.mozilla.org/en-US/docs/Web/API/Notification/Notification
  // https://web.dev/tags/notifications/
  // https://notifications.spec.whatwg.org/
  let avail = ('Notification' in window);
  console.log('checkBrowserNotificationsAvailability - supported?', avail);
  return avail;
}

async function checkBrowserNotificationsSchedulingAvailability () {
  console.log('checkBrowserNotificationsSchedulingAvailability');

  let NotificationIsSupported = await checkBrowserNotificationsAvailability();
  let avail = false;

  // https://web.dev/notification-triggers/
  avail = (NotificationIsSupported && 'showTrigger' in Notification.prototype);
  console.log("checkBrowserNotificationsSchedulingAvailability - Triggers supported?", avail);
  return avail;
}

async function requestBrowserNotificationsPermissions () {
  console.log('requestBrowserNotificationsPermissions');

  if (checkBrowserNotificationsAvailability()) {
    if (Notification.permission !== "granted") {
      console.log('requestBrowserNotificationsPermissions - being asked.');
      let permission = await Notification.requestPermission();
      console.log('requestBrowserNotificationsPermissions - permission', permission);     
    }
  }

  let avail = (Notification.permission === 'granted');
  console.log('requestBrowserNotificationsPermissions?', avail);
  return avail;
}

async function sendBrowserNotification(message, when) {
  console.log('sendBrowserNotification', message, when);

  if (checkBrowserNotificationsAvailability() && await requestBrowserNotificationsPermissions()) {
    console.log('sendBrowserNotification - permissions already granted, attempting to send.');

    let opts = {
      requireInteraction: true,
      vibrate: [200, 100, 200],
      icon: icon128,
    }

    var notification = new Notification(message, opts);
    notification.onshow = function() { 
      console.log("sendBrowserNotification - Notification displayed");
      playNotificationAudio();
    };
    console.log('sendBrowserNotification - sent', notification);
    
  } else {
    console.log('sendBrowserNotification - permissions denied.');
    alert(message);
  }

}


//////////////////////////////////////////////////////
//////////////////////////////////////////////////////

export async function pauseNotifications() {
  console.log('pauseNotifications - current enabled?', enabled);
  enabled = false;
  await clearScheduledNotifications();
  console.log('pauseNotifications - new enabled?', enabled);
}

export async function enableNotifications() {
  console.log('enableNotifications - current enabled?', enabled);
  enabled = true;
  console.log('enableNotifications - new enabled?', enabled);
}

export async function checkNotificationsAvailability () {
  console.log('checkNotificationsAvailability');

  let n = await checkNativeNotificationsAvailability();
  let b = await checkBrowserNotificationsAvailability();
  await checkBrowserNotificationsSchedulingAvailability();
  
  if(n) {
    await requestNativeNotificationsPermissions();
  } else if(b) {
    await requestBrowserNotificationsPermissions();
  }
}

export async function getPendingNotifications() {
  console.log('getPendingNotifications');

  let pending = {
    notifications: []
  }
  if (await checkNativeNotificationsAvailability()) {
    pending = await LocalNotifications.getPending();
    let notifications = pending.notifications;
    console.log("getPendingNotifications - Notifications", notifications);
  }
  if (await checkBrowserNotificationsSchedulingAvailability()) {
    console.log('getPendingNotifications - Not implemented for Browser');
  }
  return pending;
}

export async function clearScheduledNotifications() {
  console.log('clearScheduledNotifications');
  if (await checkNativeNotificationsAvailability()) {
    await clearNativeNotifications();
  }
  if (await checkBrowserNotificationsSchedulingAvailability()) {
    console.log('clearScheduledNotifications - Not implemented for Browser');
  }
}


export async function sendNotification(message) {
  console.log('sendNotification', message, 'NOW', 'enabled', enabled);

  if(enabled) {
    let when = new Date(Date.now() + 1000);
    let success = await sendNativeNotification(message, when);
    console.log('sendNotification - Native Notifications Sent?', success);

    if (!success) {
      console.log('sendNotification - Attempting Browser Notification.');
      sendBrowserNotification(message, when);
    }
  } else {
    console.log("sendNotification - Disabled");
  }
}

export async function scheduleNotification(message, when) {
  console.log('scheduleNotification', message, when, 'enabled', enabled);

  let success = false;

  if (enabled) {
    if( await checkNativeNotificationsAvailability() ) {
      success = await sendNativeNotification(message, when);  
    }
    if( await checkBrowserNotificationsSchedulingAvailability() ) {
      console.log('scheduleNotification - Not implemented for Browser');
    }
    console.log('scheduleNotification?', success);
  } else {
    console.log("scheduleNotification - Disabled");
  }
  return success;
}

export async function sendTestNotification() {
  console.log('sendTesteNotification (5s)');

  let when = new Date(Date.now() + 1000 * 5);
  let message = when.toLocaleTimeString();

  await scheduleNotification(message, when);
}

//////////////////////////////////////////////////////
//////////////////////////////////////////////////////