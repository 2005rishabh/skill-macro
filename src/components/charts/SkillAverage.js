"use client";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

export default function SkillAverage({ data }) {
    return (
        <div className="h-64 w-full">
            <ResponsiveContainer>
                <BarChart data={data}>
                    <XAxis dataKey="skillType" />
                    <YAxis domain={[0, 10]} />
                    <Tooltip />
                    <Bar dataKey="avgScore" fill="#22c55e" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
