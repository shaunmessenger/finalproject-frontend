import React from "react";
import { PieChart, Pie, Legend, Tooltip } from "recharts";

const ExpenseChart = ({ data }) => (
  <PieChart width={800} height={400}>
    <Pie
      isAnimationActive={false}
      data={data}
      cx={200}
      cy={100}
      outerRadius={100}
      fill="#8884d8"
      label
    />
    <Tooltip />
  </PieChart>
);

export default ExpenseChart;
