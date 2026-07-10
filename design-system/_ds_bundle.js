/* @ds-bundle: {"format":4,"namespace":"FitnessSinceraDesignSystem_06b67f","components":[{"name":"Avatar","sourcePath":"components/core/Avatar.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"IconTile","sourcePath":"components/core/IconTile.jsx"},{"name":"ProgressBar","sourcePath":"components/data/ProgressBar.jsx"},{"name":"RingGauge","sourcePath":"components/data/RingGauge.jsx"},{"name":"StatCard","sourcePath":"components/data/StatCard.jsx"},{"name":"Brand","sourcePath":"components/nav/Brand.jsx"},{"name":"NavItem","sourcePath":"components/nav/NavItem.jsx"}],"sourceHashes":{"components/core/Avatar.jsx":"ad7fdc82ded4","components/core/Badge.jsx":"c706d6ee6414","components/core/Button.jsx":"6469f18e9ce9","components/core/Card.jsx":"cef495979b78","components/core/IconTile.jsx":"e5a801cfaa3c","components/data/ProgressBar.jsx":"281b86f0f785","components/data/RingGauge.jsx":"7c82e4104b17","components/data/StatCard.jsx":"9150b46190a8","components/nav/Brand.jsx":"21cd0567e6bb","components/nav/NavItem.jsx":"0530b6abaad4","ui_kits/aluno/app-shell.jsx":"a81e63e88a3a","ui_kits/aluno/data.js":"4b6bb4190e0b","ui_kits/aluno/lucide-react-shim.js":"2f8f1279beb8","ui_kits/aluno/screen-dashboard.jsx":"52da19fc89f1","ui_kits/aluno/screen-nutricao.jsx":"1e3e5ea2cda9","ui_kits/nutricionista/data.js":"0e184e6d47a7","ui_kits/nutricionista/lucide-react-shim.js":"2f8f1279beb8","ui_kits/nutricionista/nutri-shell.jsx":"fe095d8e9c99","ui_kits/nutricionista/plano-editor.jsx":"4c8f14276264","ui_kits/nutricionista/screen-dashboard.jsx":"b71442155a14"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.FitnessSinceraDesignSystem_06b67f = window.FitnessSinceraDesignSystem_06b67f || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Fitness Sincera - Avatar
 * Initials or image avatar. White ring by default; supports a small
 * status dot and stacked groups.
 */
function Avatar({
  src = null,
  initials = "",
  size = 40,
  tone = "slate",
  ring = true,
  style = {},
  ...rest
}) {
  const tones = {
    slate: {
      bg: "var(--slate-200)",
      fg: "var(--slate-600)"
    },
    dark: {
      bg: "#525252",
      fg: "#fff"
    },
    green: {
      bg: "var(--green-400)",
      fg: "#fff"
    },
    lime: {
      bg: "var(--lime-400)",
      fg: "#000"
    }
  };
  const t = tones[tone] || tones.slate;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: size,
      height: size,
      flexShrink: 0,
      overflow: "hidden",
      borderRadius: "var(--radius-pill)",
      background: t.bg,
      color: t.fg,
      border: ring ? "2px solid #fff" : "none",
      boxShadow: ring ? "var(--shadow-sm)" : "none",
      fontFamily: "var(--font-body)",
      fontWeight: 800,
      fontSize: Math.round(size * 0.34),
      ...style
    }
  }, rest), src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: initials,
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  }) : initials);
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Fitness Sincera - Badge
 * Fully-rounded status / category pill. `tone` selects a soft
 * background + saturated text pair; `solid` fills it instead.
 */
function Badge({
  tone = "neutral",
  solid = false,
  dot = false,
  style = {},
  children,
  ...rest
}) {
  const tones = {
    neutral: {
      bg: "var(--slate-100)",
      fg: "var(--slate-500)",
      solid: "var(--slate-600)"
    },
    lime: {
      bg: "rgba(212,245,76,.25)",
      fg: "var(--lime-ink)",
      solid: "var(--lime-400)",
      solidFg: "#000"
    },
    green: {
      bg: "var(--ok-bg)",
      fg: "var(--green-500)",
      solid: "var(--green-400)"
    },
    purple: {
      bg: "#f3f0ff",
      fg: "var(--purple-500)",
      solid: "var(--purple-500)"
    },
    amber: {
      bg: "var(--warning-bg)",
      fg: "var(--warning)",
      solid: "var(--warning)"
    },
    rose: {
      bg: "var(--danger-bg)",
      fg: "var(--danger)",
      solid: "var(--danger)"
    },
    protein: {
      bg: "var(--macro-protein-bg)",
      fg: "var(--macro-protein)",
      solid: "var(--macro-protein)"
    },
    carbs: {
      bg: "var(--macro-carbs-bg)",
      fg: "var(--macro-carbs)",
      solid: "var(--macro-carbs)"
    },
    fat: {
      bg: "var(--macro-fat-bg)",
      fg: "var(--macro-fat)",
      solid: "var(--macro-fat)"
    }
  };
  const t = tones[tone] || tones.neutral;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 5,
      padding: "4px 10px",
      borderRadius: "var(--radius-pill)",
      fontFamily: "var(--font-body)",
      fontSize: 11,
      fontWeight: 800,
      lineHeight: 1.4,
      background: solid ? t.solid : t.bg,
      color: solid ? t.solidFg || "#fff" : t.fg,
      ...style
    }
  }, rest), dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: "50%",
      background: "currentColor"
    }
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Fitness Sincera - Button
 * Pill / rounded action button. Lime is the default action colour;
 * green + purple carry section context; dark/ghost/outline are quiet.
 */
function Button({
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
    sm: {
      height: 32,
      padding: "0 14px",
      font: 12,
      radius: "var(--radius-md)",
      gap: 6
    },
    md: {
      height: 40,
      padding: "0 18px",
      font: 13,
      radius: "var(--radius-lg)",
      gap: 8
    },
    lg: {
      height: 48,
      padding: "0 24px",
      font: 15,
      radius: "var(--radius-lg)",
      gap: 8
    }
  };
  const variants = {
    primary: {
      background: "var(--lime-400)",
      color: "#000",
      border: "none",
      shadow: "var(--shadow-sm)"
    },
    green: {
      background: "var(--green-500)",
      color: "#fff",
      border: "none",
      shadow: "0 8px 20px rgba(5,150,105,.20)"
    },
    purple: {
      background: "var(--purple-500)",
      color: "#fff",
      border: "none",
      shadow: "var(--glow-purple)"
    },
    dark: {
      background: "var(--shell-900)",
      color: "#fff",
      border: "none",
      shadow: "var(--shadow-sm)"
    },
    outline: {
      background: "transparent",
      color: "var(--slate-700)",
      border: "1px solid var(--slate-200)",
      shadow: "none"
    },
    ghost: {
      background: "transparent",
      color: "var(--slate-500)",
      border: "none",
      shadow: "none"
    }
  };
  const s = sizes[size] || sizes.md;
  const v = variants[variant] || variants.primary;
  return /*#__PURE__*/React.createElement("button", _extends({
    disabled: disabled,
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: s.gap,
      height: s.height,
      padding: s.padding,
      borderRadius: s.radius,
      border: v.border,
      background: v.background,
      color: v.color,
      boxShadow: v.shadow,
      fontFamily: "var(--font-body)",
      fontWeight: 800,
      fontSize: s.font,
      textTransform: uppercase ? "uppercase" : "none",
      letterSpacing: uppercase ? "var(--tracking-wide)" : "0",
      width: block ? "100%" : "auto",
      opacity: disabled ? 0.5 : 1,
      cursor: disabled ? "not-allowed" : "pointer",
      transition: "transform var(--dur-fast) var(--ease-snap), background var(--dur-fast), box-shadow var(--dur-fast)",
      ...style
    },
    onMouseDown: e => {
      if (!disabled) e.currentTarget.style.transform = "scale(0.98)";
    },
    onMouseUp: e => {
      e.currentTarget.style.transform = "scale(1)";
    },
    onMouseLeave: e => {
      e.currentTarget.style.transform = "scale(1)";
    }
  }, rest), icon, children, iconRight);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Fitness Sincera - Card
 * The canonical white work surface: soft shadow, generous radius,
 * hairline border. `pad` toggles default padding; `interactive`
 * adds the signature hover-lift.
 */
