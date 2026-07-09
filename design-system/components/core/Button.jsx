import React from "react";

/**
 * Fitness Sincera - Button
 * Pill / rounded action button. Lime is the default action colour;
 * green + purple carry section context; dark/ghost/outline are quiet.
 */
export function Button({
  variant = "primary",
  size = "md",
  icon = null,
  iconRight = null,
  block = false,
  uppercase = false,
  disabled = false,
  style = {},
  children,
  ...rest
}) {
  const sizes = {
    sm: { height: 32, padding: "0 14px", font: 12, radius: "var(--radius-md)", gap: 6 },
    md: { height: 40, padding: "0 18px", font: 13, radius: "var(--radius-lg)", gap: 8 },
    lg: { height: 48, padding: "0 24px", font: 15, radius: "var(--radius-lg)", gap: 8 },
  };
  const variants = {
    primary: { background: "var(--lime-400)", color: "#000", border: "none", shadow: "var(--shadow-sm)" },
    green:   { background: "var(--green-500)", color: "#fff", border: "none", shadow: "0 8px 20px rgba(5,150,105,.20)" },
    purple:  { background: "var(--purple-500)", color: "#fff", border: "none", shadow: "var(--glow-purple)" },
    dark:    { background: "var(--shell-900)", color: "#fff", border: "none", shadow: "var(--shadow-sm)" },
    outline: { background: "transparent", color: "var(--slate-700)", border: "1px solid var(--slate-200)", shadow: "none" },
    ghost:   { background: "transparent", color: "var(--slate-500)", border: "none", shadow: "none" },
  };
  const s = sizes[size] || sizes.md;
  const v = variants[variant] || variants.primary;

  return (
    <button
      disabled={disabled}
      style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        gap: s.gap, height: s.height, padding: s.padding,
        borderRadius: s.radius, border: v.border, background: v.background, color: v.color,
        boxShadow: v.shadow,
        fontFamily: "var(--font-body)", fontWeight: 800,
        fontSize: s.font,
        textTransform: uppercase ? "uppercase" : "none",
        letterSpacing: uppercase ? "var(--tracking-wide)" : "0",
        width: block ? "100%" : "auto",
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "transform var(--dur-fast) var(--ease-snap), background var(--dur-fast), box-shadow var(--dur-fast)",
        ...style,
      }}
      onMouseDown={(e) => { if (!disabled) e.currentTarget.style.transform = "scale(0.98)"; }}
      onMouseUp={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
      {...rest}
    >
      {icon}
      {children}
      {iconRight}
    </button>
  );
}
