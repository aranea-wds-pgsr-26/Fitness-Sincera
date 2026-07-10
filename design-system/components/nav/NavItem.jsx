import React from "react";

/**
 * Fitness Sincera - NavItem
 * A sidebar nav row for the dark shell. Active = filled tile (lime by
 * default, purple for the Treino/personal context). Idle rows are
 * muted slate and lighten on hover. Optional trailing count badge.
 */
export function NavItem({
  icon = null, label = "", active = false, context = "lime",
  count = null, onClick, style = {}, ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const activeBg = context === "purple" ? "var(--purple-500)" : "var(--lime-400)";
  const activeFg = context === "purple" ? "#fff" : "#000";
  const activeShadow = context === "purple" ? "var(--glow-purple)" : "var(--shadow-lg)";

  const bg = active ? activeBg : hover ? "rgba(255,255,255,0.06)" : "transparent";
  const fg = active ? activeFg : hover ? "#fff" : "var(--slate-400)";

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        width: "100%", padding: "12px 16px", border: "none",
        borderRadius: "var(--radius-lg)", background: bg, color: fg,
        boxShadow: active ? activeShadow : "none",
        fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 14,
        letterSpacing: "var(--tracking-tight)",
        transition: "background var(--dur-base), color var(--dur-base)",
        ...style,
      }}
      {...rest}
    >
      <span style={{ display: "inline-flex", alignItems: "center", gap: 12 }}>
        {icon}
        {label}
      </span>
      {count != null && (
        <span style={{
          minWidth: 20, height: 20, padding: "0 6px", borderRadius: "var(--radius-pill)",
          background: active ? "rgba(0,0,0,0.15)" : "var(--lime-400)",
          color: active ? activeFg : "#000",
          fontSize: 10, fontWeight: 900, display: "inline-flex", alignItems: "center", justifyContent: "center",
        }}>{count}</span>
      )}
    </button>
  );
}