function Card({
  pad = true,
  radius = "var(--radius-xl)",
  interactive = false,
  style = {},
  children,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", _extends({
    onMouseEnter: () => interactive && setHover(true),
    onMouseLeave: () => interactive && setHover(false),
    style: {
      background: "var(--bg-card)",
      border: "1px solid var(--border-card)",
      borderRadius: radius,
      boxShadow: hover ? "var(--shadow-lg)" : "var(--shadow-card)",
      padding: pad ? "var(--space-6)" : 0,
      transform: hover ? "translateY(-4px)" : "none",
      transition: "transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base)",
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/IconTile.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Fitness Sincera - IconTile
 * The rounded-square icon container used everywhere: the brand logo,
 * meal-block icons, total tiles, nav glyphs. Pass a Lucide icon node.
 */
function IconTile({
  tone = "lime",
  size = 44,
  radius = "var(--radius-lg)",
  glow = false,
  style = {},
  children,
  ...rest
}) {
  const tones = {
    lime: {
      bg: "var(--lime-400)",
      fg: "#000",
      glow: "var(--glow-lime)"
    },
    green: {
      bg: "var(--green-400)",
      fg: "#fff",
      glow: "var(--glow-green)"
    },
    purple: {
      bg: "var(--purple-500)",
      fg: "#fff",
      glow: "var(--glow-purple)"
    },
    dark: {
      bg: "var(--shell-900)",
      fg: "#fff",
      glow: "none"
    },
    slate: {
      bg: "var(--slate-100)",
      fg: "var(--slate-500)",
      glow: "none"
    },
    white: {
      bg: "#fff",
      fg: "var(--slate-500)",
      glow: "var(--shadow-sm)"
    }
  };
  const t = tones[tone] || tones.lime;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: size,
      height: size,
      flexShrink: 0,
      background: t.bg,
      color: t.fg,
      borderRadius: radius,
      boxShadow: glow ? t.glow : "none",
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { IconTile });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconTile.jsx", error: String((e && e.message) || e) }); }

// components/data/ProgressBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Fitness Sincera - ProgressBar
 * Slim rounded track with a coloured fill. Colour usually encodes
 * the metric: lime = energy/goal, purple = activity, green = hydration.
 */
function ProgressBar({
  value = 0,
  tone = "lime",
  height = 8,
  track = "var(--slate-100)",
  animate = true,
  style = {},
  ...rest
}) {
  const tones = {
    lime: "var(--lime-400)",
    purple: "var(--purple-500)",
    green: "var(--green-400)",
    slate: "var(--slate-400)"
  };
  const fill = tones[tone] || tones.lime;
  const pct = Math.max(0, Math.min(100, value));
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      height,
      width: "100%",
      background: track,
      borderRadius: "var(--radius-pill)",
      overflow: "hidden",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      width: pct + "%",
      background: fill,
      borderRadius: "var(--radius-pill)",
      transition: animate ? "width var(--dur-slow) var(--ease-out)" : "none"
    }
  }));
}
Object.assign(__ds_scope, { ProgressBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/ProgressBar.jsx", error: String((e && e.message) || e) }); }

// components/data/RingGauge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Fitness Sincera - RingGauge
 * The circular wellness gauge: a thick rounded stroke arc with a
 * big value in the middle. Purple by default (personal/wellness).
 */
function RingGauge({
  value = 72,
  size = 160,
  stroke = 12,
  tone = "purple",
  label = "",
  valueText = null,
  style = {},
  ...rest
}) {
  const tones = {
    purple: "var(--purple-500)",
    lime: "var(--lime-400)",
    green: "var(--green-400)"
  };
  const color = tones[tone] || tones.purple;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(100, value));
  const offset = c - c * pct / 100;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      position: "relative",
      width: size,
      height: size,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    style: {
      transform: "rotate(-90deg)"
    }
  }, /*#__PURE__*/React.createElement("circle", {
    cx: size / 2,
    cy: size / 2,
    r: r,
    fill: "none",
    stroke: "var(--slate-100)",
    strokeWidth: stroke
  }), /*#__PURE__*/React.createElement("circle", {
    cx: size / 2,
    cy: size / 2,
    r: r,
    fill: "none",
    stroke: color,
    strokeWidth: stroke,
    strokeLinecap: "round",
    strokeDasharray: c,
    strokeDashoffset: offset,
    style: {
      transition: "stroke-dashoffset var(--dur-slow) var(--ease-out)"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 900,
      fontSize: size * 0.27,
      color: "var(--slate-900)",
      lineHeight: 1
    }
  }, valueText ?? value), label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: ".1em",
      color: "var(--slate-400)",
      marginTop: 4
    }
  }, label)));
}
Object.assign(__ds_scope, { RingGauge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/RingGauge.jsx", error: String((e && e.message) || e) }); }

// components/data/StatCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Fitness Sincera - StatCard
 * The dashboard metric tile: a quiet label + chevron up top, a big
 * black number bottom-left, and an optional slot (avatar stack,
 * sparkline, badge) bottom-right. Lifts on hover.
 */
function StatCard({
  label = "",
  value = "",
  slot = null,
  onClick,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", _extends({
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      background: "var(--bg-card)",
      border: "1px solid var(--border-card)",
      borderRadius: "var(--radius-xl)",
      padding: "var(--space-6)",
      boxShadow: hover ? "var(--shadow-lg)" : "var(--shadow-sm)",
      cursor: onClick ? "pointer" : "default",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      minHeight: 132,
      gap: 16,
      transition: "box-shadow var(--dur-base)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 500,
      color: "var(--slate-500)"
    }
  }, label), /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "var(--slate-300)",
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "9 18 15 12 9 6"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "space-between",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 900,
      fontSize: 40,
      lineHeight: 1,
      color: "var(--slate-800)"
    }
  }, value), slot));
}
Object.assign(__ds_scope, { StatCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/StatCard.jsx", error: String((e && e.message) || e) }); }

// components/nav/Brand.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Fitness Sincera - Brand
 * The lime Zap tile + wordmark lock-up. `variant="wordmark"` shows
 * lowercase "flux"; `variant="full"` shows "Fitness Sincera".
 * Designed for the dark sidebar / auth screens.
 */
function Brand({
  variant = "wordmark",
  size = 32,
  onDark = true,
  style = {},
  ...rest
}) {
  const tile = Math.round(size * 1.25);
  const label = variant === "full" ? "Fitness Sincera" : "flux";
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 10,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      width: tile,
      height: tile,
      background: "var(--lime-400)",
      borderRadius: Math.round(tile * 0.3),
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "var(--glow-lime)"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: tile * 0.55,
    height: tile * 0.55,
    viewBox: "0 0 24 24",
    fill: "#000",
    stroke: "#000",
    strokeWidth: "1.5",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polygon", {
    points: "13 2 3 14 12 14 11 22 21 10 12 10 13 2"
  }))), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: size,
      fontWeight: variant === "full" ? 900 : 800,
      letterSpacing: "var(--tracking-tighter)",
      color: onDark ? "#fff" : "var(--slate-900)"
    }
  }, label));
}
Object.assign(__ds_scope, { Brand });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/nav/Brand.jsx", error: String((e && e.message) || e) }); }

// components/nav/NavItem.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Fitness Sincera - NavItem
 * A sidebar nav row for the dark shell. Active = filled tile (lime by
 * default, purple for the Treino/personal context). Idle rows are
 * muted slate and lighten on hover. Optional trailing count badge.
 */
function NavItem({
  icon = null,
  label = "",
  active = false,
  context = "lime",
  count = null,
  onClick,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const activeBg = context === "purple" ? "var(--purple-500)" : "var(--lime-400)";
  const activeFg = context === "purple" ? "#fff" : "#000";
  const activeShadow = context === "purple" ? "var(--glow-purple)" : "var(--shadow-lg)";
  const bg = active ? activeBg : hover ? "rgba(255,255,255,0.06)" : "transparent";
  const fg = active ? activeFg : hover ? "#fff" : "var(--slate-400)";
  return /*#__PURE__*/React.createElement("button", _extends({
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
      padding: "12px 16px",
      border: "none",
      borderRadius: "var(--radius-lg)",
      background: bg,
      color: fg,
      boxShadow: active ? activeShadow : "none",
      fontFamily: "var(--font-body)",
      fontWeight: 700,
      fontSize: 14,
      letterSpacing: "var(--tracking-tight)",
      transition: "background var(--dur-base), color var(--dur-base)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 12
    }
  }, icon, label), count != null && /*#__PURE__*/React.createElement("span", {
    style: {
      minWidth: 20,
      height: 20,
      padding: "0 6px",
      borderRadius: "var(--radius-pill)",
      background: active ? "rgba(0,0,0,0.15)" : "var(--lime-400)",
      color: active ? activeFg : "#000",
      fontSize: 10,
      fontWeight: 900,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, count));
}
Object.assign(__ds_scope, { NavItem });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/nav/NavItem.jsx", error: String((e && e.message) || e) }); }

// ui_kits/aluno/app-shell.jsx
try { (() => {
// Fitness Sincera - Aluno app shell (dark flux sidebar + light work panel)
const {
  useState
} = React;
const DS = window.FitnessSinceraDesignSystem_06b67f;
const {
  Brand,
  NavItem,
  Avatar
} = DS;
const L = window.LucideReact;
function AppShell({
  active,
  onNav,
  children,
  headerRight
}) {
  const nav = [{
    key: "dashboard",
    label: "Dashboard",
    icon: L.LayoutDashboard,
    count: 3
  }, {
    key: "nutricao",
    label: "Nutrição",
    icon: L.Apple
  }, {
    key: "treino",
    label: "Treino",
    icon: L.Dumbbell,
    context: "purple"
  }, {
    key: "agente",
    label: "Agente",
    icon: L.MessageSquare
  }, {
    key: "perfil",
    label: "Perfil",
    icon: L.User
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      background: "var(--shell-900)",
      display: "flex",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("aside", {
    className: "fs-sidebar",
    style: {
      width: 256,
      flexShrink: 0,
      background: "var(--shell-800)",
      display: "flex",
      flexDirection: "column",
      padding: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "fs-side-extra",
    style: {
      paddingLeft: 4,
      marginBottom: 36
    }
  }, /*#__PURE__*/React.createElement(Brand, {
    variant: "wordmark"
  })), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8,
      flex: 1
    }
  }, nav.map(n => /*#__PURE__*/React.createElement(NavItem, {
    key: n.key,
    icon: /*#__PURE__*/React.createElement(n.icon, {
      size: 20
    }),
    label: n.label,
    active: active === n.key,
    context: n.context,
    count: n.count,
    onClick: () => onNav(n.key)
  }))), /*#__PURE__*/React.createElement("div", {
    className: "fs-side-extra",
    style: {
      marginTop: "auto",
      background: "var(--lime-400)",
      borderRadius: "var(--radius-2xl)",
      padding: 20,
      position: "relative",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("h4", {
    style: {
      color: "#000",
      fontWeight: 900,
      fontSize: 17,
      margin: 0,
      lineHeight: 1.1
    }
  }, "Upgrade para Pro"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "rgba(0,0,0,.55)",
      fontSize: 10,
      fontWeight: 800,
      textTransform: "uppercase",
      letterSpacing: ".08em",
      margin: "4px 0 14px"
    }
  }, "Experi\xEAncia completa"), /*#__PURE__*/React.createElement("button", {
    style: {
      width: "100%",
      background: "#000",
      color: "#fff",
      padding: "11px 0",
      borderRadius: "var(--radius-md)",
      border: "none",
      fontSize: 11,
      fontWeight: 900,
      textTransform: "uppercase",
      letterSpacing: ".12em",
      cursor: "pointer"
    }
  }, "Upgrade Agora"), /*#__PURE__*/React.createElement(L.Rocket, {
    size: 80,
    style: {
      position: "absolute",
      right: -12,
      bottom: -12,
      color: "rgba(0,0,0,.06)",
      transform: "rotate(-12deg)"
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "fs-side-extra",
    style: {
      paddingTop: 22,
      marginTop: 22,
      borderTop: "1px solid rgba(255,255,255,.06)"
    }
  }, /*#__PURE__*/React.createElement("button", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      background: "none",
      border: "none",
      color: "var(--slate-500)",
      fontWeight: 700,
      fontSize: 14,
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(L.LogOut, {
    size: 20
  }), " Sair da Conta"))), /*#__PURE__*/React.createElement("main", {
    style: {
      flex: 1,
      overflow: "hidden",
      display: "flex"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      background: "var(--surface-app)",
      overflowY: "auto",
      padding: "32px 40px 64px"
    },
    className: "work-scroll fs-main-scroll"
  }, children)));
}
function WorkHeader({
  user
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 28,
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    src: user.avatar,
    initials: "LB"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 800,
      fontSize: 14,
      color: "var(--slate-900)"
    }
  }, user.name), /*#__PURE__*/React.createElement(L.ChevronDown, {
    size: 14,
    color: "var(--slate-500)"
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 10,
      color: "var(--slate-500)",
      fontWeight: 500,
      margin: 0
    }
  }, user.email))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "work-search",
    className: "sr-only"
  }, "Pesquisar"), /*#__PURE__*/React.createElement(L.Search, {
    size: 18,
    style: {
      position: "absolute",
      left: 12,
      top: "50%",
      transform: "translateY(-50%)",
      color: "var(--slate-400)"
    }
  }), /*#__PURE__*/React.createElement("input", {
    id: "work-search",
    placeholder: "Pesquisar...",
    style: {
      background: "#fff",
      borderRadius: "var(--radius-pill)",
      padding: "10px 16px 10px 38px",
      width: 240,
      border: "none",
      boxShadow: "var(--shadow-sm)",
      fontSize: 13
    }
  })), /*#__PURE__*/React.createElement("button", {
    "aria-label": "Notifica\xE7\xF5es (2 n\xE3o lidas)",
    style: {
      position: "relative",
      padding: 11,
      background: "#fff",
      borderRadius: "var(--radius-pill)",
      boxShadow: "var(--shadow-sm)",
      cursor: "pointer",
      border: "none"
    }
  }, /*#__PURE__*/React.createElement(L.Bell, {
    size: 18,
    color: "var(--slate-700)"
  }), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      top: 6,
      right: 6,
      width: 16,
      height: 16,
      background: "var(--lime-400)",
      border: "2px solid #fff",
      borderRadius: "50%",
      fontSize: 8,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: 900
    }
  }, "2"))));
}

