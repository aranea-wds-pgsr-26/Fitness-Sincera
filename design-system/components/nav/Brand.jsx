import React from "react";

/**
 * Fitness Sincera - Brand
 * The lime Zap tile + wordmark lock-up. `variant="wordmark"` shows
 * lowercase "flux"; `variant="full"` shows "Fitness Sincera".
 * Designed for the dark sidebar / auth screens.
 */
export function Brand({ variant = "wordmark", size = 32, onDark = true, style = {}, ...rest }) {
  const tile = Math.round(size * 1.25);
  const label = variant === "full" ? "Fitness Sincera" : "flux";
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 10, ...style }} {...rest}>
      <span style={{
        width: tile, height: tile, background: "var(--lime-400)",
        borderRadius: Math.round(tile * 0.3), display: "inline-flex",
        alignItems: "center", justifyContent: "center", boxShadow: "var(--glow-lime)",
      }}>
        <svg width={tile * 0.55} height={tile * 0.55} viewBox="0 0 24 24" fill="#000" stroke="#000" strokeWidth="1.5" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      </span>
      <span style={{
        fontSize: size, fontWeight: variant === "full" ? 900 : 800,
        letterSpacing: "var(--tracking-tighter)",
        color: onDark ? "#fff" : "var(--slate-900)",
      }}>{label}</span>
    </div>
  );
}
