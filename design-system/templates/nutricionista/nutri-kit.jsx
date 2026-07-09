// Fitness Sincera - Nutricionista (template kit). Self-rendering custom element <nutri-kit>.
(function(){
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
      var key = k.replace(/-([a-z])/g, function (m, c) { return c.toUpperCase(); });
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
    has: function () { return true; }
  });
})();

})();
(function(){
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
      <aside style={{ width: 256, flexShrink: 0, background: "var(--shell-800)", display: "flex", flexDirection: "column", padding: 24 }}>
        <div style={{ paddingLeft: 4, marginBottom: 36 }}><PBrand variant="wordmark" /></div>
        <nav style={{ display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
          {nav.map(n => (
            <PNav key={n.key} icon={<n.icon size={20} />} label={n.label} active={active === n.key} count={n.count} onClick={() => onNav(n.key)} />
          ))}
        </nav>
        {/* pro profile */}
        <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: 12, background: "rgba(255,255,255,.04)", borderRadius: "var(--radius-lg)", padding: 12 }}>
          <PAvatar initials="SA" tone="green" />
          <div style={{ minWidth: 0 }}>
            <p style={{ margin: 0, color: "#fff", fontSize: 13, fontWeight: 800, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Dra. Sofia</p>
            <p style={{ margin: 0, color: "var(--slate-500)", fontSize: 10, fontWeight: 600 }}>Nutricionista</p>
          </div>
        </div>
      </aside>
      <main style={{ flex: 1, overflow: "hidden", display: "flex" }}>
        <div className="work-scroll" style={{ flex: 1, background: "var(--surface-app-cool)", overflowY: "auto" }}>
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

})();
(function(){
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
            <Lpd.Search size={14} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "var(--slate-300)" }} />
            <input placeholder="Pesquisar cliente..." style={{ paddingLeft: 32, paddingRight: 12, height: 36, borderRadius: 10, border: "1px solid var(--slate-200)", fontSize: 13, width: 180, outline: "none" }} />
          </div>
          <PdBtn variant="primary" size="sm" icon={<Lpd.ClipboardEdit size={14} />} onClick={() => onOpen()}>Gerir Planos</PdBtn>
          <PdBtn variant="green" size="sm" icon={<Lpd.UserPlus size={14} />}>Novo cliente</PdBtn>
        </div>
      </div>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
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

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
        <PdStat label="Total de Clientes" value={stats.total} slot={<AvStack items={["#cbd5e1","#94a3b8"]} extra={stats.total - 2} />} />
        <PdStat label="Ativos nos últimos 7 dias" value={stats.active} />
        <PdStat label="Clientes em risco nutricional" value={stats.atRisk} slot={<AvStack items={["#fbbf24"]} extra={stats.atRisk - 1} />} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        <AlertsWidget alerts={alerts} />
        <ComplianceWidget avg={stats.compliance} />
      </div>

      <ClientsTable clients={clients} onOpen={onOpenPlan} />
    </div>
  );
}

