import React, { Component } from "react";

import './App.css';

import * as State from './State'
import * as Utils from './Utils'
import * as Notifications from './Notifications'

let timeInterval = undefined;
let notificationWarningSent = false
let notificationFinalSent = false

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
  
  async initializeClock(id, endtime) {
    console.log('initializeClock');

    clearInterval(timeInterval);
    notificationWarningSent = false;
    notificationFinalSent = false;
  
    const clock = document.getElementById(id);
    const hoursSpan = clock.querySelector(".hours");
    const minutesSpan = clock.querySelector(".minutes");
    const secondsSpan = clock.querySelector(".seconds");

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
          await Notifications.sendNotification('Your meeting will end within 5 minutes');
        }
      }
  
      if (t.total <= 0) {
        clearInterval(timeInterval);
        document.body.style.backgroundColor = "#FFFFFF"; // white
        if (!notificationFinalSent) {
          notificationFinalSent = true
          await Notifications.sendNotification('Your meeting has ended');
        }
      }
  
      hoursSpan.innerHTML = ("0" + t.hours).slice(-2);
      minutesSpan.innerHTML = ("0" + t.minutes).slice(-2);
      secondsSpan.innerHTML = ("0" + t.seconds).slice(-2);
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

    this.updateStartTimeOptions();
    State.updateFromLocalStorage(this.updateStartTimeOptions);
    await this.updateCountdown();
  }

  //-------------------------------
  //-------------------------------

  render() {
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

          <p>
            <span className="tinyText" >
              <a href="https://github.com/khilnani/timelymeetings.com" target="_blank" rel="noreferrer">Github</a> | <a href="https://khilnani.org" target="_blank">Nik Khilnani</a>
            </span>
          </p>

        </div>
    );
  }
}

export default App;

