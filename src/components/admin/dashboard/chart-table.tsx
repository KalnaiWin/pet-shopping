"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
// npm install recharts

interface ChartTableProps {
  data: {
    data: string;
    revenue: number;
  }[];
}

export default function ChartTable({ data }: ChartTableProps) {
  return (
    <BarChart width={650} height={300} data={data}>
      <XAxis dataKey="data" stroke="#8884d8" />
      <YAxis />
      <Tooltip />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <Bar dataKey="revenue" fill="#8884d8" barSize={30} />
    </BarChart>
  );
}
