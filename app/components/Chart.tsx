'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { DayData } from '../utils/calculator';

interface ChartProps {
  data: DayData[];
}

export default function Chart({ data }: ChartProps) {
  // Sample data for better visualization (every 10 days for large datasets)
  const chartData =
    data.length > 100
      ? data.filter((_, index) => index % Math.ceil(data.length / 100) === 0 || index === data.length - 1)
      : data;

  const formatYAxis = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}K`;
    }
    return `$${value.toFixed(0)}`;
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 border border-gray-300 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-800 mb-2">Day {label}</p>
          <p className="text-sm text-gray-600">
            Total Sats: <span className="font-medium text-shakepay-blue">{formatNumber(data.totalSats)}</span>
          </p>
          <p className="text-sm text-gray-600">
            Total Value: <span className="font-medium text-green-600">{formatCurrency(data.totalUSD)}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="day"
            label={{ value: 'Day', position: 'insideBottom', offset: -5 }}
            stroke="#6b7280"
          />
          <YAxis
            tickFormatter={formatYAxis}
            label={{
              value: 'Total Value (USD)',
              angle: -90,
              position: 'insideLeft',
            }}
            stroke="#6b7280"
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line
            type="monotone"
            dataKey="totalUSD"
            stroke="#10B981"
            strokeWidth={2}
            dot={false}
            name="Total Value (USD)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
