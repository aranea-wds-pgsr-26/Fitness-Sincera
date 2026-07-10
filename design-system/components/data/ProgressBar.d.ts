import React from "react";

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 0 - 100. */
  value?: number;
  /** Fill colour - usually encodes the metric. */
  tone?: "lime" | "purple" | "green" | "slate";
  /** Track height in px. Default 8. */
  height?: number;
  /** Track (background) colour. */
  track?: string;
  /** Animate the fill width on mount/change. Default true. */
  animate?: boolean;
}

/** Slim rounded progress track. */
export function ProgressBar(props: ProgressBarProps): JSX.Element;
