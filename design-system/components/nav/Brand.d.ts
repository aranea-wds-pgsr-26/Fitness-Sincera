import React from "react";

export interface BrandProps extends React.HTMLAttributes<HTMLDivElement> {
  /** "wordmark" -> lowercase flux; "full" -> Fitness Sincera. */
  variant?: "wordmark" | "full";
  /** Wordmark font-size in px (tile scales with it). Default 32. */
  size?: number;
  /** White text for dark surfaces (default) vs dark text. */
  onDark?: boolean;
}

/** Lime Zap tile + wordmark lock-up. */
export function Brand(props: BrandProps): JSX.Element;
