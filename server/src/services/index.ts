import searchRoutes from "./search/routes";
import sensorsRoutes from "./sensors/routes";
import analysisRoutes from "./analysis/routes";
import healthRoutes from "./health/routes";

export default [...sensorsRoutes, ...analysisRoutes, ...healthRoutes];