// Canonical page header shared across every screen (eyebrow + uppercase
// display title + muted subtitle, with an optional right-side cluster).
function PageHeader({
  eyebrow,
  title,
  subtitle,
  right
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-end",
      marginBottom: 28,
      gap: 16,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("div", null, eyebrow && /*#__PURE__*/React.createElement("div", {
    className: "fs-eyebrow",
    style: {
      marginBottom: 10
    }
  }, eyebrow), /*#__PURE__*/React.createElement("h1", {
    className: "fs-display",
    style: {
      fontSize: 40,
      lineHeight: 1.04,
      color: "var(--slate-900)",
      margin: 0
    }
  }, title), subtitle && /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--slate-500)",
      fontSize: 14,
      fontWeight: 500,
      margin: "8px 0 0"
    }
  }, subtitle)), right && /*#__PURE__*/React.createElement("div", null, right));
}
window.AppShell = AppShell;
window.WorkHeader = WorkHeader;
window.PageHeader = PageHeader;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/aluno/app-shell.jsx", error: String((e && e.message) || e) }); }

// ui_kits/aluno/data.js
try { (() => {
// Fitness Sincera - Aluno (client) mock data
// Mirrors client/src/lib/mockData.ts + the meal-plan block shape.

window.ALUNO = window.ALUNO || {};
window.ALUNO.user = {
  name: "Lucas Bennett",
  email: "bennet02@gmail.com",
  avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop"
};

// Daily routine meals (the "drum-roll" scroll wheel feeds on this)
window.ALUNO.meals = [{
  id: "m1",
  time: "07:00",
  title: "Café da Manhã",
  type: "meal",
  calories: 320,
  macros: {
    p: 24,
    c: 28,
    g: 12
  },
  items: [{
    name: "3 Ovos Mexidos",
    qty: "3 un",
    kcal: 210
  }, {
    name: "Pão Integral",
    qty: "1 fatia",
    kcal: 80
  }, {
    name: "Café Preto s/ Açúcar",
    qty: "200ml",
    kcal: 5
  }],
  image: "https://images.unsplash.com/photo-1525351484163-7529414395d8?w=800&q=80",
  ai: ["Mingau de Aveia + Whey", "Crepioca de Frango", "Iogurte + Granola"]
}, {
  id: "m2",
  time: "10:00",
  title: "Lanche da Manhã",
  type: "snack",
  calories: 150,
  macros: {
    p: 5,
    c: 18,
    g: 7
  },
  items: [{
    name: "Maçã",
    qty: "1 un",
    kcal: 95
  }, {
    name: "Castanhas",
    qty: "15g",
    kcal: 55
  }],
  image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80",
  ai: ["Banana + Pasta de Amendoim", "Mix de Frutas Vermelhas"]
}, {
  id: "m3",
  time: "13:00",
  title: "Almoço",
  type: "meal",
  calories: 450,
  macros: {
    p: 42,
    c: 48,
    g: 9
  },
  items: [{
    name: "Peito de Frango",
    qty: "150g",
    kcal: 240
  }, {
    name: "Arroz Branco",
    qty: "100g",
    kcal: 130
  }, {
    name: "Salada à Vontade",
    qty: " - ",
    kcal: 80
  }],
  image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80",
  ai: ["Patinho Moído + Batata Inglesa", "Salmão + Quinoa", "Tilápia + Mandioca"]
}, {
  id: "m4",
  time: "16:00",
  title: "Pré-Treino",
  type: "snack",
  calories: 280,
  macros: {
    p: 8,
    c: 52,
    g: 4
  },
  items: [{
    name: "Banana",
    qty: "1 un",
    kcal: 105
  }, {
    name: "Doce de Leite",
    qty: "30g",
    kcal: 100
  }, {
    name: "Creatina",
    qty: "5g",
    kcal: 0
  }],
  image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=800&q=80",
  ai: ["Pão + Mel + Whey", "Tapioca com Banana"]
}, {
  id: "m5",
  time: "20:00",
  title: "Jantar",
  type: "meal",
  calories: 380,
  macros: {
    p: 38,
    c: 30,
    g: 8
  },
  items: [{
    name: "Tilápia",
    qty: "150g",
    kcal: 200
  }, {
    name: "Purê de Batata",
    qty: "100g",
    kcal: 130
  }, {
    name: "Legumes no Vapor",
    qty: " - ",
    kcal: 50
  }],
  image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&q=80",
  ai: ["Omelete de Claras + Salada", "Sopa de Legumes + Frango"]
}];
window.ALUNO.goals = {
  kcalTarget: 1580,
  kcalDone: 0,
  protein: {
    val: 117,
    max: 152
  },
  carbs: {
    val: 176,
    max: 220
  },
  fat: {
    val: 40,
    max: 55
  }
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/aluno/data.js", error: String((e && e.message) || e) }); }

// ui_kits/aluno/lucide-react-shim.js
try { (() => {
// lucide-react-shim.js
// The lucide-react UMD build does not populate a usable global in this runtime,
// so we rebuild a lucide-react-compatible API from the plain `lucide` UMD.
// The screens use window.LucideReact.<IconName> as React components
// (e.g. <LucideReact.Camera size={24} color="#000" strokeWidth={3} />).
(function () {
  var lucide = window.lucide;
  var React = window.React;
  if (!lucide || !React) {
    console.error("lucide-react-shim: `lucide` or `React` not loaded before this script.");
    window.LucideReact = window.LucideReact || {};
    return;
  }
  function toReactProps(attrs) {
    var p = {};
    for (var k in attrs) {
      var key = k.replace(/-([a-z])/g, function (m, c) {
        return c.toUpperCase();
      });
      p[key] = attrs[k];
    }
    return p;
  }
  var cache = {};
  function makeIcon(name, node) {
    if (cache[name]) return cache[name];
    var Comp = React.forwardRef(function (props, ref) {
      props = props || {};
      var size = props.size == null ? 24 : props.size;
      var color = props.color || "currentColor";
      var strokeWidth = props.strokeWidth == null ? 2 : props.strokeWidth;
      var rest = {};
      for (var k in props) {
        if (k === "size" || k === "color" || k === "strokeWidth" || k === "absoluteStrokeWidth") continue;
        rest[k] = props[k];
      }
      var children = node.map(function (child, i) {
        var a = toReactProps(child[1] || {});
        a.key = i;
        return React.createElement(child[0], a);
      });
      var svgProps = Object.assign({
        ref: ref,
        xmlns: "http://www.w3.org/2000/svg",
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: color,
        strokeWidth: strokeWidth,
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }, rest);
      return React.createElement("svg", svgProps, children);
    });
    Comp.displayName = name;
    cache[name] = Comp;
    return Comp;
  }
  var registry = lucide.icons || lucide;
  window.LucideReact = new Proxy({}, {
    get: function (obj, prop) {
      if (typeof prop !== "string") return obj[prop];
      if (prop === "__esModule") return true;
      var node = registry[prop] || lucide[prop];
      if (Array.isArray(node)) return makeIcon(prop, node);
      return undefined;
    },
    has: function () {
      return true;
    }
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/aluno/lucide-react-shim.js", error: String((e && e.message) || e) }); }

// ui_kits/aluno/screen-dashboard.jsx
try { (() => {
// Fitness Sincera - Aluno Dashboard ("Routine First" home)
const DS_d = window.FitnessSinceraDesignSystem_06b67f;
const {
  Card: DCard,
  Badge: DBadge,
  RingGauge: DRing,
  ProgressBar: DBar,
  Button: DBtn,
  IconTile: DTile
} = DS_d;
const Ld = window.LucideReact;
function NextActivityCard({
  meal
}) {
  return /*#__PURE__*/React.createElement(DCard, {
    radius: "var(--radius-3xl)",
    style: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      boxShadow: "var(--shadow-card)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 19,
      fontWeight: 700,
      color: "var(--slate-800)",
      margin: 0,
      textTransform: "none",
      letterSpacing: 0
    }
  }, "Pr\xF3xima Atividade"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      background: "var(--slate-100)",
      padding: 4,
      borderRadius: "var(--radius-md)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      padding: "6px 14px",
      borderRadius: "var(--radius-sm)",
      background: "#fff",
      boxShadow: "var(--shadow-xs)",
      fontSize: 12,
      fontWeight: 800,
      color: "var(--slate-900)"
    }
  }, "Refei\xE7\xE3o"), /*#__PURE__*/React.createElement("span", {
    style: {
      padding: "6px 14px",
      fontSize: 12,
      fontWeight: 800,
      color: "var(--slate-400)",
      display: "flex",
      alignItems: "center",
      gap: 4
    }
  }, "Treino ", /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: "50%",
      background: "var(--lime-400)"
    }
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      borderRadius: "var(--radius-2xl)",
      position: "relative",
      overflow: "hidden",
      minHeight: 300,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: meal.image,
    alt: meal.title,
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "linear-gradient(to top, rgba(0,0,0,.92), rgba(0,0,0,.35) 55%, transparent)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      padding: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 24,
      fontWeight: 900,
      color: "#fff",
      margin: 0,
      letterSpacing: "-.01em",
      textTransform: "none"
    }
  }, meal.title), /*#__PURE__*/React.createElement("span", {
    style: {
      background: "var(--lime-400)",
      padding: "5px 12px",
      borderRadius: "var(--radius-pill)",
      fontSize: 11,
      fontWeight: 900,
      color: "#000",
      fontFamily: "var(--font-mono)"
    }
  }, meal.calories, " kcal"))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      padding: 18,
      paddingTop: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8,
      marginBottom: 16
    }
  }, meal.items.map((it, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      background: "rgba(255,255,255,.08)",
      backdropFilter: "blur(6px)",
      padding: 9,
      borderRadius: "var(--radius-md)",
      border: "1px solid rgba(255,255,255,.08)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: "50%",
      background: "var(--lime-400)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: "#fff"
    }
  }, it.name), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: "auto",
      fontSize: 11,
      color: "rgba(255,255,255,.6)",
      fontFamily: "var(--font-mono)"
    }
  }, it.qty)))), /*#__PURE__*/React.createElement(DBtn, {
    variant: "primary",
    block: true,
    uppercase: true,
    icon: /*#__PURE__*/React.createElement(Ld.Check, {
      size: 16,
      strokeWidth: 3
    })
  }, "Check Refei\xE7\xE3o"))));
}
function GoalProgressCard({
  goals
}) {
  const pct = Math.round(goals.kcalDone / goals.kcalTarget * 100);
  return /*#__PURE__*/React.createElement(DCard, {
    radius: "var(--radius-3xl)",
    style: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      boxShadow: "var(--shadow-card)"
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 19,
      fontWeight: 700,
      color: "var(--slate-800)",
      margin: "0 0 4px",
      textTransform: "none",
      letterSpacing: 0
    }
  }, "Meta de Hoje"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 12,
      color: "var(--slate-400)",
      margin: "0 0 18px"
    }
  }, "Consumo cal\xF3rico di\xE1rio"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      margin: "8px 0 22px"
    }
  }, /*#__PURE__*/React.createElement(DRing, {
    value: pct,
    valueText: goals.kcalDone,
    label: "de 1580 kcal",
    tone: "lime",
    size: 170
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Macro, {
    label: "Prote\xEDna",
    val: goals.protein.val,
    max: goals.protein.max,
    tone: "purple"
  }), /*#__PURE__*/React.createElement(Macro, {
    label: "Carboidrato",
    val: goals.carbs.val,
    max: goals.carbs.max,
    tone: "lime"
  }), /*#__PURE__*/React.createElement(Macro, {
    label: "Gordura",
    val: goals.fat.val,
    max: goals.fat.max,
    tone: "green"
  })));
}
function Macro({
  label,
  val,
  max,
  tone
}) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      fontSize: 12,
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--slate-500)",
      fontWeight: 600
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--slate-800)",
      fontWeight: 800
    }
  }, val, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--slate-300)",
      fontWeight: 500
    }
  }, " / ", max, "g"))), /*#__PURE__*/React.createElement(DBar, {
    value: val / max * 100,
    tone: tone,
    height: 7
  }));
}
function MiniCard({
  icon,
  title,
  value,
  unit,
  foot,
  tone
}) {
  const Ic = icon;
  return /*#__PURE__*/React.createElement(DCard, {
    radius: "var(--radius-2xl)",
    pad: false,
    style: {
      padding: 22,
      height: "100%",
      boxShadow: "var(--shadow-card)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement(DTile, {
    tone: tone,
    size: 38,
    radius: "var(--radius-md)"
  }, /*#__PURE__*/React.createElement(Ic, {
    size: 18
  })), /*#__PURE__*/React.createElement(Ld.MoreHorizontal, {
    size: 18,
    color: "var(--slate-300)"
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 12,
      color: "var(--slate-400)",
      fontWeight: 600,
      margin: "0 0 4px"
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 30,
      fontWeight: 900,
      color: "var(--slate-900)",
      fontFamily: "var(--font-display)"
    }
  }, value), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: "var(--slate-400)",
      fontWeight: 700,
      marginLeft: 4,
      fontFamily: "var(--font-mono)"
    }
  }, unit)), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 11,
      color: "var(--slate-400)",
      margin: "8px 0 0"
    }
  }, foot));
}
function AlunoDashboard({
  user,
  meals,
  goals
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1240,
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement(WorkHeader, {
    user: user
  }), /*#__PURE__*/React.createElement(window.PageHeader, {
    eyebrow: "Painel do aluno \xB7 12 Julho 2024",
    title: "Vis\xE3o Geral de Sa\xFAde",
    subtitle: "Tome o controlo da sua sa\xFAde hoje.",
    right: /*#__PURE__*/React.createElement("button", {
      style: {
        background: "#fff",
        padding: "10px 18px",
        borderRadius: "var(--radius-lg)",
        border: "1px solid var(--slate-100)",
        boxShadow: "var(--shadow-sm)",
        fontSize: 13,
        fontWeight: 700,
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        cursor: "pointer"
      }
    }, "Hoje ", /*#__PURE__*/React.createElement(Ld.ChevronDown, {
      size: 14,
      color: "var(--slate-400)"
    }))
  }), /*#__PURE__*/React.createElement("div", {
    className: "fs-dash-grid",
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(12, 1fr)",
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "fs-dash-col",
    style: {
      gridColumn: "span 5"
    }
  }, /*#__PURE__*/React.createElement(NextActivityCard, {
    meal: meals[0]
  })), /*#__PURE__*/React.createElement("div", {
    className: "fs-dash-col",
    style: {
      gridColumn: "span 4"
    }
  }, /*#__PURE__*/React.createElement(GoalProgressCard, {
    goals: goals
  })), /*#__PURE__*/React.createElement("div", {
    className: "fs-dash-col",
    style: {
      gridColumn: "span 3",
      display: "flex",
      flexDirection: "column",
      gap: 18
    }
  }, /*#__PURE__*/React.createElement(MiniCard, {
    icon: Ld.Droplets,
    title: "Hidrata\xE7\xE3o",
    value: "1.8",
    unit: "L",
    foot: "Meta: 3L \xB7 60%",
    tone: "green"
  }), /*#__PURE__*/React.createElement(MiniCard, {
    icon: Ld.Flame,
    title: "Energia",
    value: "1,847",
    unit: "kcal",
    foot: "Hoje \xB7 +12% vs. ontem",
    tone: "lime"
  }))));
}
window.AlunoDashboard = AlunoDashboard;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/aluno/screen-dashboard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/aluno/screen-nutricao.jsx
try { (() => {
// Fitness Sincera - Nutrição screen with Apple-Watch-style meal scroll wheel
const {
  useState: useStateN,
  useRef: useRefN,
  useEffect: useEffectN,
  useCallback: useCbN
} = React;
const DSn = window.FitnessSinceraDesignSystem_06b67f;
const {
  Button: NBtn,
  Badge: NBadge,
  Card: NCard,
  ProgressBar: NBar
} = DSn;
const Ln = window.LucideReact;
function mealIcon(title) {
  const t = title.toLowerCase();
  if (t.includes("café") || t.includes("manhã")) return Ln.Coffee;
  if (t.includes("almoço")) return Ln.Utensils;
  if (t.includes("jantar") || t.includes("ceia")) return Ln.Moon;
  if (t.includes("pré") || t.includes("lanche")) return Ln.Apple;
  return Ln.Sun;
}

// ── The drum-roll scroll wheel ────────────────────────────────────────────────
function MealScrollWheel({
  meals,
  completed,
  onToggle
}) {
  const scrollRef = useRefN(null);
  const itemRefs = useRefN([]);
  const [activeIndex, setActiveIndex] = useStateN(0);
  const handleScroll = useCbN(() => {
    const el = scrollRef.current;
    if (!el) return;
    const top = el.scrollTop;
    let closest = 0,
      min = Infinity;
    itemRefs.current.forEach((ref, i) => {
      if (!ref) return;
      const d = Math.abs(ref.offsetTop - top);
      if (d < min) {
        min = d;
        closest = i;
      }
    });
    setActiveIndex(closest);
  }, []);
  useEffectN(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll, {
      passive: true
    });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);
  const fade = dir => ({
    position: "absolute",
    insetInline: 0,
    [dir]: 0,
    zIndex: 10,
    pointerEvents: "none",
    height: dir === "top" ? 18 : 80,
    background: `linear-gradient(to ${dir === "top" ? "bottom" : "top"}, rgba(245,245,245,0.72) 0%, rgba(255,255,255,0) 100%)`
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      overflow: "hidden",
      borderRadius: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: fade("top")
  }), /*#__PURE__*/React.createElement("div", {
    style: fade("bottom")
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      right: 2,
      top: "50%",
      transform: "translateY(-50%)",
      zIndex: 20,
      display: "flex",
      flexDirection: "column",
      gap: 6,
      pointerEvents: "none"
    }
  }, meals.map((_, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      width: 3,
      borderRadius: 999,
      transition: "all .3s",
      height: i === activeIndex ? 16 : 3,
      background: i === activeIndex ? "var(--lime-400)" : "var(--slate-300)"
    }
  }))), /*#__PURE__*/React.createElement("div", {
    ref: scrollRef,
    onScroll: handleScroll,
    className: "wheel-scroll",
    style: {
      height: "min(520px, 64vh)",
      overflowY: "scroll",
      scrollSnapType: "y mandatory",
      paddingRight: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 4
    }
  }), meals.map((meal, index) => {
    const dist = Math.abs(index - activeIndex);
    return /*#__PURE__*/React.createElement("div", {
      key: meal.id,
      ref: el => itemRefs.current[index] = el,
      style: {
        scrollSnapAlign: "start"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        opacity: dist === 0 ? 1 : dist === 1 ? 0.55 : 0.22,
        transform: `scale(${dist === 0 ? 1 : dist === 1 ? 0.97 : 0.93})`,
        transformOrigin: "top center",
        transition: "opacity .3s ease, transform .3s ease",
        paddingBottom: 18
      }
    }, /*#__PURE__*/React.createElement(MealBlock, {
      meal: meal,
      isCompleted: completed.has(meal.id),
      onToggle: () => onToggle(meal.id),
      defaultOpen: index === activeIndex,
      isActive: dist === 0
    })));
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 360
    }
  })));
}

