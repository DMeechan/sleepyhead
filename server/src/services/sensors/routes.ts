import { Request, Response, response } from "express";
import * as checks from "../../middleware/checks";

export default [
  {
    path: "/api/sensors",
    method: "get",
    handler: [
      async ({  }: Request, res: Response) => {
        res.status(200).send({});
      }
    ]
  }
];