window.NutriDashboard = NutriDashboard;

})();
(function(){
// Fitness Sincera - Notion-style Meal Plan Editor (editable by nutritionist OR agent)
const DSe = window.FitnessSinceraDesignSystem_06b67f;
const { Badge: EBadge, Button: EBtn, IconTile: ETile, Card: ECard } = DSe;
const Le = window.LucideReact;
const { useState: useE, useRef: useRefE } = React;

const uid = () => Math.random().toString(36).slice(2, 9);
const iconFor = (name) => Le[name] || Le.Sun;
const sumMacros = (items) => items.reduce((a, it) => ({
  kcal: a.kcal + (+it.kcal || 0), p: a.p + (+it.p || 0), c: a.c + (+it.c || 0), g: a.g + (+it.g || 0),
}), { kcal: 0, p: 0, c: 0, g: 0 });

// ── Editable item row ─────────────────────────────────────────────────────────
function ItemRow({ item, onChange, onRemove, flash }) {
  const field = (k, raw) => onChange({ ...item, [k]: (k === "name" || k === "qty") ? raw : (parseFloat(raw) || 0) });
  return (
    <div className="item-row" style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 12px", borderRadius: 10, transition: "background .3s", background: flash ? "rgba(212,245,76,.35)" : "transparent" }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--slate-300)", flexShrink: 0 }} />
      <input value={item.name} onChange={e => field("name", e.target.value)} placeholder="Alimento"
        style={{ flex: 1, minWidth: 0, border: "none", background: "transparent", fontSize: 14, fontWeight: 500, color: "var(--slate-700)", outline: "none" }} />
      <input value={item.qty} onChange={e => field("qty", e.target.value)} placeholder="qtd"
        style={{ width: 64, border: "none", background: "transparent", fontSize: 12, color: "var(--slate-400)", textAlign: "right", outline: "none" }} />
      <div className="item-macros" style={{ display: "flex", gap: 4 }}>
        {[["kcal","kcal"],["p","P"],["c","C"],["g","G"]].map(([k, lab]) => (
          <span key={k} style={{ display: "flex", alignItems: "center" }}>
            <span style={{ fontSize: 9, color: "var(--slate-400)", marginRight: 2 }}>{lab}</span>
            <input value={item[k]} onChange={e => field(k, e.target.value)} type="number"
              style={{ width: 38, fontSize: 10, color: "var(--slate-500)", background: "var(--slate-100)", borderRadius: 5, border: "none", padding: "3px 4px", textAlign: "center", outline: "none" }} />
          </span>
        ))}
      </div>
      <button className="item-del" onClick={onRemove} style={{ background: "none", border: "none", color: "var(--slate-300)", cursor: "pointer", padding: 2 }}><Le.Trash2 size={14} /></button>
    </div>
  );
}