// ── A single editable meal block with AI suggestions ──────────────────────────
function MealBlock({
  meal,
  isCompleted,
  onToggle,
  defaultOpen,
  isActive
}) {
  const [open, setOpen] = useStateN(defaultOpen);
  const [showAI, setShowAI] = useStateN(false);
  const [loadingAI, setLoadingAI] = useStateN(false);
  const [picked, setPicked] = useStateN(null);
  const Icon = mealIcon(meal.title);
  useEffectN(() => {
    setOpen(defaultOpen);
  }, [defaultOpen]);
  const askAI = () => {
    setShowAI(true);
    setLoadingAI(true);
    setTimeout(() => setLoadingAI(false), 900);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: isCompleted ? "var(--surface-tint-lime)" : "#fff",
      borderRadius: "var(--radius-xl)",
      boxShadow: isActive ? "var(--shadow-lg)" : "var(--shadow-sm)",
      overflow: "hidden",
      border: `1.5px solid ${isCompleted ? "rgba(212,245,76,.5)" : isActive ? "var(--lime-400)" : "var(--slate-100)"}`,
      transition: "box-shadow .3s ease, border-color .3s ease"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setOpen(v => !v),
    style: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      gap: 14,
      padding: "16px 20px",
      background: "none",
      border: "none",
      textAlign: "left",
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 44,
      height: 44,
      borderRadius: "var(--radius-lg)",
      flexShrink: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: isCompleted ? "var(--lime-400)" : "var(--slate-100)"
    }
  }, isCompleted ? /*#__PURE__*/React.createElement(Ln.Check, {
    size: 18,
    color: "#000",
    strokeWidth: 3
  }) : /*#__PURE__*/React.createElement(Icon, {
    size: 18,
    color: "var(--slate-500)"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginBottom: 3
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "fs-mono",
    style: {
      fontSize: 10,
      fontWeight: 900,
      color: "var(--slate-400)",
      textTransform: "uppercase",
      letterSpacing: ".12em"
    }
  }, meal.time), meal.type === "snack" && /*#__PURE__*/React.createElement(NBadge, {
    tone: "neutral"
  }, "Lanche"), isCompleted && /*#__PURE__*/React.createElement(NBadge, {
    tone: "green"
  }, "Conclu\xEDdo")), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontSize: 16,
      fontWeight: 700,
      lineHeight: 1.2,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      color: isCompleted ? "var(--slate-400)" : "var(--slate-900)",
      textDecoration: isCompleted ? "line-through" : "none"
    }
  }, meal.title)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      lineHeight: 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 17,
      fontWeight: 800,
      color: "var(--slate-900)",
      fontFamily: "var(--font-display)"
    }
  }, meal.calories), /*#__PURE__*/React.createElement("span", {
    className: "fs-mono",
    style: {
      fontSize: 9,
      fontWeight: 700,
      color: "var(--slate-400)",
      letterSpacing: ".08em",
      marginTop: 2
    }
  }, "KCAL")), open ? /*#__PURE__*/React.createElement(Ln.ChevronUp, {
    size: 16,
    color: "var(--slate-400)"
  }) : /*#__PURE__*/React.createElement(Ln.ChevronDown, {
    size: 16,
    color: "var(--slate-400)"
  }))), open && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 20px 20px",
      borderTop: "1px solid var(--slate-100)"
    }
  }, /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: "none",
      margin: "16px 0 0",
      padding: 0
    }
  }, meal.items.map((it, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "10px 0",
      borderBottom: i < meal.items.length - 1 ? "1px solid var(--slate-50)" : "none",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: "50%",
      flexShrink: 0,
      background: isCompleted ? "var(--slate-200)" : "var(--lime-400)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 500,
      color: isCompleted ? "var(--slate-400)" : "var(--slate-800)",
      textDecoration: isCompleted ? "line-through" : "none"
    }
  }, it.name)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: "var(--slate-400)",
      fontWeight: 500
    }
  }, it.qty), /*#__PURE__*/React.createElement("span", {
    className: "fs-mono",
    style: {
      fontSize: 12,
      fontWeight: 800,
      color: "var(--slate-600)",
      width: 56,
      textAlign: "right"
    }
  }, it.kcal, " kcal"))))), showAI && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14,
      background: "var(--surface-tint-lime)",
      border: "1px solid rgba(212,245,76,.5)",
      borderRadius: "var(--radius-lg)",
      padding: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement(Ln.Sparkles, {
    size: 15,
    color: "var(--lime-ink)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontWeight: 900,
      color: "var(--lime-ink)",
      textTransform: "uppercase",
      letterSpacing: ".06em"
    }
  }, "Sugest\xF5es da IA"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      color: "var(--slate-400)",
      marginLeft: "auto"
    }
  }, "equivalentes \xE0 sua dieta")), loadingAI ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      color: "var(--slate-400)",
      fontSize: 13,
      padding: "8px 2px"
    }
  }, /*#__PURE__*/React.createElement(Ln.Loader2, {
    size: 15,
    className: "spin"
  }), " Analisando os seus macros") : /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, meal.ai.map((opt, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    onClick: () => setPicked(opt),
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "11px 14px",
      borderRadius: "var(--radius-md)",
      cursor: "pointer",
      textAlign: "left",
      background: picked === opt ? "var(--lime-400)" : "#fff",
      border: `1px solid ${picked === opt ? "var(--lime-500)" : "var(--slate-100)"}`,
      transition: "all .2s"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: picked === opt ? "#000" : "var(--slate-700)"
    }
  }, opt), picked === opt ? /*#__PURE__*/React.createElement(Ln.Check, {
    size: 15,
    color: "#000",
    strokeWidth: 3
  }) : /*#__PURE__*/React.createElement(Ln.ArrowRight, {
    size: 14,
    color: "var(--slate-300)"
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 18,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      paddingTop: 16,
      borderTop: "1px solid var(--slate-50)",
      gap: 12,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(NBadge, {
    tone: "protein"
  }, "P ", meal.macros.p, "g"), /*#__PURE__*/React.createElement(NBadge, {
    tone: "carbs"
  }, "C ", meal.macros.c, "g"), /*#__PURE__*/React.createElement(NBadge, {
    tone: "fat"
  }, "G ", meal.macros.g, "g")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, !isCompleted && /*#__PURE__*/React.createElement(NBtn, {
    variant: showAI ? "purple" : "outline",
    size: "sm",
    icon: /*#__PURE__*/React.createElement(Ln.Sparkles, {
      size: 13
    }),
    onClick: askAI
  }, "Sugerir com IA"), /*#__PURE__*/React.createElement(NBtn, {
    variant: isCompleted ? "outline" : "primary",
    size: "sm",
    icon: isCompleted ? null : /*#__PURE__*/React.createElement(Ln.Check, {
      size: 13,
      strokeWidth: 3
    }),
    onClick: onToggle
  }, isCompleted ? "Desmarcar" : "Confirmar")))));
}
function NutricaoScreen({
  user,
  meals
}) {
  const [completed, setCompleted] = useStateN(new Set());
  const toggle = id => setCompleted(prev => {
    const next = new Set(prev);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  });
  const done = meals.filter(m => completed.has(m.id)).length;
  const pct = Math.round(done / meals.length * 100);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(WorkHeader, {
    user: user
  }), /*#__PURE__*/React.createElement(window.PageHeader, {
    eyebrow: "Plano alimentar",
    title: "Nutri\xE7\xE3o",
    subtitle: "Role para ver as pr\xF3ximas refei\xE7\xF5es do seu dia.",
    right: /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        background: "#fff",
        padding: "10px 16px",
        borderRadius: 16,
        boxShadow: "var(--shadow-sm)",
        border: "1px solid var(--slate-100)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 8,
        height: 8,
        borderRadius: "50%",
        background: "var(--green-400)"
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        fontWeight: 800,
        color: "var(--slate-700)"
      }
    }, "Plano Ativo"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10,
        color: "var(--slate-400)",
        fontWeight: 500
      }
    }, "\xB7 Dra. Sofia Almeida"))
  }), /*#__PURE__*/React.createElement(NCard, {
    radius: "var(--radius-xl)",
    pad: false,
    style: {
      padding: 20,
      marginBottom: 20,
      boxShadow: "var(--shadow-sm)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 800,
      color: "var(--slate-700)"
    }
  }, "Progresso do dia"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontWeight: 900,
      color: "var(--slate-900)",
      fontFamily: "var(--font-mono)"
    }
  }, done, "/", meals.length, " refei\xE7\xF5es")), /*#__PURE__*/React.createElement(NBar, {
    value: pct,
    tone: "lime"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 14,
      paddingInline: 4
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 18,
      fontWeight: 800,
      color: "var(--slate-800)",
      margin: 0
    }
  }, "Plano Alimentar \xB7 Hoje"), /*#__PURE__*/React.createElement("span", {
    className: "fs-eyebrow"
  }, "deslize para navegar")), /*#__PURE__*/React.createElement(MealScrollWheel, {
    meals: meals,
    completed: completed,
    onToggle: toggle
  }));
}
window.NutricaoScreen = NutricaoScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/aluno/screen-nutricao.jsx", error: String((e && e.message) || e) }); }

