import React from "react";

/**
 * Fitness Sincera - ProgressBar
 * Slim rounded track with a coloured fill. Colour usually encodes
 * the metric: lime = energy/goal, purple = activity, green = hydration.
 */
export function ProgressBar({ value = 0, tone = "lime", height = 8, track = "var(--slate-100)", animate = true, style = {}, ...rest }) {
  const tones = {
    lime:   "var(--lime-400)",
    purple: "var(--purple-500)",
    green:  "var(--green-400)",
    slate:  "var(--slate-400)",
  };
  const fill = tones[tone] || tones.lime;
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div
      style={{ height, width: "100%", background: track, borderRadius: "var(--radius-pill)", overflow: "hidden", ...style }}
      {...rest}
    >
      <div
        style={{
          height: "100%", width: pct + "%", background: fill,
          borderRadius: "var(--radius-pill)",
          transition: animate ? "width var(--dur-slow) var(--ease-out)" : "none",
        }}
      />
    </div>
  );
}
