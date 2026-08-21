import type { ReactNode } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { fmtMoneyCompact, fmtPct, type PlainInsight } from "@/lib/analytics-insights";

export function Panel({
  title,
  subtitle,
  action,
  children,
  className,
  tone = "card",
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  tone?: "card" | "soft";
}) {
  return (
    <section
      className={cn(
        "overflow-hidden rounded-2xl border border-border/50 backdrop-blur-sm",
        "shadow-[0_1px_3px_oklch(0.14_0.044_264/4%),inset_0_1px_0_oklch(1_0_0/50%)]",
        tone === "soft"
          ? "bg-gradient-to-br from-slate-50/90 via-white/85 to-sky-50/60"
          : "bg-card",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3 border-b border-border/40 px-6 py-4">
        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/70">
            {title}
          </p>
          {subtitle ? <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p> : null}
        </div>
        {action}
      </div>
      <div className="p-6">{children}</div>
    </section>
  );
}

export function StoryBanner({
  title,
  body,
  tone = "info",
}: {
  title: string;
  body: string;
  tone?: "info" | "good" | "warn";
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border px-6 py-6 sm:px-8 sm:py-7 backdrop-blur-sm",
        tone === "info" &&
          "border-sky-200/60 bg-gradient-to-br from-sky-50/90 via-white/80 to-blue-50/60 text-sky-950",
        tone === "good" &&
          "border-emerald-200/60 bg-gradient-to-br from-emerald-50/90 via-white/80 to-teal-50/60 text-emerald-950",
        tone === "warn" &&
          "border-amber-200/60 bg-gradient-to-br from-amber-50/90 via-white/80 to-orange-50/50 text-amber-950",
      )}
    >
      <div className="absolute -right-8 -top-8 h-36 w-36 rounded-full bg-white/30 blur-3xl" />
      <div className="absolute -left-4 -bottom-4 h-24 w-24 rounded-full bg-white/20 blur-2xl" />
      <div className="relative flex items-start gap-4">
        <span
          className={cn(
            "mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl shadow-sm",
            tone === "info" && "bg-sky-100/80 text-sky-600",
            tone === "good" && "bg-emerald-100/80 text-emerald-600",
            tone === "warn" && "bg-amber-100/80 text-amber-700",
          )}
        >
          <Sparkles className="h-4.5 w-4.5" />
        </span>
        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] opacity-50">
            O que está acontecendo
          </p>
          <h2 className="mt-1.5 text-lg font-bold tracking-tight sm:text-xl">{title}</h2>
          <p className="mt-2.5 max-w-3xl text-sm leading-relaxed text-foreground/70">{body}</p>
        </div>
      </div>
    </div>
  );
}

export function InsightCallout({
  title,
  body,
  tone = "info",
}: {
  title: string;
  body: string;
  tone?: "info" | "good" | "warn";
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border px-5 py-4 text-sm backdrop-blur-sm",
        tone === "info" && "border-sky-200/50 bg-sky-50/70 text-sky-950",
        tone === "good" && "border-emerald-200/50 bg-emerald-50/70 text-emerald-950",
        tone === "warn" && "border-amber-200/50 bg-amber-50/70 text-amber-950",
      )}
    >
      <p className="text-[10.5px] font-bold uppercase tracking-wide opacity-60">{title}</p>
      <p className="mt-1.5 text-[13px] leading-relaxed">{body}</p>
    </div>
  );
}

export function InsightStack({ items }: { items: PlainInsight[] }) {
  if (items.length === 0) return null;
  const cols =
    items.length === 1
      ? "grid-cols-1"
      : items.length === 2
        ? "grid-cols-1 md:grid-cols-2"
        : "grid-cols-1 md:grid-cols-2 xl:grid-cols-3";
  return (
    <div className={cn("grid gap-3", cols)}>
      {items.map((item) => (
        <InsightCallout key={item.title + item.body.slice(0, 24)} {...item} />
      ))}
    </div>
  );
}

export function KpiStrip({
  items,
}: {
  items: Array<{
    rank: string;
    label: string;
    value: string;
    hint?: string;
    tone?: "default" | "good" | "warn" | "bad";
  }>;
}) {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {items.map((item, i) => (
        <div
          key={item.rank + item.label}
          className={cn(
            "card-lift animate-fade-up group relative flex flex-col rounded-2xl border border-border/50 bg-card px-5 pb-4 pt-5 overflow-hidden backdrop-blur-sm",
            "shadow-[0_1px_3px_oklch(0.14_0.044_264/4%),inset_0_1px_0_oklch(1_0_0/50%)]",
          )}
          style={{ animationDelay: `${i * 50}ms` }}
        >
          <div className={cn(
            "pointer-events-none absolute -right-4 -top-4 h-16 w-16 rounded-full transition-transform duration-500 group-hover:scale-150",
            item.tone === "good" && "bg-emerald-100/40",
            item.tone === "warn" && "bg-amber-100/40",
            item.tone === "bad" && "bg-rose-100/40",
            (!item.tone || item.tone === "default") && "bg-sky-100/40",
          )} />

          <span className="relative mb-3 text-[9px] font-black tracking-[0.16em] text-muted-foreground/30">
            {item.rank}
          </span>
          <p className="relative text-[10.5px] font-semibold uppercase tracking-wide text-muted-foreground">
            {item.label}
          </p>
          <p
            className={cn(
              "relative mt-2 text-[1.9rem] font-bold leading-none tracking-tight",
              item.tone === "good" && "text-emerald-700",
              item.tone === "warn" && "text-amber-700",
              item.tone === "bad" && "text-rose-600",
              (!item.tone || item.tone === "default") && "text-sky-900",
            )}
          >
            {item.value}
          </p>
          {item.hint ? <p className="relative mt-2 text-[11px] text-muted-foreground/70">{item.hint}</p> : null}
          <div
            className={cn(
              "relative mt-3 h-1 w-full rounded-full",
              item.tone === "good" && "bg-gradient-to-r from-emerald-400 to-emerald-500",
              item.tone === "warn" && "bg-gradient-to-r from-amber-300 to-amber-400",
              item.tone === "bad" && "bg-gradient-to-r from-rose-300 to-rose-400",
              (!item.tone || item.tone === "default") && "bg-gradient-to-r from-sky-400 to-primary",
            )}
          />
        </div>
      ))}
    </div>
  );
}

