import CanvasJSReact from "../Graph/canvasjs.react";
var React = require("react");
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

/** component rendering graph of monthly incomes */
export class Graph extends React.Component {
  

  /** converts object from parent component to array of objects data set for rendered chart */
  getDataPoints() {
    let dataPoints = [];
    Object.keys(this.props.data).forEach(key => {
      dataPoints.push({ x: new Date(key), y: this.props.data[key] });
    });
   

    
    return dataPoints;
  }

  render() {
    const options = {
      animationEnabled: true,
      exportEnabled: true,

      theme: "light2",
      title: {
        text: "Monthly Incomes"
      },
      axisY: {
        title: "Incomes",
        includeZero: true,
        suffix: "$"
      },
      axisX: {
        title: "Month",
        valueFormatString: "MMMM-YYYY",

        interval: 2
      },
      data: [
        {
          type: "line",
          xValueFormatString: "MMMM-YYYY",
          toolTipContent: `{x}: {y}$`,
          dataPoints: this.getDataPoints()
        }
      ]
    };

    return (
      <div>
        <CanvasJSChart
          options={options}
        />
      </div>
    );
  }
}

export default Graph
