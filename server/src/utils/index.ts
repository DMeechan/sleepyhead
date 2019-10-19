import { Router, Request, Response, NextFunction } from "express";
import { throwError } from "./httpErrors";

type Wrapper = (router: Router) => void;

export const applyMiddleware = (
  middlewareWrappers: Wrapper[],
  router: Router
) => {
  for (const wrapper of middlewareWrappers) {
    wrapper(router);
  }
};

type Handler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void> | void;

type Route = {
  path: string;
  method: string;
  action: string;
  controller: any;
  // handler: Handler | Handler[];
};

export const applyRoutes = (routes: Route[], router: Router) => {
  // for (const route of routes) {
  //   const { method, path, action } = route;
  //   (router as any)[method](path, handler);
  // }

  routes.forEach(route => {
    (router as any)[route.method](
      route.path,
      (req: Request, res: Response, next: NextFunction) => {
        const result = new (route.controller as any)()[route.action](
          req,
          res,
          next
        );
        if (result instanceof Promise) {
          result
            .then(result =>
              result !== null && result !== undefined
                ? res.send(result)
                : undefined
            )
            .catch(error => {
              return throwError(next, 500, error);
            });
        } else if (result !== null && result !== undefined) {
          res.json(result);
        }
      }
    );
  });
};
