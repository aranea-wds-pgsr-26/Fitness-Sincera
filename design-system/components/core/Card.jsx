import React from "react";

/**
 * Fitness Sincera - Card
 * The canonical white work surface: soft shadow, generous radius,
 * hairline border. `pad` toggles default padding; `interactive`
 * adds the signature hover-lift.
 */
export function Card({ pad = true, radius = "var(--radius-xl)", interactive = false, style = {}, children, ...rest }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onMouseEnter={() => interactive && setHover(true)}
      onMouseLeave={() => interactive && setHover(false)}
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border-card)",
        borderRadius: radius,
        boxShadow: hover ? "var(--shadow-lg)" : "var(--shadow-card)",
        padding: pad ? "var(--space-6)" : 0,
        transform: hover ? "translateY(-4px)" : "none",
        transition: "transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base)",
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
