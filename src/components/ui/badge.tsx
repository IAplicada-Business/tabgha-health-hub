import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold tracking-wide transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:     "border-transparent bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-sm",
        secondary:   "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive/90 text-destructive-foreground shadow-sm",
        outline:     "border-border/60 text-foreground bg-card/50 backdrop-blur-sm",
        success:     "border-green-200/60 bg-green-100 text-green-700",
        warning:     "border-yellow-200/60 bg-yellow-100 text-yellow-700",
        error:       "border-red-200/60 bg-red-100 text-red-700",
        info:        "border-blue-200/60 bg-blue-100 text-blue-700",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
