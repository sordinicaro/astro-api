import dbChart from "../database/natal-charts.json";
import fs from "node:fs";

abstract class ChartModel {
  static getAllChart = () => {
    const charts = dbChart.charts;
    return charts;
  };

  static getChartByName = (name: string) => {
    const chart = dbChart.charts.find(
      (chart: any) => chart.name.toLowerCase() == name.toLowerCase()
    );
    return chart;
  };

  static createChart = (newChart: any) =>{
    dbChart.charts.push(newChart);

    try{
      fs.writeFileSync("./src/database/natal-charts.json", JSON.stringify(dbChart));
    }catch(error){
      return new Error();
    }
    return newChart;

  }

  static updateChart = (objChart: any) => {
    const { name,birthdate,time,asc,sun,moon,mercury,venus,mars,jupiter,saturn,uranus,neptune,pluto} = objChart;

    const chart = dbChart.charts.find((chart) => chart.name.toLowerCase() === name.toLowerCase())
  

    if (!chart) {
      return { error: "Chart not found!!" };
    }

    if (name) chart.name = name;
    if (birthdate) chart.birthdate = birthdate;
    if (time) chart.time = time;
    if (asc) chart.asc = asc;
    if (sun) chart.sun = sun;
    if (moon) chart.moon = moon;
    if (mercury) chart.mercury = mercury;
    if (venus) chart.venus = venus;
    if (mars) chart.mars = mars;
    if (jupiter) chart.jupiter = jupiter;
    if (saturn) chart.saturn = saturn;
    if (uranus) chart.uranus = uranus;
    if (neptune) chart.neptune = neptune;
    if (pluto) chart.pluto = pluto;

    try {
      fs.writeFileSync("./src/database/natal-charts.json", JSON.stringify(dbChart));
    } catch (error) {
      return new Error();
    }
    return { message: "Successfully modified chart" };
  }; 

  static deleteChart = (name: string) => {
    const indexChart = dbChart.charts.findIndex((chart) => chart.name === name);

    if (indexChart === -1) return { error: "Chart not found" };

    dbChart.charts.splice(indexChart, 1);

    try {
      fs.writeFileSync("./src/database/natal-charts.json", JSON.stringify(dbChart));
    } catch (error) {
      return new Error();
    }
    return { message: "Successfully deleted Chart" };
  };

}


export default ChartModel;
