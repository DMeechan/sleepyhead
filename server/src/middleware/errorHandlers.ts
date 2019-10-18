import { Request, Response, NextFunction, Router } from "express";
import { HTTPClientError } from "../utils/httpErrors";
import { isProduction } from "../utils/situation";

const handle404Error = (router: Router) => {
  router.use((req: Request, res: Response) => {
    res.status(404).send("Whoops, page not found 🤔");
  });
};

const handleClientError = (router: Router) => {
  router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof HTTPClientError) {
      res.status(err.statusCode).send(err.message);
    } else {
      next(err);
    }
  });
};

const handleServerError = (router: Router) => {
  router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (isProduction) {
      res.status(500).send("Internal Server Error 😨");
    } else {
      res.status(500).send(err.stack);
    }
  });
};

export default [handle404Error, handleClientError, handleServerError];
