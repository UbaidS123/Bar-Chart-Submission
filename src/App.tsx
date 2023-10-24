import React from "react";
import "./App.css";
import BarChart from "./BarChart";

const barChartData = [
  { label: "Mon", value: 12 },
  { label: "Tue", value: 14 },
  { label: "Wed", value: 12 },
  { label: "Thu", value: 4 },
  { label: "Fri", value: 5 },
  { label: "Sat", value: 18 },
  { label: "Sun", value: 0 },
];

function App() {
  return (
    <div className="App">
      <h1>Bar Chart</h1>
      <BarChart data={barChartData} />
    </div>
  );
}

export default App;
