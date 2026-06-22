"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function GraficoCalificaciones({
  rango13,
  rango46,
  rango710,
}: {
  rango13: number;
  rango46: number;
  rango710: number;
}) {
  const data = [
    {
      rango: "1-3",
      cantidad: rango13,
    },
    {
      rango: "4-6",
      cantidad: rango46,
    },
    {
      rango: "7-10",
      cantidad: rango710,
    },
  ];

  return (
    <ResponsiveContainer
      width="100%"
      height={200}
    >
      <BarChart
        data={data}
        margin={{
          top: 10,
          right: 10,
          left: -20,
          bottom: 0,
        }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
        />

        <XAxis
          dataKey="rango"
        />

        <YAxis />

        <Tooltip />

        <Bar
          dataKey="cantidad"
          radius={[8, 8, 0, 0]}
          barSize={28}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}