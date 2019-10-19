import { Request, Response } from "express";

export class HomeController {
  async index(req: Request, res: Response) {
    res.status(200).send("Welcome to the Sleepyhead API Server! :D");
  }

  async health(req: Request, res: Response) {
    res.status(200).send("Status: OK");
  }
}
