// Fitness Sincera - Nutricionista Dashboard
const DSpd = window.FitnessSinceraDesignSystem_06b67f;
const { Button: PdBtn, Badge: PdBadge, StatCard: PdStat, Avatar: PdAv, Card: PdCard, ProgressBar: PdBar } = DSpd;
const Lpd = window.LucideReact;
const { useState: usePd } = React;

function AvStack({ items, extra }) {
  return (
    <div style={{ display: "flex" }}>
      {items.map((c, i) => (
        <div key={i} style={{ width: 28, height: 28, borderRadius: "50%", background: c, border: "2px solid #fff", marginLeft: i ? -8 : 0 }} />
      ))}
      {extra > 0 && <div style={{ width: 28, height: 28, borderRadius: "50%", background: "var(--slate-500)", border: "2px solid #fff", marginLeft: -8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: "#fff", fontWeight: 800 }}>+{extra}</div>}
    </div>
  );
}

function Widget({ title, children, action }) {
  return (
    <PdCard radius="var(--radius-lg)" pad={false} style={{ boxShadow: "var(--shadow-sm)", overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--slate-50)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <h3 style={{ margin: 0, fontSize: 15, fontWeight: 800, color: "var(--slate-700)", fontFamily: "var(--font-display)", textTransform: "none", letterSpacing: 0 }}>{title}</h3>
          <Lpd.HelpCircle size={14} color="var(--slate-300)" />
        </div>
        {action}
      </div>
      {children}
    </PdCard>
  );
}

function AlertsWidget({ alerts }) {
  return (
    <Widget title="Alertas Nutricionais" action={<button style={{ fontSize: 10, fontWeight: 800, color: "var(--slate-400)", background: "none", border: "none", cursor: "pointer" }}>Limpar todas</button>}>
      <div style={{ padding: 4 }}>
        {alerts.map((a, i) => (
          <div key={a.id} style={{ padding: 16, display: "flex", gap: 16, borderTop: i ? "1px solid var(--slate-50)" : "none" }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 12, background: a.dark ? "#525252" : "var(--slate-200)", color: a.dark ? "#fff" : "var(--slate-600)" }}>{a.initials}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                <h4 style={{ margin: 0, fontSize: 12, fontWeight: 800, display: "flex", alignItems: "center", gap: 5, color: a.type === "ok" ? "var(--green-400)" : "var(--warning)" }}>{a.type === "ok" ? <Lpd.CircleCheck size={13} strokeWidth={2.5} /> : <Lpd.TriangleAlert size={13} strokeWidth={2.5} />}{a.title}</h4>
                <span style={{ fontSize: 10, color: "var(--slate-400)", fontStyle: "italic", flexShrink: 0 }}>{a.time}</span>
              </div>
              <p style={{ margin: "4px 0 0", fontSize: 11, color: "var(--slate-500)", lineHeight: 1.5 }}>{a.message}</p>
            </div>
          </div>
        ))}
      </div>
    </Widget>
  );
}

function ComplianceWidget({ avg }) {
  const months = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];
  const vals = [74,68,71,79,82,77,74,0,0,0,0,0];
  const max = Math.max(...vals, 1);
  return (
    <Widget title="Conformidade nutricional" action={<Lpd.ChevronRight size={16} color="var(--slate-400)" />}>
      <div style={{ padding: 24 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 18 }}>
          <span style={{ fontSize: 34, fontWeight: 900, color: "var(--slate-800)", fontFamily: "var(--font-display)" }}>{avg}%</span>
          <span style={{ fontSize: 10, color: "var(--slate-400)", fontWeight: 600 }}>Média 2026</span>
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 96 }}>
          {vals.map((v, i) => (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <div style={{ width: "100%", maxWidth: 16, borderRadius: 4, background: v ? "var(--green-300)" : "var(--slate-100)", height: `${(v / max) * 80 + 2}px`, transition: "height .5s" }} />
              <span style={{ fontSize: 8, color: "var(--slate-300)", fontWeight: 600 }}>{months[i]}</span>
            </div>
          ))}
        </div>
      </div>
    </Widget>
  );
}

