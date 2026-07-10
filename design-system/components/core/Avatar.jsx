import React from "react";

/**
 * Fitness Sincera - Avatar
 * Initials or image avatar. White ring by default; supports a small
 * status dot and stacked groups.
 */
export function Avatar({ src = null, initials = "", size = 40, tone = "slate", ring = true, style = {}, ...rest }) {
  const tones = {
    slate: { bg: "var(--slate-200)", fg: "var(--slate-600)" },
    dark:  { bg: "#525252", fg: "#fff" },
    green: { bg: "var(--green-400)", fg: "#fff" },
    lime:  { bg: "var(--lime-400)", fg: "#000" },
  };
  const t = tones[tone] || tones.slate;
  return (
    <span
      style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        width: size, height: size, flexShrink: 0, overflow: "hidden",
        borderRadius: "var(--radius-pill)",
        background: t.bg, color: t.fg,
        border: ring ? "2px solid #fff" : "none",
        boxShadow: ring ? "var(--shadow-sm)" : "none",
        fontFamily: "var(--font-body)", fontWeight: 800,
        fontSize: Math.round(size * 0.34),
        ...style,
      }}
      {...rest}
    >
      {src
        ? <img src={src} alt={initials} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        : initials}
    </span>
  );
}
