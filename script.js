// Based on https://www.sitepoint.com/build-javascript-countdown-timer-no-dependencies/
// CSS from https://stackoverflow.com/questions/7082257/css-how-to-skin-a-select-box-with-css

let timeinterval = undefined;

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
  clearInterval(timeinterval);

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

    console.log("t.total", t.total);

    if (t.total > 5 * 60 * 1000) {
      document.body.style.backgroundColor = "#00ECB9"; // default
    } else {
      document.body.style.backgroundColor = "#FBF719"; // yellow
    }

    if (t.total <= 0) {
      clearInterval(timeinterval);
      document.body.style.backgroundColor = "#FFFFFF"; // yellowwhite
    }
  }

  updateClock();

  timeinterval = setInterval(updateClock, 1000);
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

  console.log("minsLeft", minsLeft);

  const deadline = new Date(Date.parse(new Date()) + minsLeft * 60 * 1000);

  initializeClock("clockdiv", deadline);
}

setMeetingDuration();
