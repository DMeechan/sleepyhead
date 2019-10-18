import { Router, Request, Response, NextFunction } from "express";

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
      (req: Request, res: Response, next: Function) => {
        const result = new (route.controller as any)()[route.action](
          req,
          res,
          next
        );
        if (result instanceof Promise) {
          result.then(result =>
            result !== null && result !== undefined
              ? res.send(result)
              : undefined
          );
          // .catch(error => console.error(error));
        } else if (result !== null && result !== undefined) {
          res.json(result);
        }
      }
    );
  });
};
