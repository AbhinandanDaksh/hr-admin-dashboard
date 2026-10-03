"use client";
import { Line } from "react-chartjs-2";

export default function ApplicationTrendsChart({ data, baseOptions }) {
  return (
    <div className="w-full bg-white p-5 rounded-2xl border border-zinc-200/70 shadow-[0_1px_4px_rgba(0,0,0,0.02)] h-80 md:h-96">
      <Line
        data={data}
        options={{
          ...baseOptions,
          plugins: {
            ...baseOptions.plugins,
            title: {
              ...baseOptions.plugins.title,
              text: "Candidate Applications & Hiring Trend",
            },
          },
        }}
      />
    </div>
  );
}
