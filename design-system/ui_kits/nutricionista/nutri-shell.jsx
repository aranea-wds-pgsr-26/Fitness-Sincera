// Fitness Sincera - Nutricionista shell (dark sidebar, emerald accent, light work area)
const DSp = window.FitnessSinceraDesignSystem_06b67f;
const { Brand: PBrand, NavItem: PNav, Avatar: PAvatar, Badge: PBadge } = DSp;
const Lp = window.LucideReact;

function NutriShell({ active, onNav, children }) {
  const nav = [
    { key: "dashboard", label: "Dashboard", icon: Lp.LayoutDashboard },
    { key: "clientes", label: "Clientes", icon: Lp.Users, count: 3 },
    { key: "planos", label: "Planos", icon: Lp.ClipboardList },
    { key: "alimentos", label: "Alimentos", icon: Lp.Apple },
    { key: "agente", label: "Agente IA", icon: Lp.Sparkles },
  ];
  return (
    <div style={{ height: "100%", background: "var(--shell-900)", display: "flex", overflow: "hidden" }}>
      <aside className="fs-sidebar" style={{ width: 256, flexShrink: 0, background: "var(--shell-800)", display: "flex", flexDirection: "column", padding: 24 }}>
        <div className="fs-side-extra" style={{ paddingLeft: 4, marginBottom: 36 }}><PBrand variant="wordmark" /></div>
        <nav style={{ display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
          {nav.map(n => (
            <PNav key={n.key} icon={<n.icon size={20} />} label={n.label} active={active === n.key} count={n.count} onClick={() => onNav(n.key)} />
          ))}
        </nav>
        {/* pro profile */}
        <div className="fs-side-extra" style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: 12, background: "rgba(255,255,255,.04)", borderRadius: "var(--radius-lg)", padding: 12 }}>
          <PAvatar initials="SA" tone="green" />
          <div style={{ minWidth: 0 }}>
            <p style={{ margin: 0, color: "#fff", fontSize: 13, fontWeight: 800, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Dra. Sofia</p>
            <p style={{ margin: 0, color: "var(--slate-500)", fontSize: 10, fontWeight: 600 }}>Nutricionista</p>
          </div>
        </div>
      </aside>
      <main style={{ flex: 1, padding: 16, overflow: "hidden", display: "flex" }}>
        <div className="work-scroll fs-main-scroll" style={{ flex: 1, background: "var(--surface-app-cool)", borderRadius: "var(--radius-3xl)", overflowY: "auto" }}>
          {children}
        </div>
      </main>
    </div>
  );
}

// Canonical page header shared across every screen (eyebrow + uppercase
// display title + muted subtitle, with an optional right-side cluster).
function PageHeader({ eyebrow, title, subtitle, right }) {
  return (
    <header style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 28, gap: 16, flexWrap: "wrap" }}>
      <div>
        {eyebrow && <div className="fs-eyebrow" style={{ marginBottom: 10 }}>{eyebrow}</div>}
        <h1 className="fs-display" style={{ fontSize: 40, lineHeight: 1.04, color: "var(--slate-900)", margin: 0 }}>{title}</h1>
        {subtitle && <p style={{ color: "var(--slate-500)", fontSize: 14, fontWeight: 500, margin: "8px 0 0" }}>{subtitle}</p>}
      </div>
      {right && <div>{right}</div>}
    </header>
  );
}

window.NutriShell = NutriShell;
window.PageHeader = PageHeader;
