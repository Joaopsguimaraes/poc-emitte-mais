'use client'

import {
  AreaChart,
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'

const data = [
  {
    name: 'Jan',
    nfe: Math.floor(Math.random() * 5000) + 1000,
    nfce: Math.floor(Math.random() * 5000) + 1000,
    nfse: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Fev',
    nfe: Math.floor(Math.random() * 5000) + 1000,
    nfce: Math.floor(Math.random() * 5000) + 1000,
    nfse: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Mar',
    nfe: Math.floor(Math.random() * 5000) + 1000,
    nfce: Math.floor(Math.random() * 5000) + 1000,
    nfse: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Abr',
    nfe: Math.floor(Math.random() * 5000) + 1000,
    nfce: Math.floor(Math.random() * 5000) + 1000,
    nfse: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Mai',
    nfe: Math.floor(Math.random() * 5000) + 1000,
    nfce: Math.floor(Math.random() * 5000) + 1000,
    nfse: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Jun',
    nfe: Math.floor(Math.random() * 5000) + 1000,
    nfce: Math.floor(Math.random() * 5000) + 1000,
    nfse: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Jul',
    nfe: Math.floor(Math.random() * 5000) + 1000,
    nfce: Math.floor(Math.random() * 5000) + 1000,
    nfse: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Ago',
    nfe: Math.floor(Math.random() * 5000) + 1000,
    nfce: Math.floor(Math.random() * 5000) + 1000,
    nfse: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Set',
    nfe: Math.floor(Math.random() * 5000) + 1000,
    nfce: Math.floor(Math.random() * 5000) + 1000,
    nfse: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Out',
    nfe: Math.floor(Math.random() * 5000) + 1000,
    nfce: Math.floor(Math.random() * 5000) + 1000,
    nfse: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Nov',
    nfe: Math.floor(Math.random() * 5000) + 1000,
    nfce: Math.floor(Math.random() * 5000) + 1000,
    nfse: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Dez',
    nfe: Math.floor(Math.random() * 5000) + 1000,
    nfce: Math.floor(Math.random() * 5000) + 1000,
    nfse: Math.floor(Math.random() * 5000) + 1000,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={308}>
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
        <Bar
          dataKey="nfe"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
        <Bar
          dataKey="nfce"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-secondary"
        />
        <Bar
          dataKey="nfse"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-[#C40062]"
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
