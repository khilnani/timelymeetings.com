import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'org.khilnani.TimelyMeetings',
  appName: 'Timely Meetings',
  webDir: 'build',
  bundledWebRuntime: false,
  plugins: {
    LocalNotifications: {
    },
  },
};

export default config;