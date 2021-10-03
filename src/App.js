import React, { Component } from "react";

import {clearScheduledNotifications, scheduleNotification, sendNotification, sendTestNotification } from './Notifications'

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = { data: [] };

    this.clearScheduledNotifications = clearScheduledNotifications.bind(this);
    this.sendTestNotification = sendTestNotification.bind(this);
  }

  async componentDidMount() {
    //await this.sendTestNotification();
  }

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
              <select className="select" name="meetingDuration" id="meetingDuration" defaultValue="30">
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
              <input className="checkbox" type="checkbox" id="meetingSpeedy" name="meetingSpeedy"/>
            </p>

            <p>
              <label className="label" htmlFor="meetingSlot">Meeting start time: </label>
              <select className="select" name="meetingSlot" id="meetingSlot" >
                <option value="-1">Loading ...</option>
              </select>
            </p>
          </div>

          <p>
            <button className="button" onClick={this.sendTestNotification}>
              Test Notification
            </button>
            <button className="button" onClick={this.clearScheduledNotifications}>
              Clear Notifications
            </button>
          </p>

          <p>
            <span className="tinyText" >
              <a href="https://github.com/khilnani/timelymeetings.com" target="_blank">Github</a> | <a href="https://khilnani.org" target="_blank">Nik Khilnani</a>
            </span>
          </p>

        </div>
    );
  }
}

export default App;

