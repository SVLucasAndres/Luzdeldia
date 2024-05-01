import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'LuzDia',
  webDir: 'www',
  plugins: {
    LocalNotifications: {
      smallIcon: "ic_stat_icon_config_sample",//Icono de la app solo para Android
      iconColor: "#65f765",
      sound: "soundNot.wav",//So  nido de la notificacion solo para Android
    },
  },
};

export default config;
