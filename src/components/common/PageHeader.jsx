import { cn } from "@/lib/utils";

export default function PageHeader({
  title,
  subtitle,
  children,
  badge,
  className,
}) {
  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 w-full",
        className
      )}
    >
      <div className="space-y-1">
        <div className="flex items-center gap-2.5">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900">
            {title}
          </h1>
          {badge && <div>{badge}</div>}
        </div>
        {subtitle && (
          <p className="text-xs sm:text-sm text-zinc-500 font-normal">
            {subtitle}
          </p>
        )}
      </div>

      {children && (
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          {children}
        </div>
      )}
    </div>
  );
}
