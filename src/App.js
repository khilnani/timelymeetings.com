import React, { Component } from "react";


import {clearScheduledNotifications, scheduleNotification, sendNotification, sendTestNotification } from './Notifications'


import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = { data: [] };

    this.clearScheduledNotifications = clearScheduledNotifications.bind(this);
    this.sendTestNotification = sendTestNotification.bind(this);
  }

  async componentDidMount() {
    await this.sendTestNotification();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            <img src={logo} className="App-logo" alt="logo" />
          </p>
          <p>
            <button onClick={this.sendTestNotification}>
              Send Test Notification
            </button>
            <button onClick={this.clearScheduledNotifications}>
              Clear Scheduled Notifications
            </button>
          </p>
        </header>
      </div>
    );
  }
}

export default App;

