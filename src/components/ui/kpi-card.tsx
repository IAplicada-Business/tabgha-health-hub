import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Direction = "up" | "down" | "neutral";

interface KpiCardProps {
  label: string;
  value: number | string;
  delta?: { value: string; label?: string; direction?: Direction };
  icon?: React.ComponentType<{ className?: string }>;
  format?: "number" | "currency" | "percent" | "multiplier" | "raw";
  loading?: boolean;
  className?: string;
  accentColor?: string;
}

function formatValue(value: number | string, format: KpiCardProps["format"] = "number"): string {
  if (typeof value === "string") return value;
  if (format === "currency") return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(value);
  if (format === "percent") return `${(value * 100).toFixed(0)}%`;
  if (format === "multiplier") return `${value.toFixed(1)}×`;
  if (format === "raw") return String(value);
  return new Intl.NumberFormat("pt-BR").format(value);
}

export function KpiCard({ label, value, delta, icon: Icon, format = "number", loading = false, className, accentColor }: KpiCardProps) {
  const direction = delta?.direction ?? "neutral";
  const deltaColor = direction === "up" ? "text-emerald-600" : direction === "down" ? "text-rose-600" : "text-muted-foreground";
  const deltaBg = direction === "up" ? "bg-emerald-50 border-emerald-100" : direction === "down" ? "bg-rose-50 border-rose-100" : "bg-muted/50 border-border";
  const arrow = direction === "up" ? "↑" : direction === "down" ? "↓" : "";

  return (
    <div className={cn(
      "group relative rounded-2xl border border-border/50 bg-card p-5 overflow-hidden backdrop-blur-sm",
      "shadow-[0_1px_3px_oklch(0.14_0.044_264/4%),inset_0_1px_0_oklch(1_0_0/50%)]",
      "transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_oklch(0.14_0.044_264/8%)]",
      "hover:border-primary/15",
      className,
    )}>
      <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br from-primary/6 to-brand-sky/4 transition-transform duration-500 group-hover:scale-125" />

      <div className="relative z-10">
        <div className="flex items-center justify-between gap-2">
          <p className="text-[10.5px] font-semibold uppercase tracking-[0.08em] text-muted-foreground leading-none">{label}</p>
          {Icon && (
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-brand-sky/8 ring-1 ring-primary/8">
              <Icon className="h-4 w-4 text-primary" />
            </div>
          )}
        </div>

        <div className="mt-3">
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          ) : (
            <p
              className={cn("text-[30px] font-bold leading-none tracking-[-0.024em]", accentColor ?? "text-foreground")}
              style={{ fontVariantNumeric: "tabular-nums" }}
            >
              {formatValue(value, format)}
            </p>
          )}
        </div>

        {delta && !loading && (
          <div className="mt-3 flex items-center gap-1.5">
            <span className={cn(
              "inline-flex items-center gap-0.5 rounded-full border px-2 py-0.5 text-[10px] font-semibold",
              deltaBg, deltaColor,
            )}>
              {arrow && <span className="text-[9px]">{arrow}</span>}
              {delta.value}
            </span>
            {delta.label && (
              <span className="text-[10.5px] text-muted-foreground">{delta.label}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