// ── Sortable block card ───────────────────────────────────────────────────────
function BlockCard({ block, onChange, onRemove, dragHandlers, dragging, flashItem }) {
  const [collapsed, setCollapsed] = useE(false);
  const totals = sumMacros(block.items);
  const Icon = iconFor(block.icon);

  const addItem = () => onChange({ ...block, items: [...block.items, { id: uid(), name: "", qty: "", kcal: 0, p: 0, c: 0, g: 0 }] });
  const updItem = (id, u) => onChange({ ...block, items: block.items.map(i => i.id === id ? u : i) });
  const rmItem = (id) => onChange({ ...block, items: block.items.filter(i => i.id !== id) });

  return (
    <div
      draggable
      {...dragHandlers}
      style={{ background: "#fff", borderRadius: "var(--radius-lg)", border: "1px solid var(--slate-100)", boxShadow: "var(--shadow-sm)", overflow: "hidden", marginBottom: 12, opacity: dragging ? 0.4 : 1 }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderBottom: collapsed ? "none" : "1px solid var(--slate-50)" }}>
        <span className="drag-handle" style={{ color: "var(--slate-300)", cursor: "grab", display: "flex" }}><Le.GripVertical size={16} /></span>
        <ETile tone="slate" size={32} radius="10px"><Icon size={16} /></ETile>
        <input value={block.title} onChange={e => onChange({ ...block, title: e.target.value })}
          style={{ flex: 1, minWidth: 0, border: "none", background: "transparent", fontSize: 14, fontWeight: 800, color: "var(--slate-800)", outline: "none" }} />
        <input value={block.time} onChange={e => onChange({ ...block, time: e.target.value })}
          className="fs-mono" style={{ width: 56, border: "none", background: "transparent", fontSize: 12, color: "var(--slate-400)", textAlign: "right", outline: "none" }} />
        <button onClick={() => setCollapsed(c => !c)} style={{ background: "none", border: "none", color: "var(--slate-300)", cursor: "pointer" }}>{collapsed ? <Le.ChevronDown size={16} /> : <Le.ChevronUp size={16} />}</button>
        <button onClick={onRemove} style={{ background: "none", border: "none", color: "var(--slate-200)", cursor: "pointer" }}><Le.Trash2 size={16} /></button>
      </div>

      {!collapsed && (
        <>
          <div style={{ padding: "6px 4px" }}>
            {block.items.map(it => (
              <ItemRow key={it.id} item={it} onChange={u => updItem(it.id, u)} onRemove={() => rmItem(it.id)} flash={flashItem === it.id} />
            ))}
            <button onClick={addItem} style={{ width: "100%", display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", background: "none", border: "none", color: "var(--slate-400)", fontSize: 12, fontWeight: 600, cursor: "pointer", borderRadius: 8 }}>
              <Le.Plus size={14} /> Adicionar alimento
            </button>
          </div>
          <div style={{ borderTop: "1px solid var(--slate-50)", padding: "10px 16px", display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <span className="fs-eyebrow" style={{ marginRight: 4 }}>Subtotal</span>
            <span style={{ fontSize: 11, fontWeight: 900, color: "var(--slate-600)" }}>{Math.round(totals.kcal)} kcal</span>
            <EBadge tone="protein">P {Math.round(totals.p)}g</EBadge>
            <EBadge tone="carbs">C {Math.round(totals.c)}g</EBadge>
            <EBadge tone="fat">G {Math.round(totals.g)}g</EBadge>
          </div>
        </>
      )}
    </div>
  );
}

// ── Main editor ───────────────────────────────────────────────────────────────
function PlanoEditor({ plan: initial, request, onBack }) {
  const [plan, setPlan] = useE(initial);
  const [dragIdx, setDragIdx] = useE(null);
  const [reqOpen, setReqOpen] = useE(true);
  const [applying, setApplying] = useE(false);
  const [flashItem, setFlashItem] = useE(null);

  const totals = plan.blocks.reduce((a, b) => {
    const s = sumMacros(b.items);
    return { kcal: a.kcal + s.kcal, p: a.p + s.p, c: a.c + s.c, g: a.g + s.g };
  }, { kcal: 0, p: 0, c: 0, g: 0 });

  const updBlock = (id, u) => setPlan(p => ({ ...p, blocks: p.blocks.map(b => b.id === id ? u : b) }));
  const rmBlock = (id) => setPlan(p => ({ ...p, blocks: p.blocks.filter(b => b.id !== id) }));
  const addBlock = () => setPlan(p => ({ ...p, blocks: [...p.blocks, { id: uid(), time: "08:00", title: "Nova Refeição", icon: "Sun", items: [] }] }));

  const onDrop = (target) => {
    if (dragIdx === null || dragIdx === target) return;
    setPlan(p => {
      const blocks = [...p.blocks];
      const [moved] = blocks.splice(dragIdx, 1);
      blocks.splice(target, 0, moved);
      return { ...p, blocks };
    });
    setDragIdx(null);
  };

  // The "agent" applies the student's request (swap brócolos -> abobrinha)
  const applyAgent = () => {
    setApplying(true);
    setTimeout(() => {
      setPlan(p => ({
        ...p,
        blocks: p.blocks.map(b => b.id === request.blockId
          ? { ...b, items: b.items.map(it => it.id === request.suggestion.id ? { ...request.suggestion } : it) }
          : b),
      }));
      setApplying(false);
      setReqOpen(false);
      setFlashItem(request.suggestion.id);
      setTimeout(() => setFlashItem(null), 1800);
    }, 1100);
  };

  return (
    <div style={{ maxWidth: 760, margin: "0 auto", padding: "24px 28px 80px" }}>
      <button onClick={onBack} style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "none", border: "none", color: "var(--slate-500)", fontSize: 13, fontWeight: 700, cursor: "pointer", marginBottom: 20 }}>
        <Le.ChevronLeft size={16} /> Voltar aos clientes
      </button>

      {/* Plan title */}
      <div className="fs-eyebrow" style={{ marginBottom: 10 }}>Editor de plano</div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
        <input value={plan.name} onChange={e => setPlan(p => ({ ...p, name: e.target.value }))}
          style={{ flex: 1, fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 900, color: "var(--slate-800)", border: "none", background: "transparent", outline: "none", letterSpacing: "-.01em" }} />
        <EBadge tone="green" dot>Publicado</EBadge>
      </div>
      <p style={{ color: "var(--slate-400)", fontSize: 13, margin: "0 0 20px" }}>
        Plano de <b style={{ color: "var(--slate-500)" }}>{plan.client}</b> · clique em qualquer campo para editar, arraste os blocos para reordenar.
      </p>

      {/* Student request -> agent edit banner */}
      {reqOpen && (
        <div style={{ background: "#fff", border: "1px solid rgba(124,105,239,.3)", borderRadius: "var(--radius-lg)", padding: 16, marginBottom: 22, boxShadow: "var(--shadow-sm)" }}>
          <div style={{ display: "flex", gap: 12 }}>
            <ETile tone="purple" size={38}><Le.MessageSquareText size={18} /></ETile>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <span style={{ fontSize: 13, fontWeight: 800, color: "var(--slate-800)" }}>Pedido do aluno</span>
                <EBadge tone="purple">{request.reason}</EBadge>
              </div>
              <p style={{ margin: "0 0 12px", fontSize: 13, color: "var(--slate-500)", lineHeight: 1.5 }}>
                "{request.note}". A IA sugere trocar por <b style={{ color: "var(--slate-700)" }}>{request.suggestion.name}</b> ({request.suggestion.kcal} kcal), mantendo os macros do plano.
              </p>
              <div style={{ display: "flex", gap: 8 }}>
                <EBtn variant="purple" size="sm" icon={applying ? <Le.Loader2 size={13} className="spin" /> : <Le.Sparkles size={13} />} onClick={applyAgent} disabled={applying}>
                  {applying ? "A aplicar" : "Aplicar com IA"}
                </EBtn>
                <EBtn variant="ghost" size="sm" onClick={() => setReqOpen(false)}>Ignorar</EBtn>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Daily totals */}
      <div style={{ background: "#fff", borderRadius: "var(--radius-lg)", border: "1px solid var(--slate-100)", boxShadow: "var(--shadow-sm)", padding: 16, marginBottom: 22, display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1, minWidth: 0 }}>
          <ETile tone="lime" size={34} radius="10px"><Le.Zap size={16} fill="#000" /></ETile>
          <div>
            <p className="fs-eyebrow" style={{ margin: 0 }}>Total Diário</p>
            <p style={{ margin: 0, fontSize: 20, fontWeight: 900, color: "var(--slate-800)" }}>{Math.round(totals.kcal)} <span style={{ fontSize: 13, fontWeight: 500, color: "var(--slate-400)" }}>kcal</span></p>
          </div>
        </div>
        {[["Proteína", totals.p, "protein"], ["Carboidrato", totals.c, "carbs"], ["Gordura", totals.g, "fat"]].map(([lab, val, tone]) => (
          <div key={lab} style={{ textAlign: "center", padding: "8px 14px", borderRadius: 12, background: `var(--macro-${tone}-bg)` }}>
            <p className="fs-eyebrow" style={{ margin: 0 }}>{lab}</p>
            <p style={{ margin: 0, fontSize: 14, fontWeight: 900, color: `var(--macro-${tone})` }}>{Math.round(val)}g</p>
          </div>
        ))}
      </div>

      {/* Blocks */}
      {plan.blocks.map((block, i) => (
        <BlockCard
          key={block.id}
          block={block}
          onChange={u => updBlock(block.id, u)}
          onRemove={() => rmBlock(block.id)}
          dragging={dragIdx === i}
          flashItem={flashItem}
          dragHandlers={{
            onDragStart: () => setDragIdx(i),
            onDragOver: (e) => e.preventDefault(),
            onDrop: () => onDrop(i),
            onDragEnd: () => setDragIdx(null),
          }}
        />
      ))}

      <button onClick={addBlock} style={{ width: "100%", border: "2px dashed var(--slate-200)", background: "none", color: "var(--slate-400)", fontSize: 14, fontWeight: 800, padding: "16px 0", borderRadius: "var(--radius-lg)", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, cursor: "pointer", marginTop: 4 }}>
        <Le.Plus size={16} /> Adicionar Refeição
      </button>
    </div>
  );
}

window.PlanoEditor = PlanoEditor;

})();

(function(){
  const { useState } = React;
  function App() {
    const [view, setView] = useState("dashboard");
    const [nav, setNav] = useState("dashboard");
    const openPlan = () => { setView("editor"); setNav("planos"); };
    const back = () => { setView("dashboard"); setNav("dashboard"); };
    return (
      <window.NutriShell active={nav} onNav={(k) => { setNav(k); setView(k === "planos" ? "editor" : "dashboard"); }}>
        {view === "editor"
          ? <window.PlanoEditor plan={window.NUTRI.plan} request={window.NUTRI.studentRequest} onBack={back} />
          : <window.NutriDashboard data={window.NUTRI} onOpenPlan={openPlan} />}
      </window.NutriShell>
    );
  }
  if (!customElements.get('nutri-kit')) {
    customElements.define('nutri-kit', class extends HTMLElement {
      connectedCallback(){ if(this._m) return; this._m=1; window.ReactDOM.createRoot(this).render(React.createElement(App)); }
    });
  }
})();
