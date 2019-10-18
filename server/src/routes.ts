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
    path: prefix + "/user/:uuid",
    controller: UserController,
    action: "one"
  },
  {
    method: "get",
    path: prefix + "/user/:uuid",
    controller: UserController,
    action: "oneWithReadings"
  },
  {
    method: "post",
    path: prefix + "/user",
    controller: UserController,
    action: "save"
  },
  {
    method: "patch",
    path: prefix + "/user/:uuid/sleeping",
    controller: UserController,
    action: "toggleSleeping"
  }
];

const readingRoutes = [
  {
    method: "post",
    path: prefix + "/user/:uuid/reading",
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

export const Routes = [...userRoutes, ...homeRoutes, ...readingRoutes];
