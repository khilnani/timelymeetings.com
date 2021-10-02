import React, { Component } from "react";

import { Capacitor } from '@capacitor/core';
import { LocalNotifications } from '@capacitor/local-notifications';


import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = { data: [] };
  }

  async checkNativeNotificationsAvailability () {
    console.log('checkNativeNotificationsAvailability');

    try {
      let isPluginAvailable = await Capacitor.isPluginAvailable('LocalNotifications');
      console.log('isPluginAvailable', isPluginAvailable);
      
      if ( isPluginAvailable ) {
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
      alert(error);
      return false;
    }
  }

  async componentDidMount() {
    let isNotificationsAvailable = await this.checkNativeNotificationsAvailability();
    console.log('isNotificationsAvailable', isNotificationsAvailable);

    if(isNotificationsAvailable) {

      let success = await LocalNotifications.schedule({
        notifications: [
          {
            title: "On sale",
            body: "Widgets are 10% off. Act fast!",
            id: 2,
            schedule: { at: new Date(Date.now() + 1000 * 5) },
            sound: null,
            attachments: null,
            actionTypeId: "",
            extra: null
          }
        ]
      });
      console.log('Success', success); 
    }   
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React!
          </a>
        </header>
      </div>
    );
  }
}

export default App;

