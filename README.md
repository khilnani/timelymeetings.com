# TimelyMeetings

> Timely Meetings is a straightforward meeting timer app that auto-detects when your meeting start-time and displays a count down. 

> In addition to sending a notification when the meeting ends, the app also sends notifications before your meeting ends so you can start wrapping up.

> _Have an Apple Phone or Watch and want to get notifications on your watch?_ Using XCode you can build the iOS version of the app and install to your device. 


### For Quick Access 

1. Make [timelymeetings.com](https://timelymeetings.com) your browser's home page [(?)](https://lmgtfy.app/?q=change+browser%27s+default+home+page), or ...
2. Add [timelymeetings.com](https://timelymeetings.com) to your phone's Home Screen [(?)](https://lmgtfy.app/?q=ios+add+a+web+page+to+home+screen), or ...
3. Install [Ionic Capacitor](https://capacitorjs.com/) and XCode to install the app to your Apple Phone

## Key features (So far)

* **Web and iOS App** - Available as a web app at https://timelymeetings.com (leverages browser notifications) and an Apple iOS Phone app with Apple Watch notifications support (Requires you to build/install via XCode).
* **Auto-detects Meeting Start time** But, allows you to adjust the start time as well
* **Custom Meeting Duration** Pick from a variety of meeting duration ranging from 15 minutes to 3 hours. We really hope, your meetings are not 3 hours long though. You can also start the timer before a meeting starts in case you are early.
* **Speedy Meetings** Automatically shorten meetings by 5 minutes to allow everyone time to prepare for the next meeting.
* **Custom Notifications** In addition to sending a notification when the meeting ends, the app also sends notifications a few minutes before your meeting ends so you can start wrapping up. You can configure or turn these off as needed.
* **Nuanced User Experience** The color of the app changes as you approach the end of your meeting to allow you to take advantage of peripheral vision. Additionally, the app is designed to fit in one screen view on mobile or desktop to allow tiling the web app to a corner of your desktop

Feel free to send any feature suggestions or bug reports to support@timelymeetings.com . 


## Screenshots

### Web App

<img src="https://raw.githubusercontent.com/khilnani/timelymeetings.com/master/assets/Screenshots/web/Screen%20Shot%201.png" width="40%" /><img src="https://raw.githubusercontent.com/khilnani/timelymeetings.com/master/assets/Screenshots/web/Screen%20Shot%202.png" width="40%" />
<img src="https://raw.githubusercontent.com/khilnani/timelymeetings.com/master/assets/Screenshots/web/Screen%20Shot%203.png" width="40%" />

### Apple iOS App

<img src="https://raw.githubusercontent.com/khilnani/timelymeetings.com/master/assets/Screenshots/apple%20iphone/Simulator%20Screen%20Shot%20-%20iPhone%2011%20Pro%20Max%20-%201.png" width="40%" /><img src="https://raw.githubusercontent.com/khilnani/timelymeetings.com/master/assets/Screenshots/apple%20iphone/Simulator%20Screen%20Shot%20-%20iPhone%2011%20Pro%20Max%20-%202.png" width="40%" />
<img src="https://raw.githubusercontent.com/khilnani/timelymeetings.com/master/assets/Screenshots/apple%20iphone/Simulator%20Screen%20Shot%20-%20iPhone%2011%20Pro%20Max%20-%203.png" width="40%" /><img src="https://raw.githubusercontent.com/khilnani/timelymeetings.com/master/assets/Screenshots/apple%20watch/Simulator%20Screen%20Shot%20-%20Apple%20Watch%206%2044mm%20-%20iPhone%2011%20Pro%20Max%20-%20Combined.png" width="20%"/>


# Dev Notes

## Overview

The Web App is built using [React](https://reactjs.org). The Mobile Native app uses [Ionic Capacitor](https://capacitorjs.com).

## Links

#### GitHub Pages

- SPA on Github Pages
  - https://github.com/rafgraph/spa-github-pages
  - https://itnext.io/so-you-want-to-host-your-single-age-react-app-on-github-pages-a826ab01e48

#### React

- https://create-react-app.dev/docs/advanced-configuration/
- 
#### Capacitor 

- https://capacitorjs.com/docs/getting-started
- https://capacitorjs.com/docs/web
- https://capacitorjs.com/docs/apis
  - https://capacitorjs.com/docs/apis/app
  - https://capacitorjs.com/docs/apis/splash-screen
  - https://capacitorjs.com/docs/apis/local-notifications
  - https://capacitorjs.com/docs/apis/browser
- https://capacitorjs.com/docs/apis/app#statechangelistener

#### Icons

- https://react-ionicons.netlify.app/
- https://github.com/ionic-team/cordova-res
- iOS
  - https://developer.apple.com/design/human-interface-guidelines/ios/icons-and-images/image-size-and-resolution/
- iPhone
  - https://developer.apple.com/design/human-interface-guidelines/watchos/visual/app-icon/

#### Utilities

- https://appiconmaker.co/Home/Index/e21c03d0-8767-4304-91d1-710f10958353
- https://realfavicongenerator.net/
- https://appicon.co/
- https://soundbible.com/
- https://cssgradient.io/


## Troubleshooting

- cordova-res on Apple Silicon M1 `vips/vips8` error
  - `brew reinstall vips`
- Background tasks with capacitor
  - https://github.com/ionic-team/capacitor/issues/3032
  - Alt - https://github.com/robingenz/capacitor-background-task
- Black splash screen
  - https://github.com/ionic-team/capacitor/issues/3589
- Update XCode Command Line Tools
  - `sudo rm -rf /Library/Developer/CommandLineTools`
  - `sudo xcode-select --install`
