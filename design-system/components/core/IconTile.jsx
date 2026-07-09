import React from "react";

/**
 * Fitness Sincera - IconTile
 * The rounded-square icon container used everywhere: the brand logo,
 * meal-block icons, total tiles, nav glyphs. Pass a Lucide icon node.
 */
export function IconTile({ tone = "lime", size = 44, radius = "var(--radius-lg)", glow = false, style = {}, children, ...rest }) {
  const tones = {
    lime:    { bg: "var(--lime-400)", fg: "#000", glow: "var(--glow-lime)" },
    green:   { bg: "var(--green-400)", fg: "#fff", glow: "var(--glow-green)" },
    purple:  { bg: "var(--purple-500)", fg: "#fff", glow: "var(--glow-purple)" },
    dark:    { bg: "var(--shell-900)", fg: "#fff", glow: "none" },
    slate:   { bg: "var(--slate-100)", fg: "var(--slate-500)", glow: "none" },
    white:   { bg: "#fff", fg: "var(--slate-500)", glow: "var(--shadow-sm)" },
  };
  const t = tones[tone] || tones.lime;
  return (
    <span
      style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        width: size, height: size, flexShrink: 0,
        background: t.bg, color: t.fg,
        borderRadius: radius,
        boxShadow: glow ? t.glow : "none",
        ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  );
}
