import pkg from "../../package.json";

export const appName = pkg.name;
export const appVersion = process.env.APP_VERSION || pkg.version;
export const enviroment = process.env.NODE_ENV;
export const appEnviroment = process.env.APP_ENV;
export const isProduction = appEnviroment === "production";
export const isStaging = appEnviroment === "staging";
export const isDevelopment = appEnviroment === "development";
export const appFullName = `${appName} - ${appVersion} - ${appEnviroment}`;
export const baseUrl = process.env.BASE_URL;
export const rebuildToken = process.env.REBUILD_TOKEN;
export const isGeolocateEnabled = process.env.GEOLOCATE_ENABLED === "true";
export const hasColvinProxyEnabled =
  process.env.COLVIN_PROXY_ENABLED === "true";
