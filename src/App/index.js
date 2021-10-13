import React, { Component } from "react";

import { Capacitor } from '@capacitor/core';

import { SplashScreen } from '@capacitor/splash-screen';
import { App as CapacitorApp } from '@capacitor/app';
import { Browser } from '@capacitor/browser';

import {
  RefreshCircle as RefreshCircleIcon,
  Notifications as NotificationsEnabledIcon,
  NotificationsOffOutline as NotificationsDisabledIcon
} from 'react-ionicons'

import * as State from '../Utils/State'
import * as Utils from '../Utils/DateUtils'
import * as Notifications from '../Utils/Notifications'

//////////////////////////////////////////////////////

import version from '../version.json'
import './App.css';
import logoImage from './../assets/images/logo-trans-512.png'

//////////////////////////////////////////////////////
//////////////////////////////////////////////////////

let timeInterval = undefined;
let notificationWarningSentOrScheduled = false
let notificationFinalSentOrScheduled = false

const message_warning = 'Your meeting will end in ';
const message_end = 'Your meeting has ended';
const browser_title = 'Timely Meetings | Meeting Countdown Timer';

const supportLink = "mailto:support@timelymeetings.com";

// web, ios, android.
const isNative = (Capacitor.getPlatform() !== "web");

//////////////////////////////////////////////////////
//////////////////////////////////////////////////////

/*
NativeApp.addListener('appStateChange', ({ isActive }) => {
  console.log('App state changed. Is active?', isActive);
});

NativeApp.addListener('appUrlOpen', data => {
  console.log('App opened with URL:', data);
});

NativeApp.addListener('appRestoredResult', data => {
  console.log('Restored state:', data);
});
*/
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////

class App extends Component {

  //////////////////////////////////////////////////////

  constructor() {
    super();
    this.state = {
      enabled: false,
    };

    this.onDurationChange = this.onDurationChange.bind(this);
    this.onSpeedyChange = this.onSpeedyChange.bind(this);
    this.onSlotChange = this.onSlotChange.bind(this);
    this.onRefreshClick = this.onRefreshClick.bind(this);
    this.togglePause = this.togglePause.bind(this);
    this.onWarningChange = this.onWarningChange.bind(this);
    this.launchSupport = this.launchSupport.bind(this);
  }

  //////////////////////////////////////////////////////

  // Based on https://www.sitepoint.com/build-javascript-countdown-timer-no-dependencies/
  // CSS from https://stackoverflow.com/questions/7082257/css-how-to-skin-a-select-box-with-css