function ClientsTable({ clients, onOpen }) {
  const statusMap = { active: ["green", "Ativo"], risk: ["amber", "Em risco"], paused: ["neutral", "Pausado"] };
  return (
    <PdCard radius="var(--radius-lg)" pad={false} style={{ boxShadow: "var(--shadow-sm)", overflow: "hidden" }}>
      <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--slate-50)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <h3 style={{ margin: 0, fontSize: 15, fontWeight: 800, color: "var(--slate-700)", fontFamily: "var(--font-display)", textTransform: "none", letterSpacing: 0 }}>Gestão dos Clientes</h3>
          <span style={{ fontSize: 12, color: "var(--slate-400)" }}>{clients.length} Clientes</span>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <div style={{ position: "relative" }}>
            <label htmlFor="client-search" className="sr-only">Pesquisar cliente</label>
            <Lpd.Search size={14} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "var(--slate-300)" }} />
            <input id="client-search" placeholder="Pesquisar cliente..." style={{ paddingLeft: 32, paddingRight: 12, height: 36, borderRadius: 10, border: "1px solid var(--slate-200)", fontSize: 13, width: 180 }} />
          </div>
          <PdBtn variant="primary" size="sm" icon={<Lpd.ClipboardEdit size={14} />} onClick={() => onOpen()}>Gerir Planos</PdBtn>
          <PdBtn variant="green" size="sm" icon={<Lpd.UserPlus size={14} />}>Novo cliente</PdBtn>
        </div>
      </div>
      <div className="fs-table-scroll" style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", minWidth: 620, borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ textAlign: "left" }}>
            {["Cliente", "Objetivo", "Adesão", "Estado", ""].map((h, i) => (
              <th key={i} style={{ padding: "12px 20px", fontSize: 10, fontWeight: 900, textTransform: "uppercase", letterSpacing: ".1em", color: "var(--slate-400)" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {clients.map(c => {
            const [tone, label] = statusMap[c.status];
            return (
              <tr key={c.id} style={{ borderTop: "1px solid var(--slate-50)", cursor: "pointer" }} onClick={() => onOpen(c)}
                  onMouseEnter={e => e.currentTarget.style.background = "var(--slate-50)"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                <td style={{ padding: "14px 20px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <PdAv initials={c.initials} tone={c.dark ? "dark" : "slate"} ring={false} size={36} />
                    <span style={{ fontSize: 14, fontWeight: 700, color: "var(--slate-800)" }}>{c.name}</span>
                  </div>
                </td>
                <td style={{ padding: "14px 20px", fontSize: 13, color: "var(--slate-500)" }}>{c.goal}</td>
                <td style={{ padding: "14px 20px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 60 }}>
                      <PdBar value={c.compliance} tone={c.compliance > 70 ? "green" : "slate"} height={6} />
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 800, color: "var(--slate-600)", fontFamily: "var(--font-mono)" }}>{c.compliance}%</span>
                  </div>
                </td>
                <td style={{ padding: "14px 20px" }}><PdBadge tone={tone} dot>{label}</PdBadge></td>
                <td style={{ padding: "14px 20px", textAlign: "right" }}><Lpd.ChevronRight size={16} color="var(--slate-300)" /></td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>
    </PdCard>
  );
}

function NutriDashboard({ data, onOpenPlan }) {
  const { stats, alerts, clients } = data;
  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: 32, display: "flex", flexDirection: "column", gap: 28 }}>
      <window.PageHeader
        eyebrow="Painel · Dra. Sofia Almeida"
        title="Visão Geral"
        subtitle="Bom dia, Sofia. Três clientes precisam de atenção hoje."
        right={<PdBtn variant="green" icon={<Lpd.UserPlus size={15} />}>Novo Cliente</PdBtn>}
      />

      <div className="fs-stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
        <PdStat label="Total de Clientes" value={stats.total} slot={<AvStack items={["#cbd5e1","#94a3b8"]} extra={stats.total - 2} />} />
        <PdStat label="Ativos nos últimos 7 dias" value={stats.active} />
        <PdStat label="Clientes em risco nutricional" value={stats.atRisk} slot={<AvStack items={["#fbbf24"]} extra={stats.atRisk - 1} />} />
      </div>

      <div className="fs-widgets-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        <AlertsWidget alerts={alerts} />
        <ComplianceWidget avg={stats.compliance} />
      </div>

      <ClientsTable clients={clients} onOpen={onOpenPlan} />
    </div>
  );
}

window.NutriDashboard = NutriDashboard;
