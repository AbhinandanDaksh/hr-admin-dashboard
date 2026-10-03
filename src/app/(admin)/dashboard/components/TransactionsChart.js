"use client";
import { Bar } from "react-chartjs-2";

export default function DepartmentBarChart({ data, baseOptions }) {
  return (
    <div className="w-full bg-white p-5 rounded-2xl border border-zinc-200/70 shadow-[0_1px_4px_rgba(0,0,0,0.02)] h-80 md:h-96">
      <Bar
        data={data}
        options={{
          ...baseOptions,
          plugins: {
            ...baseOptions.plugins,
            title: {
              ...baseOptions.plugins.title,
              text: "Applications by Department",
            },
          },
        }}
      />
    </div>
  );
}