  async initializeClock(id, endTime, meetingWarning) {
    console.log('initializeClock', endTime, meetingWarning);

    clearInterval(timeInterval);
    notificationWarningSentOrScheduled = false;
    notificationFinalSentOrScheduled = false;

    // schedule notifications
    // if not successful send in real time
    await Notifications.clearScheduledNotifications();

    let warningTime = new Date(Date.parse(endTime) - meetingWarning * 60 * 1000);
    if (warningTime > Date.now()) {
      if (await Notifications.scheduleNotification(message_warning + meetingWarning + " minutes.", warningTime)) {
        notificationWarningSentOrScheduled = true;
      }
    } else {
      console.log('End time is sooner than the warning time, skipping warning notification.');
      notificationWarningSentOrScheduled = true;
    }

    if (endTime > Date.now()) {
      if (await Notifications.scheduleNotification(message_end, endTime)) {
        notificationFinalSentOrScheduled = true;
      }
    } else {
      console.log('End time has past, skipping end notification.');
      notificationFinalSentOrScheduled = true;
    }

    console.log('notificationWarningSentOrScheduled', notificationWarningSentOrScheduled);
    console.log('notificationFinalSentOrScheduled', notificationFinalSentOrScheduled);

    // Debug if anything pending
    await Notifications.getPendingNotifications();

    function setClock(hours, minutes, seconds) {
      //console.log("setClock", hours, minutes, seconds);

      const clock = document.getElementById(id);
      const hoursSpan = clock.querySelector(".hours");
      const minutesSpan = clock.querySelector(".minutes");
      const secondsSpan = clock.querySelector(".seconds");

      let h = ("0" + hours).slice(-2);
      let m = ("0" + minutes).slice(-2);
      let s = ("0" + seconds).slice(-2);

      hoursSpan.innerHTML = h;
      minutesSpan.innerHTML = m;
      secondsSpan.innerHTML = s;

      if (document && document['title']) {
        document.title = h + ':' + m + ':' + s + ' - ' + browser_title;
      }
    }

    function getTimeRemaining(endTime) {
      const total = Date.parse(endTime) - Date.parse(new Date());
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

    async function updateClock() {
      const t = getTimeRemaining(endTime);

      //console.log("updateClock", t.total);
      console.log("updateClock");

      const bodyClassList = document.body.classList;

      if (t.total > meetingWarning * 60 * 1000) {
        bodyClassList.remove('bodyWarning');
        bodyClassList.remove('bodyComplete');
        bodyClassList.add('bodyDefault');
      } else {
        bodyClassList.add('bodyWarning');
        bodyClassList.remove('bodyComplete');
        bodyClassList.remove('bodyDefault');

        if (!notificationWarningSentOrScheduled) {
          notificationWarningSentOrScheduled = true
          await Notifications.sendNotification(message_warning + meetingWarning + " minutes.");
        }
      }

      if (t.total > 0) {
        setClock(t.hours, t.minutes, t.seconds);
      } else {
        clearInterval(timeInterval);
        setClock(0, 0, 0);

        bodyClassList.remove('bodyWarning');
        bodyClassList.add('bodyComplete');
        bodyClassList.remove('bodyDefault');

        if (!notificationFinalSentOrScheduled) {
          notificationFinalSentOrScheduled = true
          await Notifications.sendNotification(message_end);
        }
      }
    }

    await updateClock();

    timeInterval = setInterval(updateClock, 1000);
  }

  //////////////////////////////////////////////////////

  updateMeetingTime(startTime, endTime) {
    console.log('updateMeetingTime');

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleTimeString
    let options = {
      hour: "numeric",
      minute: "2-digit"
    };
    const startTimeStr = startTime.toLocaleTimeString("en-us", options);
    let endTimeStr = endTime.toLocaleTimeString("en-us", options);

    document.getElementById("meetingTime").textContent = startTimeStr + " to " + endTimeStr
  }

  //////////////////////////////////////////////////////

  updateStartTimeOptions() {
    console.log('updateStartTimeOptions');

    let meetingDuration = State.getMeetingDuration();
    let now = Utils.getNow();
    let slots = Utils.getTimeslots(now.date, meetingDuration);

    let select = document.getElementById("meetingSlot");
    select.options.length = 0;

    let selected = undefined;

    for (let index in slots) {
      select.options[select.options.length] = new Option(slots[index].label, slots[index].value);
      if (slots[index].selected)
        selected = slots[index].value;
    }
    select.value = selected;
  }

  //////////////////////////////////////////////////////

  async updateCountdown() {
    console.log('updateCountdown');

    State.saveToLocalStorage();

    let o = State.getUserOptions();
    let meetingDuration = o.meetingDuration;
    let meetingSlot = o.meetingSlot;
    let meetingSpeedy = o.meetingSpeedy;
    let meetingWarning = o.meetingWarning;

    let meetingStartTime = new Date(Date.parse(meetingSlot));
    console.log('meetingStartTime', meetingStartTime);


    if (meetingSpeedy === true || meetingSpeedy === "true") {
      meetingDuration = meetingDuration - 5;
    }

    let meetingEndTime = new Date(Date.parse(meetingStartTime) + meetingDuration * 60 * 1000);
    console.log('meetingEndTime', meetingEndTime);

    // update display
    this.updateMeetingTime(meetingStartTime, meetingEndTime);

    await this.initializeClock("clockdiv", meetingEndTime, meetingWarning);

  }

  //////////////////////////////////////////////////////

  async onDurationChange() {
    console.log("onDurationChange");

    State.saveDurationToLocalStorage();
    this.updateStartTimeOptions();
    State.updateFromLocalStorage(this.updateStartTimeOptions);
    await this.updateCountdown();
  }

  async onSpeedyChange() {
    console.log("onSpeedyChange");

    State.saveSpeedyToLocalStorage();
    await this.updateCountdown();
  }

  async onSlotChange() {
    console.log("onSlotChange");

    await this.updateCountdown();
  }

  async onRefreshClick() {
    console.log("onRefreshClick");

    this.updateStartTimeOptions();
    await this.updateCountdown();
  }

  async onWarningChange() {
    console.log("onWarningChange");

    await this.updateCountdown();
  }

  async togglePause() {
    let enabled = this.state.enabled;
    console.log("togglePause - current enabled?", enabled);

    enabled = !enabled;

    this.setState({ enabled: enabled });

    console.log("togglePause - new enabled?", enabled);

    if (enabled) {
      await Notifications.enableNotifications();
      await this.updateCountdown();
    } else {
      await Notifications.pauseNotifications();
    }

    await State.saveEnabledStateToLocalStorage(enabled);
  }

  async launchSupport() {
    console.log("launchSupport", isNative);
    if (isNative) {
      CapacitorApp.openUrl({ url: supportLink })
    } else {
      Browser.open({ url: supportLink })
    }
  }

  //////////////////////////////////////////////////////

  async componentDidMount() {
    console.log("componentDidMount");

    await Notifications.checkNotificationsAvailability();

    this.updateStartTimeOptions();
    State.updateFromLocalStorage(this.updateStartTimeOptions);
    await this.updateCountdown();

    this.setState(
      {
        enabled: State.getEnabledStateToLocalStorage()
      }
    );

    console.log('componentDidMount - state', this.state);

    if (!this.state.enabled) {
      await Notifications.pauseNotifications();
    }

    SplashScreen.hide();
  }

  //////////////////////////////////////////////////////
  //////////////////////////////////////////////////////

  render() {
    return (
      <div className="content">

        <div className="header">
          <img src={logoImage} className="logo" alt="Timely Meetings logo" />
          <span className="headerText">
            <h1>Timely Meetings</h1>
            <h4>Countdown Timer</h4>
          </span>
        </div>

        <p className="meetingTime">
          <span id="meetingTime"></span>
        </p>

        <div id="clockdiv">
          <div>
            <span className="hours"></span>
            <div className="clocktext">Hours</div>
          </div>
          <div>
            <span className="minutes"></span>
            <div className="clocktext">Minutes</div>
          </div>
          <div>
            <span className="seconds"></span>
            <div className="clocktext">Seconds</div>
          </div>
        </div>

        <div>

          <p>

            <label id="meetingWarningLabel" className="label" htmlFor="meetingWarning">End of Meeting Notification: </label>
            <select className="select" name="meetingWarning" id="meetingWarning" defaultValue="5"
              onChange={this.onWarningChange}>
              <option value="1">1 min</option>
              <option value="2">2 min</option>
              <option value="3">3 min</option>
              <option value="4">4 min</option>
              <option value="5">5 mins</option>
              <option value="10">10 mins</option>
              <option value="15">15 mins</option>
              <option value="20">20 mins</option>
              <option value="25">25 mins</option>
              <option value="30">30 mins</option>
              <option value="45">45 mins</option>
              <option value="50">50 mins</option>
              <option value="45">55 mins</option>
              <option value="60">1 hour</option>
            </select>

            {
              (this.state.enabled === false) &&
              <NotificationsDisabledIcon
                className="iconNotifications"
                title='Click to enable notifications'
                height="28px"
                width="28px"
                onClick={this.togglePause}
              />
            }

            {
              (this.state.enabled === true) &&
              <NotificationsEnabledIcon
                className="iconNotifications"
                title='Click to disable notifications'
                height="28px"
                width="28px"
                onClick={this.togglePause}
              />
            }

          </p>

          <p>

            <label className="label" htmlFor="meetingDuration" id="meetingDurationLabel">Duration: </label>
            <select className="select" name="meetingDuration" id="meetingDuration" defaultValue="30"
              onChange={this.onDurationChange}>
              <option value="15">15 mins</option>
              <option value="30">30 mins</option>
              <option value="45">45 mins</option>
              <option value="60">1 hour</option>
              <option value="90">1.5 hours</option>
              <option value="120">2 hours</option>
              <option value="150">2.5 hours</option>
              <option value="180">3 hours</option>
            </select>

            <label id="meetingSpeedyLabel" className="label" htmlFor="meetingSpeedy">End early?</label>
            <input className="checkbox" type="checkbox" id="meetingSpeedy" name="meetingSpeedy"
              onChange={this.onSpeedyChange}
            />

          </p>

          <p>
            <label className="label" htmlFor="meetingSlot">Start: </label>
            <select className="select" name="meetingSlot" id="meetingSlot"
              onChange={this.onSlotChange}
            >
              <option value="-1">Loading ...</option>
            </select>

            <RefreshCircleIcon
              className="iconRefresh"
              title='Reset timer'
              width='30px'
              height='30px'
              onClick={this.onRefreshClick}
            />
          </p>

          {
            (!isNative) &&
            <div className="bottom">
              <p className="tinyText copyrightText">
                &copy; {(new Date()).getFullYear()} <a href="https://khilnani.org" target="_blank" rel="noreferrer">Nik Khilnani</a>
                <span> | </span>
                <span className="link" role="button" tabIndex="0" onClick={this.launchSupport}>Support</span>
              <span> | </span>
                Ver: {version.published}
              </p>
            </div>
          }

          {
            (isNative) &&
            <div className="bottom bottom-padding">
              <p className="tinyText copyrightText">
              &copy; {(new Date()).getFullYear()} <a href="https://timelymeetings.com" target="_blank" rel="noreferrer">Timely Meetings</a>
              <span> | </span>
              Ver: {version.published}
              </p>
            </div>
          }

        </div>

      </div>
    );
  }
}

//////////////////////////////////////////////////////
//////////////////////////////////////////////////////

export default App;

//////////////////////////////////////////////////////
//////////////////////////////////////////////////////