import React from "react";

/**
 * Fitness Sincera - StatCard
 * The dashboard metric tile: a quiet label + chevron up top, a big
 * black number bottom-left, and an optional slot (avatar stack,
 * sparkline, badge) bottom-right. Lifts on hover.
 */
export function StatCard({ label = "", value = "", slot = null, onClick, style = {}, ...rest }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: "var(--bg-card)", border: "1px solid var(--border-card)",
        borderRadius: "var(--radius-xl)", padding: "var(--space-6)",
        boxShadow: hover ? "var(--shadow-lg)" : "var(--shadow-sm)",
        cursor: onClick ? "pointer" : "default",
        display: "flex", flexDirection: "column", justifyContent: "space-between",
        minHeight: 132, gap: 16,
        transition: "box-shadow var(--dur-base)",
        ...style,
      }}
      {...rest}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
        <span style={{ fontSize: 13, fontWeight: 500, color: "var(--slate-500)" }}>{label}</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--slate-300)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 12 }}>
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 40, lineHeight: 1, color: "var(--slate-800)" }}>{value}</span>
        {slot}
      </div>
    </div>
  );
}
