'use client'

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
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
  {
    name: 'Jul',
    NFe: Math.floor(Math.random() * 5000) + 1000,
    NFCe: Math.floor(Math.random() * 5000) + 1000,
    NFSe: Math.floor(Math.random() * 5000) + 1000,
    CTe: Math.floor(Math.random() * 5000) + 1000,
    CTeOS: Math.floor(Math.random() * 5000) + 1000,
    MDFe: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Ago',
    NFe: Math.floor(Math.random() * 5000) + 1000,
    NFCe: Math.floor(Math.random() * 5000) + 1000,
    NFSe: Math.floor(Math.random() * 5000) + 1000,
    CTe: Math.floor(Math.random() * 5000) + 1000,
    CTeOS: Math.floor(Math.random() * 5000) + 1000,
    MDFe: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Set',
    NFe: Math.floor(Math.random() * 5000) + 1000,
    NFCe: Math.floor(Math.random() * 5000) + 1000,
    NFSe: Math.floor(Math.random() * 5000) + 1000,
    CTe: Math.floor(Math.random() * 5000) + 1000,
    CTeOS: Math.floor(Math.random() * 5000) + 1000,
    MDFe: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Out',
    NFe: Math.floor(Math.random() * 5000) + 1000,
    NFCe: Math.floor(Math.random() * 5000) + 1000,
    NFSe: Math.floor(Math.random() * 5000) + 1000,
    CTe: Math.floor(Math.random() * 5000) + 1000,
    CTeOS: Math.floor(Math.random() * 5000) + 1000,
    MDFe: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Nov',
    NFe: Math.floor(Math.random() * 5000) + 1000,
    NFCe: Math.floor(Math.random() * 5000) + 1000,
    NFSe: Math.floor(Math.random() * 5000) + 1000,
    CTe: Math.floor(Math.random() * 5000) + 1000,
    CTeOS: Math.floor(Math.random() * 5000) + 1000,
    MDFe: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Dez',
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
    <ResponsiveContainer width="100%" height={308}>
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        barSize={20}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="NFe" stackId="a" fill="#06C2FD" radius={[0, 0, 4, 4]} />
        <Bar dataKey="NFCe" stackId="a" fill="#0050DC" />
        <Bar dataKey="CTe" stackId="a" fill="#FAD200" />
        <Bar dataKey="CTeOS" stackId="a" fill="#7C3AED" />
        <Bar dataKey="NFSe" stackId="a" fill="#00D47B" />
        <Bar dataKey="MDFe" stackId="a" fill="#F97316" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