// ui_kits/nutricionista/data.js
try { (() => {
// Fitness Sincera - Nutricionista mock data
window.NUTRI = window.NUTRI || {};
window.NUTRI.pro = {
  name: "Dra. Sofia Almeida",
  role: "Nutricionista",
  crn: "CRN-3 12345"
};
window.NUTRI.stats = {
  total: 24,
  active: 18,
  atRisk: 3,
  compliance: 74
};
window.NUTRI.alerts = [{
  id: "1",
  initials: "CS",
  dark: true,
  type: "risk",
  title: "Meta calórica não atingida",
  message: "Cátia Silva está 35% abaixo da meta calórica diária há 3 dias.",
  time: "há 1 dia"
}, {
  id: "2",
  initials: "AN",
  dark: false,
  type: "ok",
  title: "Plano alimentar atualizado",
  message: "Adriana Nobre recebeu o novo plano de emagrecimento - Fase 2.",
  time: "há 2 dias"
}, {
  id: "3",
  initials: "RG",
  dark: false,
  type: "risk",
  title: "Hidratação baixa",
  message: "Rita Gomes registou menos de 1L de água por 4 dias consecutivos.",
  time: "há 3 dias"
}];
window.NUTRI.clients = [{
  id: "c1",
  name: "Cátia Silva",
  goal: "Emagrecimento",
  status: "risk",
  compliance: 52,
  initials: "CS",
  dark: true
}, {
  id: "c2",
  name: "Adriana Nobre",
  goal: "Hipertrofia",
  status: "active",
  compliance: 91,
  initials: "AN"
}, {
  id: "c3",
  name: "Rita Gomes",
  goal: "Manutenção",
  status: "risk",
  compliance: 61,
  initials: "RG"
}, {
  id: "c4",
  name: "João Pereira",
  goal: "Performance",
  status: "active",
  compliance: 88,
  initials: "JP"
}, {
  id: "c5",
  name: "Marta Dias",
  goal: "Emagrecimento",
  status: "paused",
  compliance: 40,
  initials: "MD"
}];

// The Notion-like meal plan being edited (for Cátia Silva)
window.NUTRI.plan = {
  name: "Plano de Emagrecimento - Fase 2",
  client: "Cátia Silva",
  blocks: [{
    id: "b1",
    time: "07:30",
    title: "Café da Manhã",
    icon: "Coffee",
    items: [{
      id: "i1",
      name: "Ovos mexidos",
      qty: "3 un",
      kcal: 210,
      p: 18,
      c: 2,
      g: 14
    }, {
      id: "i2",
      name: "Pão integral",
      qty: "1 fatia",
      kcal: 80,
      p: 4,
      c: 14,
      g: 1
    }, {
      id: "i3",
      name: "Café preto",
      qty: "200ml",
      kcal: 5,
      p: 0,
      c: 1,
      g: 0
    }]
  }, {
    id: "b2",
    time: "10:30",
    title: "Lanche da Manhã",
    icon: "Apple",
    items: [{
      id: "i4",
      name: "Iogurte natural",
      qty: "170g",
      kcal: 100,
      p: 10,
      c: 8,
      g: 4
    }, {
      id: "i5",
      name: "Morangos",
      qty: "100g",
      kcal: 32,
      p: 1,
      c: 7,
      g: 0
    }]
  }, {
    id: "b3",
    time: "13:00",
    title: "Almoço",
    icon: "Utensils",
    items: [{
      id: "i6",
      name: "Peito de frango grelhado",
      qty: "150g",
      kcal: 240,
      p: 45,
      c: 0,
      g: 5
    }, {
      id: "i7",
      name: "Arroz integral",
      qty: "80g",
      kcal: 110,
      p: 3,
      c: 23,
      g: 1
    }, {
      id: "i8",
      name: "Brócolos no vapor",
      qty: "120g",
      kcal: 40,
      p: 3,
      c: 7,
      g: 0
    }]
  }, {
    id: "b4",
    time: "16:00",
    title: "Pré-Treino",
    icon: "Zap",
    items: [{
      id: "i9",
      name: "Banana",
      qty: "1 un",
      kcal: 105,
      p: 1,
      c: 27,
      g: 0
    }, {
      id: "i10",
      name: "Whey protein",
      qty: "30g",
      kcal: 120,
      p: 24,
      c: 3,
      g: 2
    }]
  }]
};

// A pending swap request from the student (drives the "agent edit" demo)
window.NUTRI.studentRequest = {
  client: "Cátia Silva",
  blockId: "b3",
  reason: "Não gosto do alimento",
  note: "Prefiro não comer brócolos, posso trocar por outro vegetal?",
  suggestion: {
    id: "i8",
    name: "Abobrinha grelhada",
    qty: "120g",
    kcal: 38,
    p: 3,
    c: 6,
    g: 0
  }
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/nutricionista/data.js", error: String((e && e.message) || e) }); }

// ui_kits/nutricionista/lucide-react-shim.js
try { (() => {
// lucide-react-shim.js
// The lucide-react UMD build does not populate a usable global in this runtime,
// so we rebuild a lucide-react-compatible API from the plain `lucide` UMD.
// The screens use window.LucideReact.<IconName> as React components
// (e.g. <LucideReact.Camera size={24} color="#000" strokeWidth={3} />).
(function () {
  var lucide = window.lucide;
  var React = window.React;
  if (!lucide || !React) {
    console.error("lucide-react-shim: `lucide` or `React` not loaded before this script.");
    window.LucideReact = window.LucideReact || {};
    return;
  }
  function toReactProps(attrs) {
    var p = {};
    for (var k in attrs) {
      var key = k.replace(/-([a-z])/g, function (m, c) {
        return c.toUpperCase();
      });
      p[key] = attrs[k];
    }
    return p;
  }
  var cache = {};
  function makeIcon(name, node) {
    if (cache[name]) return cache[name];
    var Comp = React.forwardRef(function (props, ref) {
      props = props || {};
      var size = props.size == null ? 24 : props.size;
      var color = props.color || "currentColor";
      var strokeWidth = props.strokeWidth == null ? 2 : props.strokeWidth;
      var rest = {};
      for (var k in props) {
        if (k === "size" || k === "color" || k === "strokeWidth" || k === "absoluteStrokeWidth") continue;
        rest[k] = props[k];
      }
      var children = node.map(function (child, i) {
        var a = toReactProps(child[1] || {});
        a.key = i;
        return React.createElement(child[0], a);
      });
      var svgProps = Object.assign({
        ref: ref,
        xmlns: "http://www.w3.org/2000/svg",
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: color,
        strokeWidth: strokeWidth,
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }, rest);
      return React.createElement("svg", svgProps, children);
    });
    Comp.displayName = name;
    cache[name] = Comp;
    return Comp;
  }
  var registry = lucide.icons || lucide;
  window.LucideReact = new Proxy({}, {
    get: function (obj, prop) {
      if (typeof prop !== "string") return obj[prop];
      if (prop === "__esModule") return true;
      var node = registry[prop] || lucide[prop];
      if (Array.isArray(node)) return makeIcon(prop, node);
      return undefined;
    },
    has: function () {
      return true;
    }
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/nutricionista/lucide-react-shim.js", error: String((e && e.message) || e) }); }

// ui_kits/nutricionista/nutri-shell.jsx
try { (() => {
// Fitness Sincera - Nutricionista shell (dark sidebar, emerald accent, light work area)
const DSp = window.FitnessSinceraDesignSystem_06b67f;
const {
  Brand: PBrand,
  NavItem: PNav,
  Avatar: PAvatar,
  Badge: PBadge
} = DSp;
const Lp = window.LucideReact;
function NutriShell({
  active,
  onNav,
  children
}) {
  const nav = [{
    key: "dashboard",
    label: "Dashboard",
    icon: Lp.LayoutDashboard
  }, {
    key: "clientes",
    label: "Clientes",
    icon: Lp.Users,
    count: 3
  }, {
    key: "planos",
    label: "Planos",
    icon: Lp.ClipboardList
  }, {
    key: "alimentos",
    label: "Alimentos",
    icon: Lp.Apple
  }, {
    key: "agente",
    label: "Agente IA",
    icon: Lp.Sparkles
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      background: "var(--shell-900)",
      display: "flex",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("aside", {
    className: "fs-sidebar",
    style: {
      width: 256,
      flexShrink: 0,
      background: "var(--shell-800)",
      display: "flex",
      flexDirection: "column",
      padding: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "fs-side-extra",
    style: {
      paddingLeft: 4,
      marginBottom: 36
    }
  }, /*#__PURE__*/React.createElement(PBrand, {
    variant: "wordmark"
  })), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8,
      flex: 1
    }
  }, nav.map(n => /*#__PURE__*/React.createElement(PNav, {
    key: n.key,
    icon: /*#__PURE__*/React.createElement(n.icon, {
      size: 20
    }),
    label: n.label,
    active: active === n.key,
    count: n.count,
    onClick: () => onNav(n.key)
  }))), /*#__PURE__*/React.createElement("div", {
    className: "fs-side-extra",
    style: {
      marginTop: "auto",
      display: "flex",
      alignItems: "center",
      gap: 12,
      background: "rgba(255,255,255,.04)",
      borderRadius: "var(--radius-lg)",
      padding: 12
    }
  }, /*#__PURE__*/React.createElement(PAvatar, {
    initials: "SA",
    tone: "green"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      color: "#fff",
      fontSize: 13,
      fontWeight: 800,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, "Dra. Sofia"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      color: "var(--slate-500)",
      fontSize: 10,
      fontWeight: 600
    }
  }, "Nutricionista")))), /*#__PURE__*/React.createElement("main", {
    style: {
      flex: 1,
      padding: 16,
      overflow: "hidden",
      display: "flex"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "work-scroll fs-main-scroll",
    style: {
      flex: 1,
      background: "var(--surface-app-cool)",
      borderRadius: "var(--radius-3xl)",
      overflowY: "auto"
    }
  }, children)));
}

// Canonical page header shared across every screen (eyebrow + uppercase
// display title + muted subtitle, with an optional right-side cluster).
function PageHeader({
  eyebrow,
  title,
  subtitle,
  right
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-end",
      marginBottom: 28,
      gap: 16,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("div", null, eyebrow && /*#__PURE__*/React.createElement("div", {
    className: "fs-eyebrow",
    style: {
      marginBottom: 10
    }
  }, eyebrow), /*#__PURE__*/React.createElement("h1", {
    className: "fs-display",
    style: {
      fontSize: 40,
      lineHeight: 1.04,
      color: "var(--slate-900)",
      margin: 0
    }
  }, title), subtitle && /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--slate-500)",
      fontSize: 14,
      fontWeight: 500,
      margin: "8px 0 0"
    }
  }, subtitle)), right && /*#__PURE__*/React.createElement("div", null, right));
}
window.NutriShell = NutriShell;
window.PageHeader = PageHeader;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/nutricionista/nutri-shell.jsx", error: String((e && e.message) || e) }); }

// ui_kits/nutricionista/plano-editor.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// Fitness Sincera - Notion-style Meal Plan Editor (editable by nutritionist OR agent)
const DSe = window.FitnessSinceraDesignSystem_06b67f;
const {
  Badge: EBadge,
  Button: EBtn,
  IconTile: ETile,
  Card: ECard
} = DSe;
const Le = window.LucideReact;
const {
  useState: useE,
  useRef: useRefE
} = React;
const uid = () => Math.random().toString(36).slice(2, 9);
const iconFor = name => Le[name] || Le.Sun;
const sumMacros = items => items.reduce((a, it) => ({
  kcal: a.kcal + (+it.kcal || 0),
  p: a.p + (+it.p || 0),
  c: a.c + (+it.c || 0),
  g: a.g + (+it.g || 0)
}), {
  kcal: 0,
  p: 0,
  c: 0,
  g: 0
});

// ── Editable item row ─────────────────────────────────────────────────────────
function ItemRow({
  item,
  onChange,
  onRemove,
  flash
}) {
  const field = (k, raw) => onChange({
    ...item,
    [k]: k === "name" || k === "qty" ? raw : parseFloat(raw) || 0
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "item-row",
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: "7px 12px",
      borderRadius: 10,
      transition: "background .3s",
      background: flash ? "rgba(212,245,76,.35)" : "transparent"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: "50%",
      background: "var(--slate-300)",
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("input", {
    value: item.name,
    onChange: e => field("name", e.target.value),
    placeholder: "Alimento",
    "aria-label": "Nome do alimento",
    style: {
      flex: 1,
      minWidth: 0,
      border: "none",
      background: "transparent",
      fontSize: 14,
      fontWeight: 500,
      color: "var(--slate-700)"
    }
  }), /*#__PURE__*/React.createElement("input", {
    value: item.qty,
    onChange: e => field("qty", e.target.value),
    placeholder: "qtd",
    "aria-label": "Quantidade",
    style: {
      width: 64,
      border: "none",
      background: "transparent",
      fontSize: 12,
      color: "var(--slate-400)",
      textAlign: "right"
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "item-macros",
    style: {
      display: "flex",
      gap: 4
    }
  }, [["kcal", "kcal", "kcal"], ["p", "P", "Prote\u00edna"], ["c", "C", "Carboidrato"], ["g", "G", "Gordura"]].map(([k, short, full]) => /*#__PURE__*/React.createElement("span", {
    key: k,
    style: {
      display: "flex",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      fontSize: 9,
      color: "var(--slate-400)",
      marginRight: 2
    }
  }, short), /*#__PURE__*/React.createElement("input", {
    value: item[k],
    onChange: e => field(k, e.target.value),
    type: "number",
    "aria-label": full,
    style: {
      width: 38,
      fontSize: 10,
      color: "var(--slate-500)",
      background: "var(--slate-100)",
      borderRadius: 5,
      border: "none",
      padding: "3px 4px",
      textAlign: "center"
    }
  })))), /*#__PURE__*/React.createElement("button", {
    className: "item-del",
    onClick: onRemove,
    "aria-label": "Remover alimento",
    style: {
      background: "none",
      border: "none",
      color: "var(--slate-400)",
      cursor: "pointer",
      padding: 10,
      margin: -10,
      display: "flex",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(Le.Trash2, {
    size: 14
  })));
}

// ── Sortable block card ───────────────────────────────────────────────────────
function BlockCard({
  block,
  onChange,
  onRemove,
  dragHandlers,
  dragging,
  flashItem,
  onMoveUp,
  onMoveDown,
  canMoveUp,
  canMoveDown
}) {
  const [collapsed, setCollapsed] = useE(false);
  const totals = sumMacros(block.items);
  const Icon = iconFor(block.icon);
  const addItem = () => onChange({
    ...block,
    items: [...block.items, {
      id: uid(),
      name: "",
      qty: "",
      kcal: 0,
      p: 0,
      c: 0,
      g: 0
    }]
  });
  const updItem = (id, u) => onChange({
    ...block,
    items: block.items.map(i => i.id === id ? u : i)
  });
  const rmItem = id => onChange({
    ...block,
    items: block.items.filter(i => i.id !== id)
  });
  return /*#__PURE__*/React.createElement("div", _extends({
    draggable: true
  }, dragHandlers, {
    style: {
      background: "#fff",
      borderRadius: "var(--radius-lg)",
      border: "1px solid var(--slate-100)",
      boxShadow: "var(--shadow-sm)",
      overflow: "hidden",
      marginBottom: 12,
      opacity: dragging ? 0.4 : 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "12px 16px",
      borderBottom: collapsed ? "none" : "1px solid var(--slate-50)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "drag-handle",
    style: {
      color: "var(--slate-300)",
      cursor: "grab",
      display: "none"
    }
  }, /*#__PURE__*/React.createElement(Le.GripVertical, {
    size: 16
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onMoveUp,
    disabled: !canMoveUp,
    "aria-label": "Mover refei\xE7\xE3o para cima",
    style: {
      background: "none",
      border: "none",
      padding: 4,
      cursor: canMoveUp ? "pointer" : "default",
      color: canMoveUp ? "var(--slate-500)" : "var(--slate-200)",
      display: "flex"
    }
  }, /*#__PURE__*/React.createElement(Le.ChevronUp, {
    size: 14
  })), /*#__PURE__*/React.createElement("button", {
    onClick: onMoveDown,
    disabled: !canMoveDown,
    "aria-label": "Mover refei\xE7\xE3o para baixo",
    style: {
      background: "none",
      border: "none",
      padding: 4,
      cursor: canMoveDown ? "pointer" : "default",
      color: canMoveDown ? "var(--slate-500)" : "var(--slate-200)",
      display: "flex"
    }
  }, /*#__PURE__*/React.createElement(Le.ChevronDown, {
    size: 14
  }))), /*#__PURE__*/React.createElement(ETile, {
    tone: "slate",
    size: 32,
    radius: "10px"
  }, /*#__PURE__*/React.createElement(Icon, {
    size: 16
  })), /*#__PURE__*/React.createElement("input", {
    value: block.title,
    onChange: e => onChange({
      ...block,
      title: e.target.value
    }),
    "aria-label": "Nome da refei\xE7\xE3o",
    style: {
      flex: 1,
      minWidth: 0,
      border: "none",
      background: "transparent",
      fontSize: 14,
      fontWeight: 800,
      color: "var(--slate-800)"
    }
  }), /*#__PURE__*/React.createElement("input", {
    value: block.time,
    onChange: e => onChange({
      ...block,
      time: e.target.value
    }),
    "aria-label": "Hor\xE1rio da refei\xE7\xE3o",
    className: "fs-mono",
    style: {
      width: 56,
      border: "none",
      background: "transparent",
      fontSize: 12,
      color: "var(--slate-400)",
      textAlign: "right"
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => setCollapsed(c => !c),
    "aria-label": collapsed ? "Expandir refeição" : "Recolher refeição",
    style: {
      background: "none",
      border: "none",
      color: "var(--slate-500)",
      cursor: "pointer",
      padding: 10,
      margin: -10
    }
  }, collapsed ? /*#__PURE__*/React.createElement(Le.ChevronDown, {
    size: 16
  }) : /*#__PURE__*/React.createElement(Le.ChevronUp, {
    size: 16
  })), /*#__PURE__*/React.createElement("button", {
    onClick: onRemove,
    "aria-label": "Remover refei\xE7\xE3o",
    style: {
      background: "none",
      border: "none",
      color: "var(--slate-400)",
      cursor: "pointer",
      padding: 10,
      margin: -10
    }
  }, /*#__PURE__*/React.createElement(Le.Trash2, {
    size: 16
  }))), !collapsed && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "6px 4px"
    }
  }, block.items.map(it => /*#__PURE__*/React.createElement(ItemRow, {
    key: it.id,
    item: it,
    onChange: u => updItem(it.id, u),
    onRemove: () => rmItem(it.id),
    flash: flashItem === it.id
  })), /*#__PURE__*/React.createElement("button", {
    onClick: addItem,
    style: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: "8px 12px",
      background: "none",
      border: "none",
      color: "var(--slate-400)",
      fontSize: 12,
      fontWeight: 600,
      cursor: "pointer",
      borderRadius: 8
    }
  }, /*#__PURE__*/React.createElement(Le.Plus, {
    size: 14
  }), " Adicionar alimento")), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "1px solid var(--slate-50)",
      padding: "10px 16px",
      display: "flex",
      alignItems: "center",
      gap: 8,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "fs-eyebrow",
    style: {
      marginRight: 4
    }
  }, "Subtotal"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      fontWeight: 900,
      color: "var(--slate-600)"
    }
  }, Math.round(totals.kcal), " kcal"), /*#__PURE__*/React.createElement(EBadge, {
    tone: "protein"
  }, "P ", Math.round(totals.p), "g"), /*#__PURE__*/React.createElement(EBadge, {
    tone: "carbs"
  }, "C ", Math.round(totals.c), "g"), /*#__PURE__*/React.createElement(EBadge, {
    tone: "fat"
  }, "G ", Math.round(totals.g), "g"))));
}

