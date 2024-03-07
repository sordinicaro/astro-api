import { Router } from "express";
import ChartController from "../controller/chart-controller";

const chartRouter = Router();

// GET
chartRouter.get("/", ChartController.getAllChart);

chartRouter.get("/:name", ChartController.getAstroByName);

// POST
chartRouter.post("/", ChartController.createChart);

// PATCH
chartRouter.patch("/:name", ChartController.updateChart);

//DELETE
chartRouter.delete("/:name", ChartController.deleteChart);

export default chartRouter;
