import { cn } from "@/lib/utils";

export type SubTabItem<T extends string> = {
  id: T;
  label: string;
  description?: string;
};

export function SubTabs<T extends string>({
  tabs,
  value,
  onChange,
}: {
  tabs: SubTabItem<T>[];
  value: T;
  onChange: (id: T) => void;
}) {
  return (
    <div className="flex flex-wrap gap-1 rounded-2xl border border-border/40 bg-secondary/30 p-1 backdrop-blur-sm">
      {tabs.map((tab) => {
        const active = tab.id === value;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={cn(
              "rounded-xl px-4 py-2.5 text-left transition-all duration-200",
              active
                ? "bg-card text-foreground shadow-sm border border-border/40"
                : "text-muted-foreground hover:text-foreground hover:bg-card/50",
            )}
          >
            <span className="block text-xs font-semibold">{tab.label}</span>
            {tab.description ? (
              <span className="mt-0.5 block text-[10px] text-muted-foreground">{tab.description}</span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