// ── Main editor ───────────────────────────────────────────────────────────────
function PlanoEditor({
  plan: initial,
  request,
  onBack
}) {
  const [plan, setPlan] = useE(initial);
  const [dragIdx, setDragIdx] = useE(null);
  const [reqOpen, setReqOpen] = useE(true);
  const [applying, setApplying] = useE(false);
  const [flashItem, setFlashItem] = useE(null);
  const totals = plan.blocks.reduce((a, b) => {
    const s = sumMacros(b.items);
    return {
      kcal: a.kcal + s.kcal,
      p: a.p + s.p,
      c: a.c + s.c,
      g: a.g + s.g
    };
  }, {
    kcal: 0,
    p: 0,
    c: 0,
    g: 0
  });
  const updBlock = (id, u) => setPlan(p => ({
    ...p,
    blocks: p.blocks.map(b => b.id === id ? u : b)
  }));
  const rmBlock = id => setPlan(p => ({
    ...p,
    blocks: p.blocks.filter(b => b.id !== id)
  }));
  const addBlock = () => setPlan(p => ({
    ...p,
    blocks: [...p.blocks, {
      id: uid(),
      time: "08:00",
      title: "Nova Refeição",
      icon: "Sun",
      items: []
    }]
  }));
  const onDrop = target => {
    if (dragIdx === null || dragIdx === target) return;
    setPlan(p => {
      const blocks = [...p.blocks];
      const [moved] = blocks.splice(dragIdx, 1);
      blocks.splice(target, 0, moved);
      return {
        ...p,
        blocks
      };
    });
    setDragIdx(null);
  };

  // Touch-friendly alternative to drag-and-drop reordering.
  const moveBlock = (from, to) => {
    if (to < 0 || to >= plan.blocks.length) return;
    setPlan(p => {
      const blocks = [...p.blocks];
      const [moved] = blocks.splice(from, 1);
      blocks.splice(to, 0, moved);
      return {
        ...p,
        blocks
      };
    });
  };

  // The "agent" applies the student's request (swap brócolos -> abobrinha)
  const applyAgent = () => {
    setApplying(true);
    setTimeout(() => {
      setPlan(p => ({
        ...p,
        blocks: p.blocks.map(b => b.id === request.blockId ? {
          ...b,
          items: b.items.map(it => it.id === request.suggestion.id ? {
            ...request.suggestion
          } : it)
        } : b)
      }));
      setApplying(false);
      setReqOpen(false);
      setFlashItem(request.suggestion.id);
      setTimeout(() => setFlashItem(null), 1800);
    }, 1100);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 760,
      margin: "0 auto",
      padding: "24px 28px 80px"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onBack,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      background: "none",
      border: "none",
      color: "var(--slate-500)",
      fontSize: 13,
      fontWeight: 700,
      cursor: "pointer",
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement(Le.ChevronLeft, {
    size: 16
  }), " Voltar aos clientes"), /*#__PURE__*/React.createElement("div", {
    className: "fs-eyebrow",
    style: {
      marginBottom: 10
    }
  }, "Editor de plano"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginBottom: 4
    }
  }, /*#__PURE__*/React.createElement("input", {
    value: plan.name,
    onChange: e => setPlan(p => ({
      ...p,
      name: e.target.value
    })),
    "aria-label": "Nome do plano",
    style: {
      flex: 1,
      fontFamily: "var(--font-display)",
      fontSize: 28,
      fontWeight: 900,
      color: "var(--slate-800)",
      border: "none",
      background: "transparent",
      letterSpacing: "-.01em"
    }
  }), /*#__PURE__*/React.createElement(EBadge, {
    tone: "green",
    dot: true
  }, "Publicado")), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--slate-400)",
      fontSize: 13,
      margin: "0 0 20px"
    }
  }, "Plano de ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: "var(--slate-500)"
    }
  }, plan.client), " \xB7 clique em qualquer campo para editar, arraste os blocos para reordenar."), reqOpen && /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      border: "1px solid rgba(124,105,239,.3)",
      borderRadius: "var(--radius-lg)",
      padding: 16,
      marginBottom: 22,
      boxShadow: "var(--shadow-sm)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(ETile, {
    tone: "purple",
    size: 38
  }, /*#__PURE__*/React.createElement(Le.MessageSquareText, {
    size: 18
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginBottom: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 800,
      color: "var(--slate-800)"
    }
  }, "Pedido do aluno"), /*#__PURE__*/React.createElement(EBadge, {
    tone: "purple"
  }, request.reason)), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "0 0 12px",
      fontSize: 13,
      color: "var(--slate-500)",
      lineHeight: 1.5
    }
  }, "\"", request.note, "\". A IA sugere trocar por ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: "var(--slate-700)"
    }
  }, request.suggestion.name), " (", request.suggestion.kcal, " kcal), mantendo os macros do plano."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(EBtn, {
    variant: "purple",
    size: "sm",
    icon: applying ? /*#__PURE__*/React.createElement(Le.Loader2, {
      size: 13,
      className: "spin"
    }) : /*#__PURE__*/React.createElement(Le.Sparkles, {
      size: 13
    }),
    onClick: applyAgent,
    disabled: applying
  }, applying ? "A aplicar" : "Aplicar com IA"), /*#__PURE__*/React.createElement(EBtn, {
    variant: "ghost",
    size: "sm",
    onClick: () => setReqOpen(false)
  }, "Ignorar"))))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      borderRadius: "var(--radius-lg)",
      border: "1px solid var(--slate-100)",
      boxShadow: "var(--shadow-sm)",
      padding: 16,
      marginBottom: 22,
      display: "flex",
      alignItems: "center",
      gap: 14,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement(ETile, {
    tone: "lime",
    size: 34,
    radius: "10px"
  }, /*#__PURE__*/React.createElement(Le.Zap, {
    size: 16,
    fill: "#000"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "fs-eyebrow",
    style: {
      margin: 0
    }
  }, "Total Di\xE1rio"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 20,
      fontWeight: 900,
      color: "var(--slate-800)"
    }
  }, Math.round(totals.kcal), " ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 500,
      color: "var(--slate-400)"
    }
  }, "kcal")))), [["Proteína", totals.p, "protein"], ["Carboidrato", totals.c, "carbs"], ["Gordura", totals.g, "fat"]].map(([lab, val, tone]) => /*#__PURE__*/React.createElement("div", {
    key: lab,
    style: {
      textAlign: "center",
      padding: "8px 14px",
      borderRadius: 12,
      background: `var(--macro-${tone}-bg)`
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "fs-eyebrow",
    style: {
      margin: 0
    }
  }, lab), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 14,
      fontWeight: 900,
      color: `var(--macro-${tone})`
    }
  }, Math.round(val), "g")))), plan.blocks.map((block, i) => /*#__PURE__*/React.createElement(BlockCard, {
    key: block.id,
    block: block,
    onChange: u => updBlock(block.id, u),
    onRemove: () => rmBlock(block.id),
    dragging: dragIdx === i,
    flashItem: flashItem,
    canMoveUp: i > 0,
    canMoveDown: i < plan.blocks.length - 1,
    onMoveUp: () => moveBlock(i, i - 1),
    onMoveDown: () => moveBlock(i, i + 1),
    dragHandlers: {
      onDragStart: () => setDragIdx(i),
      onDragOver: e => e.preventDefault(),
      onDrop: () => onDrop(i),
      onDragEnd: () => setDragIdx(null)
    }
  })), /*#__PURE__*/React.createElement("button", {
    onClick: addBlock,
    style: {
      width: "100%",
      border: "2px dashed var(--slate-200)",
      background: "none",
      color: "var(--slate-400)",
      fontSize: 14,
      fontWeight: 800,
      padding: "16px 0",
      borderRadius: "var(--radius-lg)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      cursor: "pointer",
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement(Le.Plus, {
    size: 16
  }), " Adicionar Refei\xE7\xE3o"));
}
window.PlanoEditor = PlanoEditor;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/nutricionista/plano-editor.jsx", error: String((e && e.message) || e) }); }

