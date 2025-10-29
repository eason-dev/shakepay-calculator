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
  currency: 'USD' | 'CAD';
}

export default function Chart({ data, currency }: ChartProps) {
  // Sample data for better visualization (every 10 days for large datasets)
  const chartData =
    data.length > 100
      ? data.filter((_, index) => index % Math.ceil(data.length / 100) === 0 || index === data.length - 1)
      : data;

  const formatYAxis = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }
    return value.toFixed(0);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  return (
    <div className="w-full">
      {/* Total Sats Chart */}
      <div className="mb-8">
        <h4 className="text-md font-semibold text-gray-600 mb-3">
          Cumulative Satoshis
        </h4>
        <ResponsiveContainer width="100%" height={300}>
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
                value: 'Total Sats',
                angle: -90,
                position: 'insideLeft',
              }}
              stroke="#6b7280"
            />
            <Tooltip
              formatter={(value: number) => [formatNumber(value), 'Total Sats']}
              labelFormatter={(label) => `Day ${label}`}
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="totalSats"
              stroke="#0E67FF"
              strokeWidth={2}
              dot={false}
              name="Total Sats"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Total Value Chart */}
      <div>
        <h4 className="text-md font-semibold text-gray-600 mb-3">
          Cumulative Value ({currency})
        </h4>
        <ResponsiveContainer width="100%" height={300}>
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
                value: `Value (${currency})`,
                angle: -90,
                position: 'insideLeft',
              }}
              stroke="#6b7280"
            />
            <Tooltip
              formatter={(value: number) => [
                formatCurrency(value),
                `Total ${currency}`,
              ]}
              labelFormatter={(label) => `Day ${label}`}
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey={currency === 'USD' ? 'totalUSD' : 'totalCAD'}
              stroke="#10B981"
              strokeWidth={2}
              dot={false}
              name={`Total ${currency}`}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
