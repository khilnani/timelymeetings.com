# timelymeetings.com

A simple no-frills app that starts counting down how much time is left in your current meeting. 

> **Help me help you!** For quick access make [timelymeetings.com](https://timelymeetings.com) your browser's home page [(?)](https://lmgtfy.app/?q=change+browser%27s+default+home+page) or add [timelymeetings.com](https://timelymeetings.com) to your phone's Home Screen [(?)](https://lmgtfy.app/?q=ios+add+a+web+page+to+home+screen)

## Key features (So far)

* **Notifications** - You get two notifications - a 5 minute warning that changes the app to yellow and when the meeting wraps up. The app will send browser notifications if available and fall back to old school alert popups if notifications are not available (e.g. Mobile iOS Safari) or disabled.
* **Start Time Auto-detection** - The application will auto-detect when your meeting start time so you do not need to do any math to determine how much time is left. But, you can adjust this if needed.
* **Resume Support** - The meeting configuration is saved in the browser, so if you refresh or recreate the browser window the count down will pick up where it left off.
* **Mobile Support** - While designed to be kept open in a small window on your screen, feel free to pull up the app on your mobile phone. This might be useful if you are sharing your screen on a Zoom call or need the entire desktop for your work.


## Screenshots

<img src="https://raw.githubusercontent.com/khilnani/timelymeetings/master/README/30DCBFAF-DCF1-45A6-AAFF-F3DED62C02F7.png" width="40%" /><img src="https://raw.githubusercontent.com/khilnani/timelymeetings/master/README/74A63E99-30AB-4196-A31F-621AEB2177C5.png" width="40%" />
<img src="https://raw.githubusercontent.com/khilnani/timelymeetings/master/README/0710F98A-9176-4A34-93CF-4102B0F1878A.png" width="40%" /><img src="https://raw.githubusercontent.com/khilnani/timelymeetings/master/README/03F0D00B-5AB7-4FA3-98BA-94B25834137C.png" width="40%" />

# Dev Notes

## Overview

Mobile app built using [React](https://reactjs.org) and [Ionic Capacitor](https://capacitorjs.com)

## Links

Privacy Policy

- https://www.termsfeed.com/live/83059585-5dc3-485c-9575-9a8abe1bf1fb

HTML/CSS

- https://sabe.io/classes/css/grouping-nesting-selectors

GitHub Pages

- SPA on Github Pages
  - https://github.com/rafgraph/spa-github-pages
  - https://itnext.io/so-you-want-to-host-your-single-age-react-app-on-github-pages-a826ab01e48

React

- https://create-react-app.dev/docs/advanced-configuration/
- 
Capacitor 

- https://capacitorjs.com/docs/getting-started
- https://capacitorjs.com/docs/web
- https://capacitorjs.com/docs/apis
  - https://capacitorjs.com/docs/apis/app
  - https://capacitorjs.com/docs/apis/splash-screen
  - https://capacitorjs.com/docs/apis/local-notifications
  - https://capacitorjs.com/docs/apis/browser
- https://capacitorjs.com/docs/apis/app#statechangelistener

Icons

- https://react-ionicons.netlify.app/
- https://github.com/ionic-team/cordova-res
- iOS
  - https://developer.apple.com/design/human-interface-guidelines/ios/icons-and-images/image-size-and-resolution/
- iPhone
  - https://developer.apple.com/design/human-interface-guidelines/watchos/visual/app-icon/

Utilities

- https://appiconmaker.co/Home/Index/e21c03d0-8767-4304-91d1-710f10958353
- https://realfavicongenerator.net/
- https://appicon.co/
- https://soundbible.com/
- https://cssgradient.io/


## Known Issues

- cordova-res on Apple Silicon M1 `vips/vips8` error
  - `brew reinstall vips`
- Background tasks with capacitor
  - https://github.com/ionic-team/capacitor/issues/3032
  - Alt - https://github.com/robingenz/capacitor-background-task
- Black splash screen
  - https://github.com/ionic-team/capacitor/issues/3589


## Miscellaneous 

The below articles/tutorials help the project get started

- https://www.sitepoint.com/build-javascript-countdown-timer-no-dependencies/
- https://stackoverflow.com/questions/7082257/css-how-to-skin-a-select-box-with-css

Update XCode Command Line Tools

- `sudo rm -rf /Library/Developer/CommandLineTools`
- `sudo xcode-select --install`