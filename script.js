let timeInterval = undefined;
let notificationWarningSent = false

// https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API/Using_the_Notifications_API
// https://developer.mozilla.org/en-US/docs/Web/API/Notification/Notification

function notifyUser(message) {

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
    Notification.requestPermission().then(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        console.log('Notifications granted after being initially denied, attempting to send.');
        var notification = new Notification(message, opts);
      } else {
        console.log('Notifications denied after ask.');
        alert(message);
      }
    });
  }

  else {
    console.log('Notifications denied.');
    alert(message);
  }

  // At last, if the user has denied notifications, and you
  // want to be respectful there is no need to bother them any more.
}

// Based on https://www.sitepoint.com/build-javascript-countdown-timer-no-dependencies/
// CSS from https://stackoverflow.com/questions/7082257/css-how-to-skin-a-select-box-with-css

function getTimeRemaining(endtime) {
  const total = Date.parse(endtime) - Date.parse(new Date());
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  return {
    total,
    days,
    hours,
    minutes,
    seconds
  };
}

function initializeClock(id, endtime) {
  clearInterval(timeInterval);
  notificationWarningSent = false;

  const clock = document.getElementById(id);
  const daysSpan = clock.querySelector(".days");
  const hoursSpan = clock.querySelector(".hours");
  const minutesSpan = clock.querySelector(".minutes");
  const secondsSpan = clock.querySelector(".seconds");

  function updateClock() {
    const t = getTimeRemaining(endtime);

    daysSpan.innerHTML = t.days;
    hoursSpan.innerHTML = ("0" + t.hours).slice(-2);
    minutesSpan.innerHTML = ("0" + t.minutes).slice(-2);
    secondsSpan.innerHTML = ("0" + t.seconds).slice(-2);

    // console.log("t.total", t.total);

    if (t.total > 5 * 60 * 1000) {
      document.body.style.backgroundColor = "#00ECB9"; // default
    } else {
      document.body.style.backgroundColor = "#FBF719"; // yellow
      if (!notificationWarningSent) 
      {
        notificationWarningSent = true
        notifyUser('Your meeting will end within 5 minutes');
      }
    }

    if (t.total <= 0) {
      clearInterval(timeInterval);
      document.body.style.backgroundColor = "#FFFFFF"; // white
      notifyUser('Your meeting has ended');
    }
  }

  updateClock();

  timeInterval = setInterval(updateClock, 1000);
}

function setMeetingDuration() {
  let select = undefined;

  select = document.getElementById("meetingDuration");
  let meetingDurationTime = Number(select.options[select.selectedIndex].value);
  console.log("meetingDurationTime", meetingDurationTime);

  select = document.getElementById("meetingOffset");
  const meetingOffsetTime = Number(select.options[select.selectedIndex].value);
  console.log("meetingOffsetTime", meetingOffsetTime);

  select = document.getElementById("meetingWarning");
  const meetingWarningTime = Number(select.options[select.selectedIndex].value);
  console.log("meetingWarningTime", meetingWarningTime);

  let targetMins = undefined;
  let meetingStartedAtmins = undefined;
  let now = new Date();
  let hours = now.getHours();
  let mins = now.getMinutes();
  console.log("mins", mins);

  // Calc based on meeting duration
  if (mins < meetingDurationTime) {
    meetingStartedAtmins = 0;
  } else {
    meetingStartedAtmins = mins - (mins % meetingDurationTime);
  }

  console.log("meetingStartedAtmins", meetingStartedAtmins);

  targetMins = meetingStartedAtmins + meetingDurationTime;

  console.log("targetMins", targetMins);

  let minsLeft = targetMins - mins + meetingOffsetTime;

  if (minsLeft > meetingWarningTime) {
    minsLeft = minsLeft - meetingWarningTime;
  }
  
  let speedyMeetingTime = document.getElementById('speedyMeeting').checked;
  console.log('speedyMeetingTime', speedyMeetingTime, typeof(speedyMeetingTime))
  
  let speedyMeetingAmount = 5;
  if (meetingDurationTime > 30) {
    speedyMeetingAmount = 10
  } 

  if (speedyMeetingTime === true && minsLeft > speedyMeetingAmount) {
    console.log('Applying speedyMeetingTime');
    minsLeft = minsLeft - speedyMeetingAmount;
  }

  console.log("minsLeft", minsLeft);

  const deadline = new Date(Date.parse(new Date()) + minsLeft * 60 * 1000);

  initializeClock("clockdiv", deadline);
}

setMeetingDuration();

