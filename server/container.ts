import Bottle from "bottlejs";

import serverProvider from "./providers/server";

const bottle = new Bottle();


const providers = [
  serverProvider,
];

export const initProviders = async () => {
  // Force cacheProvider first
  providers.forEach((provider) => {
    provider(bottle);
  });

  return bottle.container;
};
