let timeInterval = undefined;
let notificationWarningSent = false
let notificationFinalSent = false

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

//-------------------------------

async function initializeClock(id, endtime) {
  clearInterval(timeInterval);
  notificationWarningSent = false;
  notificationFinalSent = false;

  const clock = document.getElementById(id);
  const hoursSpan = clock.querySelector(".hours");
  const minutesSpan = clock.querySelector(".minutes");
  const secondsSpan = clock.querySelector(".seconds");

  async function updateClock() {
    const t = getTimeRemaining(endtime);
    console.log("updateClock");
    //console.log("updateClock", t.total);

    if (t.total > 5 * 60 * 1000) {
      document.body.style.backgroundColor = "#00ECB9"; // default
    } else {
      document.body.style.backgroundColor = "#FBF719"; // yellow
      if (!notificationWarningSent) {
        notificationWarningSent = true
        await notifyUser('Your meeting will end within 5 minutes');
      }
    }

    if (t.total <= 0) {
      clearInterval(timeInterval);
      document.body.style.backgroundColor = "#FFFFFF"; // white
      if (!notificationFinalSent) {
        notificationFinalSent = true
        await notifyUser('Your meeting has ended');
      }
    }

    hoursSpan.innerHTML = ("0" + t.hours).slice(-2);
    minutesSpan.innerHTML = ("0" + t.minutes).slice(-2);
    secondsSpan.innerHTML = ("0" + t.seconds).slice(-2);
  }

  await updateClock();

  timeInterval = setInterval(updateClock, 1000);
}