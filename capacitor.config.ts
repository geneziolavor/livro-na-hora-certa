
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.679de18a8c6b422c8fcfec33d370e7a2',
  appName: 'livro-na-hora-certa',
  webDir: 'dist',
  bundledWebRuntime: false,
  server: {
    url: 'https://679de18a-8c6b-422c-8fcf-ec33d370e7a2.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    LocalNotifications: {
      smallIcon: "ic_stat_icon_config_sample",
      iconColor: "#0080ff",
      sound: "beep.wav",
    },
  }
};

export default config;
