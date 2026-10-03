import { cn } from "@/lib/utils";

const variantStyles = {
  default: "bg-zinc-100 text-zinc-700 border-zinc-200",
  primary: "bg-rose-50 text-rose-700 border-rose-200/70",
  success: "bg-emerald-50 text-emerald-700 border-emerald-200/70",
  warning: "bg-amber-50 text-amber-700 border-amber-200/70",
  danger: "bg-red-50 text-red-700 border-red-200/70",
  info: "bg-blue-50 text-blue-700 border-blue-200/70",
  purple: "bg-purple-50 text-purple-700 border-purple-200/70",
};

export default function Badge({
  children,
  variant = "default",
  className,
  dot = false,
  ...props
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border transition-colors",
        variantStyles[variant] || variantStyles.default,
        className
      )}
      {...props}
    >
      {dot && (
        <span
          className={cn("w-1.5 h-1.5 rounded-full", {
            "bg-zinc-500": variant === "default",
            "bg-rose-500": variant === "primary",
            "bg-emerald-500": variant === "success",
            "bg-amber-500": variant === "warning",
            "bg-red-500": variant === "danger",
            "bg-blue-500": variant === "info",
            "bg-purple-500": variant === "purple",
          })}
        />
      )}
      {children}
    </span>
  );
}
