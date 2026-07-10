// Fitness Sincera - Aluno app shell (dark flux sidebar + light work panel)
const { useState } = React;
const DS = window.FitnessSinceraDesignSystem_06b67f;
const { Brand, NavItem, Avatar } = DS;
const L = window.LucideReact;

function AppShell({ active, onNav, children, headerRight }) {
  const nav = [
    { key: "dashboard", label: "Dashboard", icon: L.LayoutDashboard, count: 3 },
    { key: "nutricao", label: "Nutrição", icon: L.Apple },
    { key: "treino", label: "Treino", icon: L.Dumbbell, context: "purple" },
    { key: "agente", label: "Agente", icon: L.MessageSquare },
    { key: "perfil", label: "Perfil", icon: L.User },
  ];

  return (
    <div style={{ height: "100%", background: "var(--shell-900)", display: "flex", overflow: "hidden" }}>
      {/* Sidebar */}
      <aside className="fs-sidebar" style={{ width: 256, flexShrink: 0, background: "var(--shell-800)", display: "flex", flexDirection: "column", padding: 24 }}>
        <div className="fs-side-extra" style={{ paddingLeft: 4, marginBottom: 36 }}><Brand variant="wordmark" /></div>
        <nav style={{ display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
          {nav.map((n) => (
            <NavItem
              key={n.key}
              icon={<n.icon size={20} />}
              label={n.label}
              active={active === n.key}
              context={n.context}
              count={n.count}
              onClick={() => onNav(n.key)}
            />
          ))}
        </nav>

        {/* Upgrade card */}
        <div className="fs-side-extra" style={{ marginTop: "auto", background: "var(--lime-400)", borderRadius: "var(--radius-2xl)", padding: 20, position: "relative", overflow: "hidden" }}>
          <h4 style={{ color: "#000", fontWeight: 900, fontSize: 17, margin: 0, lineHeight: 1.1 }}>Upgrade para Pro</h4>
          <p style={{ color: "rgba(0,0,0,.55)", fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".08em", margin: "4px 0 14px" }}>Experiência completa</p>
          <button style={{ width: "100%", background: "#000", color: "#fff", padding: "11px 0", borderRadius: "var(--radius-md)", border: "none", fontSize: 11, fontWeight: 900, textTransform: "uppercase", letterSpacing: ".12em", cursor: "pointer" }}>Upgrade Agora</button>
          <L.Rocket size={80} style={{ position: "absolute", right: -12, bottom: -12, color: "rgba(0,0,0,.06)", transform: "rotate(-12deg)" }} />
        </div>
        <div className="fs-side-extra" style={{ paddingTop: 22, marginTop: 22, borderTop: "1px solid rgba(255,255,255,.06)" }}>
          <button style={{ display: "flex", alignItems: "center", gap: 12, background: "none", border: "none", color: "var(--slate-500)", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
            <L.LogOut size={20} /> Sair da Conta
          </button>
        </div>
      </aside>

      {/* Work area - full-bleed infinite scroll */}
      <main style={{ flex: 1, overflow: "hidden", display: "flex" }}>
        <div style={{ flex: 1, background: "var(--surface-app)", overflowY: "auto", padding: "32px 40px 64px" }} className="work-scroll fs-main-scroll">
          {children}
        </div>
      </main>
    </div>
  );
}

function WorkHeader({ user }) {
  return (
    <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28, gap: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <Avatar src={user.avatar} initials="LB" />
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <span style={{ fontWeight: 800, fontSize: 14, color: "var(--slate-900)" }}>{user.name}</span>
            <L.ChevronDown size={14} color="var(--slate-500)" />
          </div>
          <p style={{ fontSize: 10, color: "var(--slate-500)", fontWeight: 500, margin: 0 }}>{user.email}</p>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ position: "relative" }}>
          <label htmlFor="work-search" className="sr-only">Pesquisar</label>
          <L.Search size={18} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--slate-400)" }} />
          <input id="work-search" placeholder="Pesquisar..." style={{ background: "#fff", borderRadius: "var(--radius-pill)", padding: "10px 16px 10px 38px", width: 240, border: "none", boxShadow: "var(--shadow-sm)", fontSize: 13 }} />
        </div>
        <button aria-label="Notificações (2 não lidas)" style={{ position: "relative", padding: 11, background: "#fff", borderRadius: "var(--radius-pill)", boxShadow: "var(--shadow-sm)", cursor: "pointer", border: "none" }}>
          <L.Bell size={18} color="var(--slate-700)" />
          <span aria-hidden="true" style={{ position: "absolute", top: 6, right: 6, width: 16, height: 16, background: "var(--lime-400)", border: "2px solid #fff", borderRadius: "50%", fontSize: 8, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900 }}>2</span>
        </button>
      </div>
    </header>
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

window.AppShell = AppShell;
window.WorkHeader = WorkHeader;
window.PageHeader = PageHeader;
