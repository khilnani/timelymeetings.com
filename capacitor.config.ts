import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'org.khilnani.TimelyMeetings',
  appName: 'Timely Meetings',
  webDir: 'build',
  plugins: {
    LocalNotifications: {
    },
    SplashScreen: {
      launchAutoHide: false,
      backgroundColor: "#00ecb9",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      showSpinner: false,
      androidSpinnerStyle: "large",
      iosSpinnerStyle: "small",
      spinnerColor: "#ffffff",
      splashFullScreen: true,
      splashImmersive: true,
      layoutName: "launch_screen",
      useDialog: true
    }
  },
};

export default config;