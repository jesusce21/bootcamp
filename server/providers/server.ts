import "express-async-errors";

import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import healthcheck from "express-healthcheck";
import next from "next";
import path from "path";
import nextRouter from "../nextRouter";


import {
  appVersion,
  isDevelopment,
  isProduction,
} from "./config";

const server = express();
const nextApp = next({
  dev: isDevelopment,
  customServer: true,
});

/**
 * @param {Bottle} bottle
 */
const serverProvider = (bottle: any) => {
  const {
    apiRoutes,
    globalStoreMiddleware,
    expressErrorMiddleware,
    expressRequestMiddleware,
    logger,
  } = bottle.container;

  const nextHandler = nextRouter.getRequestHandler(nextApp);

  nextApp.setAssetPrefix(process.env.STATIC_PATH || "");

  if (isProduction) {
    server.use((req, res, next) => {
      const xForwardedFor = req?.headers["x-forwarded-for"];

      if (xForwardedFor && req.headers) {
        const [firstIp] = (<string>xForwardedFor).split(",");
        req.headers["x-first-forwarded-for"] = firstIp;
      }

      next();
    });
    server.use(expressRequestMiddleware);
  }

  server.use(express.json({ limit: "10mb" }));
  server.use(express.urlencoded({ limit: "10mb", extended: true }));
  server.use(compression({ level: 4 }));
  server.use(cors());
  server.use(cookieParser());
  server.use(express.static(path.join(__dirname, "../../public")));
  server.use("/health", healthcheck());




  server.use(globalStoreMiddleware);


  server.use(nextHandler);
  server.use(expressErrorMiddleware);

  // Redirects errors to _error component
  server.use((error: any, req: any, res: any, next: any) => {
    const statusCode = error?.response?.status || error?.status || 500;
    const errorMessage = error?.response?.statusText || error?.message;

    if (statusCode >= 500 || !statusCode) {
      logger.error(errorMessage, { meta: error });
    }

    res.status(statusCode || 500).send({ error: errorMessage });
  });

  bottle.factory("server", () => server);
  bottle.factory("nextServer", () => nextApp);
};

export default serverProvider;
