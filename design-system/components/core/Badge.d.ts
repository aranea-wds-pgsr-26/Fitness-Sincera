import React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Colour pair. `protein|carbs|fat` are the macro-pill presets. */
  tone?: "neutral" | "lime" | "green" | "purple" | "amber" | "rose" | "protein" | "carbs" | "fat";
  /** Fill the badge with the solid colour instead of a soft wash. */
  solid?: boolean;
  /** Leading status dot in the current text colour. */
  dot?: boolean;
  children?: React.ReactNode;
}

/** Fully-rounded status / category / macro pill. */
export function Badge(props: BadgeProps): JSX.Element;
