import React, { useState } from "react";
import "./App.css";

// Define constants for the SVG dimensions

const SVG_WIDTH = 1200;
const SVG_HEIGHT = 800;

// Data for the bar chart

const barChartData = [ // *This is test data!*
  { day: "Mon", value: 12 },
  { day: "Tue", value: 14 },
  { day: "Wed", value: 12 },
  { day: "Thu", value: 4 },
  { day: "Fri", value: 5 },
  { day: "Sat", value: 18 },
  { day: "Sun", value: 0 },
  
];

function App() {

  // Hover Effect
  
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => {
    setHoveredBar(index);
  };

  const handleMouseLeave = () => {
    setHoveredBar(null);
  };

    // Define the left margin and available width for the X-axis

  const xAxisMargin = 50;
  const xAxisAvailableWidth = SVG_WIDTH - xAxisMargin * 2;
  
    // Define the top margin and available height for the Y-axis

  const yAxisMargin = 50;
  const yAxisAvailableHeight = SVG_HEIGHT - yAxisMargin * 2;

    // Calculate the Y-coordinate of the X-axis

  const xAxisY = yAxisMargin + yAxisAvailableHeight;

    // Find the maximum and minimum values in the data

  const dataMaxValue = Math.max(...barChartData.map((item) => item.value));
  const dataMinValue = Math.min(...barChartData.map((item) => item.value));
  const dataValueRange = dataMaxValue - dataMinValue;

    // Determine the number of Y-axis ticks

  const numYAxisTicks = 5;

    // Calculate the width of each bar in the bar plot

  const barPlotWidth = xAxisAvailableWidth / barChartData.length;

  return (
    <svg width={SVG_WIDTH} height={SVG_HEIGHT}>
      <line x1={xAxisMargin} y1={xAxisY} x2={xAxisMargin + xAxisAvailableWidth} y2={xAxisY} stroke="grey" />
      <text x={xAxisMargin + xAxisAvailableWidth + 5} y={xAxisY + 4}>
        Day
      </text>

      <line x1={xAxisMargin} y1={yAxisMargin} x2={xAxisMargin} y2={yAxisMargin + yAxisAvailableHeight} stroke="grey" />

      {Array.from({ length: numYAxisTicks }).map((_, index) => {
        const yAxisTickY = yAxisMargin + index * (yAxisAvailableHeight / numYAxisTicks);
        const yAxisValue = Math.round(dataMaxValue - index * (dataValueRange / numYAxisTicks));
        return (
          <g key={index}>
            <line x1={xAxisMargin} y1={yAxisTickY} x2={xAxisMargin - 5} y2={yAxisTickY} stroke="grey" />
            <text x={xAxisMargin - 5} y={yAxisTickY + 5} textAnchor="end">
              {yAxisValue}
            </text>
          </g>
        );
      })}

      <text x={xAxisMargin} y={yAxisMargin - 8} textAnchor="middle">
        $
      </text>

      {barChartData.map(({ day, value }, index) => {
        const barX = xAxisMargin + index * barPlotWidth;
        const valueRatio = (value - dataMinValue) / dataValueRange;
        const barY = yAxisMargin + (1 - valueRatio) * yAxisAvailableHeight;
        const barHeight = valueRatio * yAxisAvailableHeight;
        const sidePadding = 10;

        const isHovered = hoveredBar === index;
        const barOpacity = isHovered ? 0.7 : 1; // Change opacity for hover effect

        return (
          <g key={index}>
            <rect
              x={barX + sidePadding / 2}
              y={barY}
              width={barPlotWidth - sidePadding}
              height={barHeight}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              fill={`rgba(0, 0, 255, ${barOpacity})`} 
            />
            <text x={barX + barPlotWidth / 2} y={xAxisY + 16} textAnchor="middle">
              {day}
            </text>
            {isHovered && (
              <text x={barX + barPlotWidth / 2} y={barY - 10} textAnchor="middle" className="tooltip">
                Value: {value}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

export default App;