// ui_kits/nutricionista/screen-dashboard.jsx
try { (() => {
// Fitness Sincera - Nutricionista Dashboard
const DSpd = window.FitnessSinceraDesignSystem_06b67f;
const {
  Button: PdBtn,
  Badge: PdBadge,
  StatCard: PdStat,
  Avatar: PdAv,
  Card: PdCard,
  ProgressBar: PdBar
} = DSpd;
const Lpd = window.LucideReact;
const {
  useState: usePd
} = React;
function AvStack({
  items,
  extra
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex"
    }
  }, items.map((c, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      width: 28,
      height: 28,
      borderRadius: "50%",
      background: c,
      border: "2px solid #fff",
      marginLeft: i ? -8 : 0
    }
  })), extra > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      width: 28,
      height: 28,
      borderRadius: "50%",
      background: "var(--slate-500)",
      border: "2px solid #fff",
      marginLeft: -8,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 9,
      color: "#fff",
      fontWeight: 800
    }
  }, "+", extra));
}
function Widget({
  title,
  children,
  action
}) {
  return /*#__PURE__*/React.createElement(PdCard, {
    radius: "var(--radius-lg)",
    pad: false,
    style: {
      boxShadow: "var(--shadow-sm)",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "16px 20px",
      borderBottom: "1px solid var(--slate-50)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontSize: 15,
      fontWeight: 800,
      color: "var(--slate-700)",
      fontFamily: "var(--font-display)",
      textTransform: "none",
      letterSpacing: 0
    }
  }, title), /*#__PURE__*/React.createElement(Lpd.HelpCircle, {
    size: 14,
    color: "var(--slate-300)"
  })), action), children);
}
function AlertsWidget({
  alerts
}) {
  return /*#__PURE__*/React.createElement(Widget, {
    title: "Alertas Nutricionais",
    action: /*#__PURE__*/React.createElement("button", {
      style: {
        fontSize: 10,
        fontWeight: 800,
        color: "var(--slate-400)",
        background: "none",
        border: "none",
        cursor: "pointer"
      }
    }, "Limpar todas")
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 4
    }
  }, alerts.map((a, i) => /*#__PURE__*/React.createElement("div", {
    key: a.id,
    style: {
      padding: 16,
      display: "flex",
      gap: 16,
      borderTop: i ? "1px solid var(--slate-50)" : "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 40,
      height: 40,
      borderRadius: "50%",
      flexShrink: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: 800,
      fontSize: 12,
      background: a.dark ? "#525252" : "var(--slate-200)",
      color: a.dark ? "#fff" : "var(--slate-600)"
    }
  }, a.initials), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("h4", {
    style: {
      margin: 0,
      fontSize: 12,
      fontWeight: 800,
      display: "flex",
      alignItems: "center",
      gap: 5,
      color: a.type === "ok" ? "var(--green-400)" : "var(--warning)"
    }
  }, a.type === "ok" ? /*#__PURE__*/React.createElement(Lpd.CircleCheck, {
    size: 13,
    strokeWidth: 2.5
  }) : /*#__PURE__*/React.createElement(Lpd.TriangleAlert, {
    size: 13,
    strokeWidth: 2.5
  }), a.title), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      color: "var(--slate-400)",
      fontStyle: "italic",
      flexShrink: 0
    }
  }, a.time)), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "4px 0 0",
      fontSize: 11,
      color: "var(--slate-500)",
      lineHeight: 1.5
    }
  }, a.message))))));
}
function ComplianceWidget({
  avg
}) {
  const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
  const vals = [74, 68, 71, 79, 82, 77, 74, 0, 0, 0, 0, 0];
  const max = Math.max(...vals, 1);
  return /*#__PURE__*/React.createElement(Widget, {
    title: "Conformidade nutricional",
    action: /*#__PURE__*/React.createElement(Lpd.ChevronRight, {
      size: 16,
      color: "var(--slate-400)"
    })
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: 8,
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 34,
      fontWeight: 900,
      color: "var(--slate-800)",
      fontFamily: "var(--font-display)"
    }
  }, avg, "%"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      color: "var(--slate-400)",
      fontWeight: 600
    }
  }, "M\xE9dia 2026")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-end",
      gap: 6,
      height: 96
    }
  }, vals.map((v, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      maxWidth: 16,
      borderRadius: 4,
      background: v ? "var(--green-300)" : "var(--slate-100)",
      height: `${v / max * 80 + 2}px`,
      transition: "height .5s"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 8,
      color: "var(--slate-300)",
      fontWeight: 600
    }
  }, months[i]))))));
}
function ClientsTable({
  clients,
  onOpen
}) {
  const statusMap = {
    active: ["green", "Ativo"],
    risk: ["amber", "Em risco"],
    paused: ["neutral", "Pausado"]
  };
  return /*#__PURE__*/React.createElement(PdCard, {
    radius: "var(--radius-lg)",
    pad: false,
    style: {
      boxShadow: "var(--shadow-sm)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "16px 20px",
      borderBottom: "1px solid var(--slate-50)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 12,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontSize: 15,
      fontWeight: 800,
      color: "var(--slate-700)",
      fontFamily: "var(--font-display)",
      textTransform: "none",
      letterSpacing: 0
    }
  }, "Gest\xE3o dos Clientes"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: "var(--slate-400)"
    }
  }, clients.length, " Clientes")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "client-search",
    className: "sr-only"
  }, "Pesquisar cliente"), /*#__PURE__*/React.createElement(Lpd.Search, {
    size: 14,
    style: {
      position: "absolute",
      left: 10,
      top: "50%",
      transform: "translateY(-50%)",
      color: "var(--slate-300)"
    }
  }), /*#__PURE__*/React.createElement("input", {
    id: "client-search",
    placeholder: "Pesquisar cliente...",
    style: {
      paddingLeft: 32,
      paddingRight: 12,
      height: 36,
      borderRadius: 10,
      border: "1px solid var(--slate-200)",
      fontSize: 13,
      width: 180
    }
  })), /*#__PURE__*/React.createElement(PdBtn, {
    variant: "primary",
    size: "sm",
    icon: /*#__PURE__*/React.createElement(Lpd.ClipboardEdit, {
      size: 14
    }),
    onClick: () => onOpen()
  }, "Gerir Planos"), /*#__PURE__*/React.createElement(PdBtn, {
    variant: "green",
    size: "sm",
    icon: /*#__PURE__*/React.createElement(Lpd.UserPlus, {
      size: 14
    })
  }, "Novo cliente"))), /*#__PURE__*/React.createElement("div", {
    className: "fs-table-scroll",
    style: {
      overflowX: "auto"
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      minWidth: 620,
      borderCollapse: "collapse"
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      textAlign: "left"
    }
  }, ["Cliente", "Objetivo", "Adesão", "Estado", ""].map((h, i) => /*#__PURE__*/React.createElement("th", {
    key: i,
    style: {
      padding: "12px 20px",
      fontSize: 10,
      fontWeight: 900,
      textTransform: "uppercase",
      letterSpacing: ".1em",
      color: "var(--slate-400)"
    }
  }, h)))), /*#__PURE__*/React.createElement("tbody", null, clients.map(c => {
    const [tone, label] = statusMap[c.status];
    return /*#__PURE__*/React.createElement("tr", {
      key: c.id,
      style: {
        borderTop: "1px solid var(--slate-50)",
        cursor: "pointer"
      },
      onClick: () => onOpen(c),
      onMouseEnter: e => e.currentTarget.style.background = "var(--slate-50)",
      onMouseLeave: e => e.currentTarget.style.background = "transparent"
    }, /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "14px 20px"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 12
      }
    }, /*#__PURE__*/React.createElement(PdAv, {
      initials: c.initials,
      tone: c.dark ? "dark" : "slate",
      ring: false,
      size: 36
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 14,
        fontWeight: 700,
        color: "var(--slate-800)"
      }
    }, c.name))), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "14px 20px",
        fontSize: 13,
        color: "var(--slate-500)"
      }
    }, c.goal), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "14px 20px"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 60
      }
    }, /*#__PURE__*/React.createElement(PdBar, {
      value: c.compliance,
      tone: c.compliance > 70 ? "green" : "slate",
      height: 6
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        fontWeight: 800,
        color: "var(--slate-600)",
        fontFamily: "var(--font-mono)"
      }
    }, c.compliance, "%"))), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "14px 20px"
      }
    }, /*#__PURE__*/React.createElement(PdBadge, {
      tone: tone,
      dot: true
    }, label)), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "14px 20px",
        textAlign: "right"
      }
    }, /*#__PURE__*/React.createElement(Lpd.ChevronRight, {
      size: 16,
      color: "var(--slate-300)"
    })));
  })))));
}
function NutriDashboard({
  data,
  onOpenPlan
}) {
  const {
    stats,
    alerts,
    clients
  } = data;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1100,
      margin: "0 auto",
      padding: 32,
      display: "flex",
      flexDirection: "column",
      gap: 28
    }
  }, /*#__PURE__*/React.createElement(window.PageHeader, {
    eyebrow: "Painel \xB7 Dra. Sofia Almeida",
    title: "Vis\xE3o Geral",
    subtitle: "Bom dia, Sofia. Tr\xEAs clientes precisam de aten\xE7\xE3o hoje.",
    right: /*#__PURE__*/React.createElement(PdBtn, {
      variant: "green",
      icon: /*#__PURE__*/React.createElement(Lpd.UserPlus, {
        size: 15
      })
    }, "Novo Cliente")
  }), /*#__PURE__*/React.createElement("div", {
    className: "fs-stats-grid",
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(PdStat, {
    label: "Total de Clientes",
    value: stats.total,
    slot: /*#__PURE__*/React.createElement(AvStack, {
      items: ["#cbd5e1", "#94a3b8"],
      extra: stats.total - 2
    })
  }), /*#__PURE__*/React.createElement(PdStat, {
    label: "Ativos nos \xFAltimos 7 dias",
    value: stats.active
  }), /*#__PURE__*/React.createElement(PdStat, {
    label: "Clientes em risco nutricional",
    value: stats.atRisk,
    slot: /*#__PURE__*/React.createElement(AvStack, {
      items: ["#fbbf24"],
      extra: stats.atRisk - 1
    })
  })), /*#__PURE__*/React.createElement("div", {
    className: "fs-widgets-grid",
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 24
    }
  }, /*#__PURE__*/React.createElement(AlertsWidget, {
    alerts: alerts
  }), /*#__PURE__*/React.createElement(ComplianceWidget, {
    avg: stats.compliance
  })), /*#__PURE__*/React.createElement(ClientsTable, {
    clients: clients,
    onOpen: onOpenPlan
  }));
}
window.NutriDashboard = NutriDashboard;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/nutricionista/screen-dashboard.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.IconTile = __ds_scope.IconTile;

__ds_ns.ProgressBar = __ds_scope.ProgressBar;

__ds_ns.RingGauge = __ds_scope.RingGauge;

__ds_ns.StatCard = __ds_scope.StatCard;

__ds_ns.Brand = __ds_scope.Brand;

__ds_ns.NavItem = __ds_scope.NavItem;

})();
