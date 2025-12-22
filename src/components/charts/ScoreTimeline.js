"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function ScoreTimeline({ data }) {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer>
        <LineChart data={data}>
          <XAxis
            dataKey="createdAt"
            tickFormatter={(d) => new Date(d).toLocaleDateString()}
          />
          <YAxis domain={[0, 10]} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="score"
            stroke="#6366f1"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
