import React from "react";

export interface RingGaugeProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 0 - 100. */
  value?: number;
  /** Diameter in px. Default 160. */
  size?: number;
  /** Stroke width in px. Default 12. */
  stroke?: number;
  tone?: "purple" | "lime" | "green";
  /** Caption under the value. */
  label?: string;
  /** Override the centre text (e.g. "68%"). Defaults to value. */
  valueText?: React.ReactNode;
}

/** Circular wellness gauge with a centred value. */
export function RingGauge(props: RingGaugeProps): JSX.Element;
