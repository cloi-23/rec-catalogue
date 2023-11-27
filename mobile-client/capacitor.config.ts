import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "io.ionic.starter",
  appName: "mobile-client",
  webDir: "dist",
  server: {
    androidScheme: "http",
  },
};

export default config;
