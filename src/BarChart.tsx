import React, { useState } from "react";
import "./App.css";


interface BarData {
  label: string;
  value: number;
}

interface BarChartProps {
  data: BarData[];
}

// Hover
const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => {
    setHoveredBar(index);
  };

  const handleMouseLeave = () => {
    setHoveredBar(null);
  };

  // Define constants for the dimensions
  
  const xAxisAvailableWidth = 900;
  const yAxisAvailableHeight = 400;

  // yAxis Margin
  const yAxisMargin = 50;

  // Calculate the Y coordinate of the x axis
  const xAxisY = yAxisMargin + yAxisAvailableHeight;

  // Find max and min values in data
  const dataMaxValue = Math.max(...data.map((item) => item.value));
  const dataMinValue = Math.min(...data.map((item) => item.value));
  const dataValueRange = dataMaxValue - dataMinValue;

  // Number of ticks on y axis
  const numYAxisTicks = 5;
  const barPlotWidth = xAxisAvailableWidth / data.length;

  return (
    <svg width={1000} height={600}>
      <line x1={yAxisMargin} y1={xAxisY} x2={yAxisMargin + xAxisAvailableWidth} y2={xAxisY} stroke="grey" />
      <text x={yAxisMargin + xAxisAvailableWidth + 5} y={xAxisY + 4}>
        X
      </text>

      <line x1={yAxisMargin} y1={yAxisMargin} x2={yAxisMargin} y2={yAxisMargin + yAxisAvailableHeight} stroke="grey" />

      {Array.from({ length: numYAxisTicks }).map((_, index) => {
        const yAxisTickY = yAxisMargin + index * (yAxisAvailableHeight / numYAxisTicks);
        const yAxisValue = Math.round(dataMaxValue - index * (dataValueRange / numYAxisTicks));
        return (
          <g key={index}>
            <line x1={yAxisMargin} y1={yAxisTickY} x2={yAxisMargin - 5} y2={yAxisTickY} stroke="grey" />
            <text x={yAxisMargin - 5} y={yAxisTickY + 5} textAnchor="end">
              {yAxisValue}
            </text>
          </g>
        );
      })}

      <text x={yAxisMargin} y={yAxisMargin - 8} textAnchor="middle">
        Y
      </text>

      {data.map(({ label, value }, index) => {
        const barX = yAxisMargin + index * barPlotWidth;
        const valueRatio = (value - dataMinValue) / dataValueRange;
        const barY = yAxisMargin + (1 - valueRatio) * yAxisAvailableHeight;
        const barHeight = valueRatio * yAxisAvailableHeight;
        const sidePadding = 10;

        const isHovered = hoveredBar === index;
        const barOpacity = isHovered ? 0.7 : 1; //Change opacity for hover effect

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
              {label}
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
};

export default BarChart;
