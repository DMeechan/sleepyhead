import { Request, Response } from "express";
import { getPlacesByName } from "./SearchController";
import * as checks from "../../middleware/checks";

export default [
  {
    path: "/api/v1/search",
    method: "get",
    handler: [
      checks.checkSearchParams,
      async ({ query }: Request, res: Response) => {
        const result = await getPlacesByName(query.q);
        res.status(200).send(result);
      }
    ]
  }
];
