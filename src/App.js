import React, { Component } from "react";

import './App.css';

import * as State from './State'
import * as Utils from './Utils'
import * as Notifications from './Notifications'

import { Capacitor } from "@capacitor/core";

let timeInterval = undefined;
let notificationWarningSentOrScheduled = false
let notificationFinalSentOrScheduled = false

const message_warning = 'Your meeting will end in 5 minutes';
const message_end = 'Your meeting has ended';
const browser_title = 'Timely Meetings | Meeting Countdown Timer';

class App extends Component {

  //-------------------------------

  constructor() {
    super();
    this.state = { data: [] };

    this.onDurationChange = this.onDurationChange.bind(this);
    this.onSpeedyChange = this.onSpeedyChange.bind(this);
    this.onSlotChange = this.onSlotChange.bind(this);

  }

  //-------------------------------
  
  // Based on https://www.sitepoint.com/build-javascript-countdown-timer-no-dependencies/
  // CSS from https://stackoverflow.com/questions/7082257/css-how-to-skin-a-select-box-with-css


  //-------------------------------

  async initializeClock(id, endTime) {
    console.log('initializeClock');

    clearInterval(timeInterval);
    notificationWarningSentOrScheduled = false;
    notificationFinalSentOrScheduled = false;

    // schedule notifications
    // if not successful send in real time
    await Notifications.clearScheduledNotifications();

    let warningTime = new Date(Date.parse(endTime) - 5 * 60 * 1000);
    if (warningTime > Date.now()) {
      if (await Notifications.scheduleNotification(message_warning, warningTime) ) {
        notificationWarningSentOrScheduled = true;
      }
    } else {
      console.log('End time is sooner than the warning time, skipping warning notification.');
      notificationWarningSentOrScheduled = true;
    }
    
    if(endTime > Date.now() ) {
      if (await Notifications.scheduleNotification(message_end, endTime) ) {
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
      
  
      if (t.total > 5 * 60 * 1000) {
        document.body.style.backgroundColor = "#00ECB9"; // default
      } else {
        document.body.style.backgroundColor = "#FBF719"; // yellow
        if (!notificationWarningSentOrScheduled) {
          notificationWarningSentOrScheduled = true
          await Notifications.sendNotification(message_warning);
        }
      }

      if (t.total > 0) {
        setClock(t.hours, t.minutes, t.seconds);
      } else {
        clearInterval(timeInterval);
        
        setClock(0, 0, 0);
        document.body.style.backgroundColor = "#FFFFFF"; // white

        if (!notificationFinalSentOrScheduled) {
          notificationFinalSentOrScheduled = true
          await Notifications.sendNotification(message_end);
        }
      }
    }
  
    await updateClock();
  
    timeInterval = setInterval(updateClock, 1000);
  }

  //-------------------------------

  updateMeetingTime (startTime, endTime) {
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
  
  //-------------------------------
  
  updateStartTimeOptions() {
    console.log('updateStartTimeOptions');
  
    let meetingDuration = State.getMeetingDuration();
    let now = Utils.getNow();
    let slots = Utils.getTimeslots(now.date, meetingDuration);
  
    let select = document.getElementById("meetingSlot");
    select.options.length = 0;
  
    let selected = undefined;
  
    for(let index in slots) {
      select.options[select.options.length] = new Option(slots[index].label, slots[index].value);
      if (slots[index].selected)
        selected = slots[index].value;
    }    
    select.value = selected;
  }
  
  //-------------------------------
  
  async updateCountdown () {
    console.log('updateCountdown');
  
    State.saveToLocalStorage();
  
    let o = State.getUserOptions();
    let meetingDuration = o.meetingDuration;
    let meetingSlot = o.meetingSlot;
    let meetingSpeedy = o.meetingSpeedy;
  
    let meetingStartTime = new Date(Date.parse(meetingSlot));
    console.log('meetingStartTime', meetingStartTime);
  
  
    if (meetingSpeedy === true || meetingSpeedy === "true") {
      meetingDuration = meetingDuration - 5;
    }
  
    let meetingEndTime = new Date(Date.parse(meetingStartTime) + meetingDuration * 60 * 1000);
    console.log('meetingEndTime', meetingEndTime);
  
    // update display
    this.updateMeetingTime(meetingStartTime, meetingEndTime);

    await this.initializeClock("clockdiv", meetingEndTime);
  
  }
  
  //-------------------------------

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

    State.saveSlotToLocalStorage();
    await this.updateCountdown();
  }

  //-------------------------------

  async componentDidMount() {
    console.log("componentDidMount");

    await Notifications.checkNotificationsAvailability();

    this.updateStartTimeOptions();
    State.updateFromLocalStorage(this.updateStartTimeOptions);
    await this.updateCountdown();
  }

  //-------------------------------
  //-------------------------------

  render() {
    // web, ios, android.
    let isNative = Capacitor.getPlatform();

    return (
        <div className="content">

          <h1>Meeting Countdown Timer</h1>

          <p className="meetingTime"><span id="meetingTime"></span></p>

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
              <label className="label" htmlFor="meetingDuration">Meeting duration:</label>
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
            </p>

            <p>
              <label className="label" htmlFor="meetingSpeedy">End 5 minutes early?</label>
              <input className="checkbox" type="checkbox" id="meetingSpeedy" name="meetingSpeedy"
                onChange={this.onSpeedyChange}
              />
            </p>

            <p>
              <label className="label" htmlFor="meetingSlot">Meeting start time: </label>
              <select className="select" name="meetingSlot" id="meetingSlot" 
                onChange={this.onSlotChange}
              >
                <option value="-1">Loading ...</option>
              </select>
            </p>
          </div>

          { (isNative === "web") && 
          <p>
            <span className="tinyText" >
              <a href="https://github.com/khilnani/timelymeetings.com" target="_blank" rel="noreferrer">Github</a> | <a href="https://khilnani.org" target="_blank"  rel="noreferrer">Nik Khilnani</a>
            </span>
          </p>
          }

        </div>
    );
  }
}

export default App;

