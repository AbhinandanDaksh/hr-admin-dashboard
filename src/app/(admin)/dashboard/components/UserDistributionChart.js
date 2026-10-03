"use client";
import { Doughnut } from "react-chartjs-2";

export default function RecruitmentStatusDoughnut({ title = "Recruitment Pipeline", chartData, baseOptions }) {
  return (
    <div className="w-full bg-white p-5 rounded-2xl border border-zinc-200/70 shadow-[0_1px_4px_rgba(0,0,0,0.02)] h-80 md:h-96">
      <Doughnut
        data={chartData}
        options={{
          ...baseOptions,
          plugins: {
            ...baseOptions.plugins,
            title: {
              ...baseOptions.plugins.title,
              text: title,
            },
          },
          cutout: "68%",
        }}
      />
    </div>
  );
}
