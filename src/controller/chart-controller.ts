import { Request, Response } from "express";
import crypto from "node:crypto";
import ChartModel from "../model/chart-model";
import { validatePartialChart } from "../validator/validatorChart";

abstract class ChartController {
  static getAllChart = (req: Request, res: Response) => {
    const charts = ChartModel.getAllChart();
    if (!charts) return res.status(500).json({ error: "Server Error" });
    res.json(charts);
  };

  static getAstroByName = (req: Request, res: Response) => {
    const { name } = req.params;
    const chart = ChartModel.getChartByName(name);
    if (!chart) return res.status(404).json({ error: "Server Error" });
    res.json(chart);
  };

  static createChart = (req: Request, res: Response) => {
    const { name,birthdate,time,asc,sun,moon,mercury,venus,mars,jupiter,saturn,uranus,neptune,pluto} = req.body

    const newChart = {
      name,
      birthdate,
      time,
      asc,
      sun,
      moon,
      mercury,
      venus,
      mars,
      jupiter,
      saturn,
      uranus,
      neptune,
      pluto
    };

    const response = ChartModel.createChart(newChart);
    if (response instanceof Error) {
        return res.status(500).json({ error: "Error to create New Chart " });
    };

    return res.json(newChart);
  };


  static updateChart = (req:Request, res: Response)=>{
    
    const responseValidator = validatePartialChart(req.body);

    if (!responseValidator.success) {
      return res.status(400).send(responseValidator.error);
    }

    const { name } = req.params;
    const { birthdate,time,asc,sun,moon,mercury,venus,mars,jupiter,saturn,uranus,neptune,pluto}  = req.body;

    const objChart = { name,birthdate,time,asc,sun,moon,mercury,venus,mars,jupiter,saturn,uranus,neptune,pluto };

    const response = ChartModel.updateChart(objChart);

    if (!response.message) {
      res.status(400).json({ error: "Error to update Chart!" });
    }

    return res.json(response);

  }

  static deleteChart = (req: Request, res: Response) => {
    const { name } = req.params;
    const response = ChartModel.deleteChart(name);
    if (!response.message) {
      res.status(400).json({ error: "Error to delete chart!" });
    }

    return res.json(response);
  };
  

}
export default ChartController;
