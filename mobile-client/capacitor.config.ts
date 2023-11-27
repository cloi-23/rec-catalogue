import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'mobile-client',
  webDir: 'dist',
  server: {
    // "url": 'http://58.69.177.74:4001',
    "cleartext": true
  },
  plugins: {
    CapacitorHttp: {
      enabled: true,
    },
  },
};

export default config;
