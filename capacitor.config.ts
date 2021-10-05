import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'org.khilnani.TimelyMeetings',
  appName: 'TimelyMeetings',
  webDir: 'build',
  bundledWebRuntime: false,
  plugins: {
    LocalNotifications: {
    },
  },
};

export default config;