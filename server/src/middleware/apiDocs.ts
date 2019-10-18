import { Router } from "express";
import YAML from "yamljs";
import swaggerUi from "swagger-ui-express";

const root = process.cwd();

// Ideally this would get moved into @/dist at compile time... but hey whatever this works..
const swaggerDocument = YAML.load(root + "/src/config/swagger.yaml");
// import swaggerDocument from "../config/swagger.json";

export const handleAPIDocs = (router: Router) =>
  router.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
