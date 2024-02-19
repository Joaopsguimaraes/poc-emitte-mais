'use client'

import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const data = [
  {
    name: 'Jan',
    NFe: Math.floor(Math.random() * 5000) + 1000,
    NFCe: Math.floor(Math.random() * 5000) + 1000,
    NFSe: Math.floor(Math.random() * 5000) + 1000,
    CTe: Math.floor(Math.random() * 5000) + 1000,
    CTeOS: Math.floor(Math.random() * 5000) + 1000,
    MDFe: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Fev',
    NFe: Math.floor(Math.random() * 5000) + 1000,
    NFCe: Math.floor(Math.random() * 5000) + 1000,
    NFSe: Math.floor(Math.random() * 5000) + 1000,
    CTe: Math.floor(Math.random() * 5000) + 1000,
    CTeOS: Math.floor(Math.random() * 5000) + 1000,
    MDFe: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Mar',
    NFe: Math.floor(Math.random() * 5000) + 1000,
    NFCe: Math.floor(Math.random() * 5000) + 1000,
    NFSe: Math.floor(Math.random() * 5000) + 1000,
    CTe: Math.floor(Math.random() * 5000) + 1000,
    CTeOS: Math.floor(Math.random() * 5000) + 1000,
    MDFe: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Abr',
    NFe: Math.floor(Math.random() * 5000) + 1000,
    NFCe: Math.floor(Math.random() * 5000) + 1000,
    NFSe: Math.floor(Math.random() * 5000) + 1000,
    CTe: Math.floor(Math.random() * 5000) + 1000,
    CTeOS: Math.floor(Math.random() * 5000) + 1000,
    MDFe: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Mai',
    NFe: Math.floor(Math.random() * 5000) + 1000,
    NFCe: Math.floor(Math.random() * 5000) + 1000,
    NFSe: Math.floor(Math.random() * 5000) + 1000,
    CTe: Math.floor(Math.random() * 5000) + 1000,
    CTeOS: Math.floor(Math.random() * 5000) + 1000,
    MDFe: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Jun',
    NFe: Math.floor(Math.random() * 5000) + 1000,
    NFCe: Math.floor(Math.random() * 5000) + 1000,
    NFSe: Math.floor(Math.random() * 5000) + 1000,
    CTe: Math.floor(Math.random() * 5000) + 1000,
    CTeOS: Math.floor(Math.random() * 5000) + 1000,
    MDFe: Math.floor(Math.random() * 5000) + 1000,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={310}>
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
          tickFormatter={(value) => `${value}`}
        />
        <Tooltip
          contentStyle={{
            background: 'rgba(255, 255, 255, 0.8)',
            border: 'none',
            borderRadius: '4px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            padding: '10px',
            fontSize: '12px',
          }}
        />
        <Bar
          dataKey="NFe"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-[#FF005A]"
        />
        <Bar
          dataKey="NFCe"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-[#DC005F]"
        />
        <Bar
          dataKey="NFSe"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-[#B90064]"
        />
        <Bar
          dataKey="CTe"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-[#950068]"
        />
        <Bar
          dataKey="CTeOS"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-[#72006D]"
        />
        <Bar
          dataKey="MDFe"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-[#4F0072]"
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
