import React from "react";

/**
 * Fitness Sincera - RingGauge
 * The circular wellness gauge: a thick rounded stroke arc with a
 * big value in the middle. Purple by default (personal/wellness).
 */
export function RingGauge({
  value = 72, size = 160, stroke = 12, tone = "purple",
  label = "", valueText = null, style = {}, ...rest
}) {
  const tones = {
    purple: "var(--purple-500)",
    lime:   "var(--lime-400)",
    green:  "var(--green-400)",
  };
  const color = tones[tone] || tones.purple;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(100, value));
  const offset = c - (c * pct) / 100;

  return (
    <div style={{ position: "relative", width: size, height: size, ...style }} {...rest}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--slate-100)" strokeWidth={stroke} />
        <circle
          cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke={color} strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset var(--dur-slow) var(--ease-out)" }}
        />
      </svg>
      <div style={{
        position: "absolute", inset: 0, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
      }}>
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: size * 0.27, color: "var(--slate-900)", lineHeight: 1 }}>
          {valueText ?? value}
        </span>
        {label && (
          <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", color: "var(--slate-400)", marginTop: 4 }}>
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
