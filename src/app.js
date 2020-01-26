import { Server } from "http";
import express, { Express } from "express";
// import * as middleware from "./middleware";
// import { makeShutdownActions, ShutdownAction } from "./shutdownActions";
import { Middleware } from "postgraphile";
// import { sanitizeEnv } from "./utils";

// Server may not always be supplied, e.g. where mounting on a sub-route
export function getHttpServer(app) {
  return app.get("httpServer");
}

// export function getShutdownActions(app) {
//   return app.get("shutdownActions");
// }

export async function makeApp({ httpServer } = {}) {
  // sanitizeEnv();

  const isTest = process.env.NODE_ENV === "test";
  const isDev = process.env.NODE_ENV === "development";

  // const shutdownActions = makeShutdownActions();

  // if (isDev) {
  //   shutdownActions.push(() => {
  //     require("inspector").close();
  //   });
  // }

  /*
   * Our Express server
   */
  const app = express();

  /*
   * Getting access to the HTTP server directly means that we can do things
   * with websockets if we need to (e.g. GraphQL subscriptions).
   */
  app.set("httpServer", httpServer);

  /*
   * For a clean nodemon shutdown, we need to close all our sockets otherwise
   * we might not come up cleanly again (inside nodemon).
   */
  // app.set("shutdownActions", shutdownActions);
  app.use(morgan(isDev ? "tiny" : "combined"));

  /*
   * Error handling middleware
   */
  // await middleware.installErrorHandler(app);

  return app;
}