export function FunnelBars({
  stages,
}: {
  stages: Array<{
    label: string;
    count: number;
    shareOfTotal: number | null;
    rateFromPrev: number | null;
    color: string;
  }>;
}) {
  const max = Math.max(...stages.map((s) => s.count), 1);
  return (
    <div className="space-y-4">
      {stages.map((stage) => (
        <div key={stage.label}>
          <div className="mb-2 flex items-center justify-between gap-2 text-xs">
            <span className="font-semibold text-foreground">{stage.label}</span>
            <span className="tabular-nums text-muted-foreground">
              <strong className="text-foreground">{stage.count}</strong>
              {stage.shareOfTotal != null ? ` · ${fmtPct(stage.shareOfTotal)} do total` : ""}
              {stage.rateFromPrev != null && stage.label !== "Entrada"
                ? ` · ${fmtPct(stage.rateFromPrev)} vs etapa ant.`
                : ""}
            </span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-secondary/60">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${Math.max(4, (stage.count / max) * 100)}%`,
                background: `linear-gradient(90deg, ${stage.color}, ${stage.color}dd)`,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export function StatusChips({
  items,
}: {
  items: Array<{ label: string; count: number; color: string }>;
}) {
  const total = items.reduce((s, i) => s + i.count, 0) || 1;
  return (
    <div className="space-y-4">
      <div className="flex h-3 overflow-hidden rounded-full bg-secondary/50">
        {items
          .filter((i) => i.count > 0)
          .map((item) => (
            <div
              key={item.label}
              title={`${item.label}: ${item.count}`}
              style={{
                width: `${(item.count / total) * 100}%`,
                background: item.color,
              }}
            />
          ))}
      </div>
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {items.map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-border/40 bg-card/60 backdrop-blur-sm px-3.5 py-3 shadow-[inset_0_1px_0_oklch(1_0_0/40%)]"
          >
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full shadow-sm" style={{ background: item.color }} />
              <span className="truncate text-[11px] text-muted-foreground">{item.label}</span>
            </div>
            <p className="mt-1.5 text-lg font-bold tabular-nums text-foreground">{item.count}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const TOOLTIP_STYLE = {
  borderRadius: 16,
  border: "1px solid oklch(0.14 0.044 264 / 8%)",
  background: "oklch(1 0 0 / 90%)",
  backdropFilter: "blur(12px)",
  fontSize: 12,
  boxShadow: "0 8px 24px oklch(0.14 0.044 264 / 8%)",
};

export function RankedBarChart({
  data,
  valueKey = "value",
  nameKey = "name",
  color = "#0369a1",
  formatValue,
  height,
}: {
  data: Array<Record<string, string | number>>;
  valueKey?: string;
  nameKey?: string;
  color?: string | string[];
  formatValue?: (v: number) => string;
  height?: number;
}) {
  if (data.length === 0) {
    return (
      <div className="flex h-48 items-center justify-center text-sm text-muted-foreground">
        Sem dados para o gráfico
      </div>
    );
  }
  const h = height ?? Math.max(220, data.length * 36);
  const colors = Array.isArray(color) ? color : null;

  return (
    <div style={{ height: h }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 4, right: 16, left: 4, bottom: 4 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.14 0.044 264 / 5%)" horizontal={false} />
          <XAxis
            type="number"
            tick={{ fontSize: 10, fill: "#94a3b8" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => (formatValue ? formatValue(Number(v)) : String(v))}
          />
          <YAxis
            type="category"
            dataKey={nameKey}
            width={110}
            tick={{ fontSize: 11, fill: "#475569" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={TOOLTIP_STYLE}
            formatter={(value: number) => [formatValue ? formatValue(value) : value, "Valor"]}
          />
          <Bar dataKey={valueKey} radius={[0, 8, 8, 0]} barSize={18}>
            {data.map((_, index) => (
              <Cell key={index} fill={colors ? colors[index % colors.length] : (color as string)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function CorrelationStat({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail?: string;
}) {
  return (
    <div className="rounded-2xl border border-border/40 bg-card/60 backdrop-blur-sm px-5 py-4 shadow-[inset_0_1px_0_oklch(1_0_0/40%)]">
      <p className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground/70">{label}</p>
      <p className="mt-1.5 text-xl font-bold tabular-nums text-sky-900">{value}</p>
      {detail ? <p className="mt-1.5 text-[11px] text-muted-foreground/70">{detail}</p> : null}
    </div>
  );
}

export function moneyOrDash(v: number | null | undefined) {
  if (v == null) return "—";
  return fmtMoneyCompact(v);
}
