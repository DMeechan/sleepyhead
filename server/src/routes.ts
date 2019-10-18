import { UserController } from "./controller/UserController";
import { HomeController } from "./controller/HomeController";

const prefix = "/api";

const userRoutes = [
  {
    method: "get",
    path: prefix + "/user",
    controller: UserController,
    action: "all"
  },
  {
    method: "get",
    path: prefix + "/user",
    controller: UserController,
    action: "one"
  },
  {
    method: "get",
    path: prefix + "/user",
    controller: UserController,
    action: "oneWithReadings"
  },
  {
    method: "get",
    path: prefix + "/user",
    controller: UserController,
    action: "save"
  },
  {
    method: "get",
    path: prefix + "/user",
    controller: UserController,
    action: "toggleSleeping"
  }
];

const homeRoutes = [
  {
    method: "get",
    path: "/",
    controller: HomeController,
    action: "index"
  },
  {
    method: "get",
    path: "/health",
    controller: HomeController,
    action: "health"
  }
];

export const Routes = [...userRoutes, ...homeRoutes];
