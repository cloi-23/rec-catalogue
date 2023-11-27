import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "io.ionic.starter",
  appName: "mobile-client",
  webDir: "dist",
  server: {
    cleartext: true,
  },
};

export default config;
