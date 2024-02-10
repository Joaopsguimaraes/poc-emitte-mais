"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Janeiro",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Fevereiro",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Março",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Abril",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Maio",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Junho",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Julho",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Agosto",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Setembro",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Outubro",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Novembro",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Dezembro",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `R$${value}`}
        />
        <Bar
          dataKey="total"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
