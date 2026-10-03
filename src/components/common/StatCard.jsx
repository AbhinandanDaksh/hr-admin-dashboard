import { IoIosTrendingDown, IoIosTrendingUp } from "react-icons/io";
import { cn } from "@/lib/utils";

export default function StatCard({
  title,
  value,
  percentage,
  isIncrease = true,
  description,
  icon: Icon,
  variant = "rose",
  className,
}) {
  const iconVariants = {
    rose: "bg-rose-50 text-rose-600 border-rose-100/60",
    pink: "bg-pink-50 text-pink-600 border-pink-100/60",
    amber: "bg-amber-50 text-amber-600 border-amber-100/60",
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-100/60",
    blue: "bg-blue-50 text-blue-600 border-blue-100/60",
    zinc: "bg-zinc-100 text-zinc-600 border-zinc-200/60",
  };

  return (
    <div
      className={cn(
        "bg-white rounded-2xl p-5 border border-zinc-200/70 shadow-[0_1px_4px_rgba(0,0,0,0.02)] hover:shadow-md hover:border-rose-200 transition-all",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
          {title}
        </span>
        {Icon && (
          <div
            className={cn(
              "w-9 h-9 rounded-xl flex items-center justify-center border",
              iconVariants[variant] || iconVariants.rose
            )}
          >
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="mt-3 flex items-baseline justify-between">
        <h3 className="text-2xl font-extrabold text-zinc-900 tracking-tight">
          {value}
        </h3>
        {percentage !== undefined && (
          <span
            className={cn(
              "inline-flex items-center gap-0.5 text-xs font-semibold px-2 py-0.5 rounded-md border",
              isIncrease
                ? "text-emerald-700 bg-emerald-50 border-emerald-100"
                : "text-red-700 bg-red-50 border-red-100"
            )}
          >
            {isIncrease ? <IoIosTrendingUp /> : <IoIosTrendingDown />}
            {percentage}%
          </span>
        )}
      </div>

      {description && (
        <p className="mt-1.5 text-xs text-zinc-400 font-normal">{description}</p>
      )}
    </div>
  );
}
