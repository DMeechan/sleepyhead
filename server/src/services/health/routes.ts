import { Request, Response, response } from "express";

export default [
  {
    path: "/health",
    method: "get",
    handler: [
      async ({  }: Request, res: Response) => {
        res.status(200).send("Status: ok");
      }
    ]
  },
  {
    path: "/",
    method: "get",
    handler: [
      async ({  }: Request, res: Response) => {
        res.status(200).send("Welcome to the Sleepyhead API Server!");
      }
    ]
  }
];
