import React from "react";

/**
 * Fitness Sincera - Badge
 * Fully-rounded status / category pill. `tone` selects a soft
 * background + saturated text pair; `solid` fills it instead.
 */
export function Badge({ tone = "neutral", solid = false, dot = false, style = {}, children, ...rest }) {
  const tones = {
    neutral: { bg: "var(--slate-100)", fg: "var(--slate-500)", solid: "var(--slate-600)" },
    lime:    { bg: "rgba(212,245,76,.25)", fg: "var(--lime-ink)", solid: "var(--lime-400)", solidFg: "#000" },
    green:   { bg: "var(--ok-bg)", fg: "var(--green-500)", solid: "var(--green-400)" },
    purple:  { bg: "#f3f0ff", fg: "var(--purple-500)", solid: "var(--purple-500)" },
    amber:   { bg: "var(--warning-bg)", fg: "var(--warning)", solid: "var(--warning)" },
    rose:    { bg: "var(--danger-bg)", fg: "var(--danger)", solid: "var(--danger)" },
    protein: { bg: "var(--macro-protein-bg)", fg: "var(--macro-protein)", solid: "var(--macro-protein)" },
    carbs:   { bg: "var(--macro-carbs-bg)", fg: "var(--macro-carbs)", solid: "var(--macro-carbs)" },
    fat:     { bg: "var(--macro-fat-bg)", fg: "var(--macro-fat)", solid: "var(--macro-fat)" },
  };
  const t = tones[tone] || tones.neutral;
  return (
    <span
      style={{
        display: "inline-flex", alignItems: "center", gap: 5,
        padding: "4px 10px", borderRadius: "var(--radius-pill)",
        fontFamily: "var(--font-body)", fontSize: 11, fontWeight: 800,
        lineHeight: 1.4,
        background: solid ? t.solid : t.bg,
        color: solid ? (t.solidFg || "#fff") : t.fg,
        ...style,
      }}
      {...rest}
    >
      {dot && <span style={{ width: 6, height: 6, borderRadius: "50%", background: "currentColor" }} />}
      {children}
    </span>
  );
}
