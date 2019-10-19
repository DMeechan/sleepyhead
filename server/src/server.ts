import http from "http";
import express from "express";

import { applyMiddleware, applyRoutes } from "./utils";
import middleware from "./middleware";
import errorHandlers from "./middleware/errorHandlers";
import { Routes } from "./routes";
import { createConnection } from "./utils/connection";
import { databaseUrl } from "./utils/situation";

process.on("uncaughtException", e => {
  console.log(e);
  process.exit(1);
});

process.on("unhandledRejection", e => {
  console.log(e);
  process.exit(1);
});

const router = express();
applyMiddleware(middleware, router);
applyRoutes(Routes, router);
applyMiddleware(errorHandlers, router);

const { PORT = 3000 } = process.env;
const server = http.createServer(router);

try {
  const host = databaseUrl.split("@")[1];
  console.log("Connecting to database:", host);

  createConnection().then(() => console.log("Connected!"));

  server.listen(PORT, () =>
    console.log(`Server is running http://localhost:${PORT} ...`)
  );
} catch (e) {
  console.error(e);
  process.exit(1);
}
