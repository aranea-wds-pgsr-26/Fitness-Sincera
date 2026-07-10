// Fitness Sincera - Aluno (template kit). Self-rendering custom element <aluno-kit>.
// Combines the lucide-react shim, app shell, screens, and the App root so the
// whole client app mounts through a single x-import in the template DC.
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
      <aside style={{ width: 256, flexShrink: 0, background: "var(--shell-800)", display: "flex", flexDirection: "column", padding: 24 }}>
        <div style={{ paddingLeft: 4, marginBottom: 36 }}><Brand variant="wordmark" /></div>
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
        <div style={{ marginTop: "auto", background: "var(--lime-400)", borderRadius: "var(--radius-2xl)", padding: 20, position: "relative", overflow: "hidden" }}>
          <h4 style={{ color: "#000", fontWeight: 900, fontSize: 17, margin: 0, lineHeight: 1.1 }}>Upgrade para Pro</h4>
          <p style={{ color: "rgba(0,0,0,.55)", fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".08em", margin: "4px 0 14px" }}>Experiência completa</p>
          <button style={{ width: "100%", background: "#000", color: "#fff", padding: "11px 0", borderRadius: "var(--radius-md)", border: "none", fontSize: 11, fontWeight: 900, textTransform: "uppercase", letterSpacing: ".12em", cursor: "pointer" }}>Upgrade Agora</button>
          <L.Rocket size={80} style={{ position: "absolute", right: -12, bottom: -12, color: "rgba(0,0,0,.06)", transform: "rotate(-12deg)" }} />
        </div>
        <div style={{ paddingTop: 22, marginTop: 22, borderTop: "1px solid rgba(255,255,255,.06)" }}>
          <button style={{ display: "flex", alignItems: "center", gap: 12, background: "none", border: "none", color: "var(--slate-500)", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
            <L.LogOut size={20} /> Sair da Conta
          </button>
        </div>
      </aside>

      {/* Work area */}
      <main style={{ flex: 1, padding: 16, overflow: "hidden", display: "flex" }}>
        <div style={{ flex: 1, background: "var(--surface-app)", borderRadius: "var(--radius-3xl)", overflowY: "auto", padding: "28px 32px" }} className="work-scroll">
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
          <L.Search size={18} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--slate-400)" }} />
          <input placeholder="Pesquisar..." style={{ background: "#fff", borderRadius: "var(--radius-pill)", padding: "10px 16px 10px 38px", width: 240, border: "none", boxShadow: "var(--shadow-sm)", fontSize: 13, outline: "none" }} />
        </div>
        <div style={{ position: "relative", padding: 11, background: "#fff", borderRadius: "var(--radius-pill)", boxShadow: "var(--shadow-sm)", cursor: "pointer" }}>
          <L.Bell size={18} color="var(--slate-700)" />
          <span style={{ position: "absolute", top: 6, right: 6, width: 16, height: 16, background: "var(--lime-400)", border: "2px solid #fff", borderRadius: "50%", fontSize: 8, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900 }}>2</span>
        </div>
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

})();
(function(){
// Fitness Sincera - Aluno Dashboard ("Routine First" home)
const DS_d = window.FitnessSinceraDesignSystem_06b67f;
const { Card: DCard, Badge: DBadge, RingGauge: DRing, ProgressBar: DBar, Button: DBtn } = DS_d;
const Ld = window.LucideReact;

function NextActivityCard({ meal }) {
  return (
    <DCard radius="var(--radius-3xl)" style={{ height: "100%", display: "flex", flexDirection: "column", boxShadow: "var(--shadow-card)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: 19, fontWeight: 700, color: "var(--slate-800)", margin: 0, textTransform: "none", letterSpacing: 0 }}>Próxima Atividade</h3>
        <div style={{ display: "flex", background: "var(--slate-100)", padding: 4, borderRadius: "var(--radius-md)" }}>
          <span style={{ padding: "6px 14px", borderRadius: "var(--radius-sm)", background: "#fff", boxShadow: "var(--shadow-xs)", fontSize: 12, fontWeight: 800, color: "var(--slate-900)" }}>Refeição</span>
          <span style={{ padding: "6px 14px", fontSize: 12, fontWeight: 800, color: "var(--slate-400)", display: "flex", alignItems: "center", gap: 4 }}>Treino <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--lime-400)" }} /></span>
        </div>
      </div>

      <div style={{ flex: 1, borderRadius: "var(--radius-2xl)", position: "relative", overflow: "hidden", minHeight: 300, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <img src={meal.image} alt={meal.title} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,.92), rgba(0,0,0,.35) 55%, transparent)" }} />
        <div style={{ position: "relative", padding: 18 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 900, color: "#fff", margin: 0, letterSpacing: "-.01em", textTransform: "none" }}>{meal.title}</h2>
            <span style={{ background: "var(--lime-400)", padding: "5px 12px", borderRadius: "var(--radius-pill)", fontSize: 11, fontWeight: 900, color: "#000", fontFamily: "var(--font-mono)" }}>{meal.calories} kcal</span>
          </div>
        </div>
        <div style={{ position: "relative", padding: 18, paddingTop: 0 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
            {meal.items.map((it, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, background: "rgba(255,255,255,.08)", backdropFilter: "blur(6px)", padding: 9, borderRadius: "var(--radius-md)", border: "1px solid rgba(255,255,255,.08)" }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--lime-400)" }} />
                <span style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{it.name}</span>
                <span style={{ marginLeft: "auto", fontSize: 11, color: "rgba(255,255,255,.6)", fontFamily: "var(--font-mono)" }}>{it.qty}</span>
              </div>
            ))}
          </div>
          <DBtn variant="primary" block uppercase icon={<Ld.Check size={16} strokeWidth={3} />}>Check Refeição</DBtn>
        </div>
      </div>
    </DCard>
  );
}

function GoalProgressCard({ goals }) {
  const pct = Math.round((goals.kcalDone / goals.kcalTarget) * 100);
  return (
    <DCard radius="var(--radius-3xl)" style={{ height: "100%", display: "flex", flexDirection: "column", boxShadow: "var(--shadow-card)" }}>
      <h3 style={{ fontFamily: "var(--font-display)", fontSize: 19, fontWeight: 700, color: "var(--slate-800)", margin: "0 0 4px", textTransform: "none", letterSpacing: 0 }}>Meta de Hoje</h3>
      <p style={{ fontSize: 12, color: "var(--slate-400)", margin: "0 0 18px" }}>Consumo calórico diário</p>
      <div style={{ display: "flex", justifyContent: "center", margin: "8px 0 22px" }}>
        <DRing value={pct} valueText={goals.kcalDone} label="de 1580 kcal" tone="lime" size={170} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <Macro label="Proteína" val={goals.protein.val} max={goals.protein.max} tone="purple" />
        <Macro label="Carboidrato" val={goals.carbs.val} max={goals.carbs.max} tone="lime" />
        <Macro label="Gordura" val={goals.fat.val} max={goals.fat.max} tone="green" />
      </div>
    </DCard>
  );
}

function Macro({ label, val, max, tone }) {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 6 }}>
        <span style={{ color: "var(--slate-500)", fontWeight: 600 }}>{label}</span>
        <span style={{ color: "var(--slate-800)", fontWeight: 800 }}>{val}<span style={{ color: "var(--slate-300)", fontWeight: 500 }}> / {max}g</span></span>
      </div>
      <DBar value={(val / max) * 100} tone={tone} height={7} />
    </div>
  );
}

function MiniCard({ icon, title, value, unit, foot, tone }) {
  const Ic = icon;
  return (
    <DCard radius="var(--radius-2xl)" pad={false} style={{ padding: 22, height: "100%", boxShadow: "var(--shadow-card)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
        <div style={{ width: 38, height: 38, borderRadius: "var(--radius-md)", background: tone, display: "flex", alignItems: "center", justifyContent: "center" }}><Ic size={18} color={tone === "var(--lime-400)" ? "#000" : "#fff"} /></div>
        <Ld.MoreHorizontal size={18} color="var(--slate-300)" />
      </div>
      <p style={{ fontSize: 12, color: "var(--slate-400)", fontWeight: 600, margin: "0 0 4px" }}>{title}</p>
      <p style={{ margin: 0 }}><span style={{ fontSize: 30, fontWeight: 900, color: "var(--slate-900)", fontFamily: "var(--font-display)" }}>{value}</span><span style={{ fontSize: 13, color: "var(--slate-400)", fontWeight: 700, marginLeft: 4, fontFamily: "var(--font-mono)" }}>{unit}</span></p>
      <p style={{ fontSize: 11, color: "var(--slate-400)", margin: "8px 0 0" }}>{foot}</p>
    </DCard>
  );
}

function AlunoDashboard({ user, meals, goals }) {
  return (
    <>
      <WorkHeader user={user} />
      <window.PageHeader
        eyebrow="Painel do aluno · 12 Julho 2024"
        title="Visão Geral de Saúde"
        subtitle="Tome o controlo da sua saúde hoje."
        right={
          <button style={{ background: "#fff", padding: "10px 18px", borderRadius: "var(--radius-lg)", border: "1px solid var(--slate-100)", boxShadow: "var(--shadow-sm)", fontSize: 13, fontWeight: 700, display: "inline-flex", alignItems: "center", gap: 8, cursor: "pointer" }}>Hoje <Ld.ChevronDown size={14} color="var(--slate-400)" /></button>
        }
      />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 18 }}>
        <div style={{ gridColumn: "span 5" }}><NextActivityCard meal={meals[0]} /></div>
        <div style={{ gridColumn: "span 4" }}><GoalProgressCard goals={goals} /></div>
        <div style={{ gridColumn: "span 3", display: "flex", flexDirection: "column", gap: 18 }}>
          <MiniCard icon={Ld.Droplets} title="Hidratação" value="1.8" unit="L" foot="Meta: 3L · 60%" tone="var(--green-400)" />
          <MiniCard icon={Ld.Flame} title="Energia" value="1,847" unit="kcal" foot="Hoje · +12% vs. ontem" tone="var(--lime-400)" />
        </div>
      </div>
    </>
  );
}

window.AlunoDashboard = AlunoDashboard;

})();
(function(){
// Fitness Sincera - Nutrição screen with Apple-Watch-style meal scroll wheel
const { useState: useStateN, useRef: useRefN, useEffect: useEffectN, useCallback: useCbN } = React;
const DSn = window.FitnessSinceraDesignSystem_06b67f;
const { Button: NBtn, Badge: NBadge, Card: NCard, ProgressBar: NBar } = DSn;
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
function MealScrollWheel({ meals, completed, onToggle }) {
  const scrollRef = useRefN(null);
  const itemRefs = useRefN([]);
  const [activeIndex, setActiveIndex] = useStateN(0);

  const handleScroll = useCbN(() => {
    const el = scrollRef.current;
    if (!el) return;
    const top = el.scrollTop;
    let closest = 0, min = Infinity;
    itemRefs.current.forEach((ref, i) => {
      if (!ref) return;
      const d = Math.abs(ref.offsetTop - top);
      if (d < min) { min = d; closest = i; }
    });
    setActiveIndex(closest);
  }, []);

  useEffectN(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const fade = (dir) => ({
    position: "absolute", insetInline: 0, [dir]: 0, zIndex: 10, pointerEvents: "none",
    height: dir === "top" ? 70 : 90,
    background: `linear-gradient(to ${dir === "top" ? "bottom" : "top"}, var(--surface-app) 0%, var(--surface-app) 22%, rgba(233,233,233,0) 100%)`,
  });

  return (
    <div style={{ position: "relative", overflow: "hidden", borderRadius: 24 }}>
      <div style={fade("top")} />
      <div style={fade("bottom")} />

      {/* Position rail */}
      <div style={{ position: "absolute", right: 2, top: "50%", transform: "translateY(-50%)", zIndex: 20, display: "flex", flexDirection: "column", gap: 6, pointerEvents: "none" }}>
        {meals.map((_, i) => (
          <div key={i} style={{ width: 3, borderRadius: 999, transition: "all .3s", height: i === activeIndex ? 16 : 3, background: i === activeIndex ? "var(--lime-400)" : "var(--slate-300)" }} />
        ))}
      </div>

      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="wheel-scroll"
        style={{ height: "min(520px, 64vh)", overflowY: "scroll", scrollSnapType: "y mandatory", paddingRight: 14 }}
      >
        <div style={{ height: 4 }} />
        {meals.map((meal, index) => {
          const dist = Math.abs(index - activeIndex);
          return (
            <div key={meal.id} ref={(el) => (itemRefs.current[index] = el)} style={{ scrollSnapAlign: "start" }}>
              <div style={{
                opacity: dist === 0 ? 1 : dist === 1 ? 0.55 : 0.22,
                transform: `scale(${dist === 0 ? 1 : dist === 1 ? 0.97 : 0.93})`,
                transformOrigin: "top center",
                transition: "opacity .3s ease, transform .3s ease",
                paddingBottom: 12,
              }}>
                <MealBlock meal={meal} isCompleted={completed.has(meal.id)} onToggle={() => onToggle(meal.id)} defaultOpen={index === activeIndex} />
              </div>
            </div>
          );
        })}
        <div style={{ height: 360 }} />
      </div>
    </div>
  );
}

// ── A single editable meal block with AI suggestions ──────────────────────────
function MealBlock({ meal, isCompleted, onToggle, defaultOpen }) {
  const [open, setOpen] = useStateN(defaultOpen);
  const [showAI, setShowAI] = useStateN(false);
  const [loadingAI, setLoadingAI] = useStateN(false);
  const [picked, setPicked] = useStateN(null);
  const Icon = mealIcon(meal.title);

  useEffectN(() => { setOpen(defaultOpen); }, [defaultOpen]);

  const askAI = () => {
    setShowAI(true); setLoadingAI(true);
    setTimeout(() => setLoadingAI(false), 900);
  };

  return (
    <div style={{ background: isCompleted ? "var(--surface-tint-lime)" : "#fff", borderRadius: "var(--radius-xl)", boxShadow: "var(--shadow-sm)", overflow: "hidden", border: `1px solid ${isCompleted ? "rgba(212,245,76,.4)" : "transparent"}` }}>
      {/* header */}
      <button onClick={() => setOpen(v => !v)} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", background: "none", border: "none", textAlign: "left", cursor: "pointer" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 44, height: 44, borderRadius: "var(--radius-lg)", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: isCompleted ? "var(--lime-400)" : "var(--slate-100)" }}>
            {isCompleted ? <Ln.Check size={18} color="#000" strokeWidth={3} /> : <Icon size={18} color="var(--slate-500)" />}
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
              <span className="fs-mono" style={{ fontSize: 10, fontWeight: 900, color: "var(--slate-400)", textTransform: "uppercase", letterSpacing: ".12em" }}>{meal.time}</span>
              {meal.type === "snack" && <NBadge tone="neutral">Lanche</NBadge>}
              {isCompleted && <NBadge tone="green">Concluído</NBadge>}
            </div>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: isCompleted ? "var(--slate-400)" : "var(--slate-900)", textDecoration: isCompleted ? "line-through" : "none" }}>{meal.title}</h3>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ textAlign: "right" }}>
            <span style={{ fontSize: 18, fontWeight: 900, color: "var(--slate-900)", fontFamily: "var(--font-display)" }}>{meal.calories}</span>
            <span style={{ fontSize: 10, fontWeight: 700, color: "var(--slate-400)", marginLeft: 3, fontFamily: "var(--font-mono)" }}>kcal</span>
          </div>
          {open ? <Ln.ChevronUp size={16} color="var(--slate-400)" /> : <Ln.ChevronDown size={16} color="var(--slate-400)" />}
        </div>
      </button>

      {open && (
        <div style={{ padding: "0 20px 20px", borderTop: "1px solid var(--slate-100)" }}>
          <ul style={{ listStyle: "none", margin: "16px 0 0", padding: 0 }}>
            {meal.items.map((it, i) => (
              <li key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: i < meal.items.length - 1 ? "1px solid var(--slate-50)" : "none", gap: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", flexShrink: 0, background: isCompleted ? "var(--slate-200)" : "var(--lime-400)" }} />
                  <span style={{ fontSize: 14, fontWeight: 500, color: isCompleted ? "var(--slate-400)" : "var(--slate-800)", textDecoration: isCompleted ? "line-through" : "none" }}>{it.name}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
                  <span style={{ fontSize: 12, color: "var(--slate-400)", fontWeight: 500 }}>{it.qty}</span>
                  <span className="fs-mono" style={{ fontSize: 12, fontWeight: 800, color: "var(--slate-600)", width: 56, textAlign: "right" }}>{it.kcal} kcal</span>
                </div>
              </li>
            ))}
          </ul>

          {/* AI suggestion panel */}
          {showAI && (
            <div style={{ marginTop: 14, background: "var(--surface-tint-lime)", border: "1px solid rgba(212,245,76,.5)", borderRadius: "var(--radius-lg)", padding: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <Ln.Sparkles size={15} color="var(--lime-ink)" />
                <span style={{ fontSize: 12, fontWeight: 900, color: "var(--lime-ink)", textTransform: "uppercase", letterSpacing: ".06em" }}>Sugestões da IA</span>
                <span style={{ fontSize: 10, color: "var(--slate-400)", marginLeft: "auto" }}>equivalentes à sua dieta</span>
              </div>
              {loadingAI ? (
                <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--slate-400)", fontSize: 13, padding: "8px 2px" }}>
                  <Ln.Loader2 size={15} className="spin" /> Analisando os seus macros
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {meal.ai.map((opt, i) => (
                    <button key={i} onClick={() => setPicked(opt)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "11px 14px", borderRadius: "var(--radius-md)", cursor: "pointer", textAlign: "left", background: picked === opt ? "var(--lime-400)" : "#fff", border: `1px solid ${picked === opt ? "var(--lime-500)" : "var(--slate-100)"}`, transition: "all .2s" }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: picked === opt ? "#000" : "var(--slate-700)" }}>{opt}</span>
                      {picked === opt ? <Ln.Check size={15} color="#000" strokeWidth={3} /> : <Ln.ArrowRight size={14} color="var(--slate-300)" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          <div style={{ marginTop: 18, display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 16, borderTop: "1px solid var(--slate-50)", gap: 12, flexWrap: "wrap" }}>
            <div style={{ display: "flex", gap: 8 }}>
              <NBadge tone="protein">P {meal.macros.p}g</NBadge>
              <NBadge tone="carbs">C {meal.macros.c}g</NBadge>
              <NBadge tone="fat">G {meal.macros.g}g</NBadge>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {!isCompleted && (
                <NBtn variant={showAI ? "purple" : "outline"} size="sm" icon={<Ln.Sparkles size={13} />} onClick={askAI}>
                  Sugerir com IA
                </NBtn>
              )}
              <NBtn variant={isCompleted ? "outline" : "primary"} size="sm" icon={isCompleted ? null : <Ln.Check size={13} strokeWidth={3} />} onClick={onToggle}>
                {isCompleted ? "Desmarcar" : "Confirmar"}
              </NBtn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function NutricaoScreen({ user, meals }) {
  const [completed, setCompleted] = useStateN(new Set());
  const toggle = (id) => setCompleted(prev => {
    const next = new Set(prev);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  });
  const done = meals.filter(m => completed.has(m.id)).length;
  const pct = Math.round((done / meals.length) * 100);

  return (
    <>
      <WorkHeader user={user} />
      <window.PageHeader
        eyebrow="Plano alimentar"
        title="Nutrição"
        subtitle="Role para ver as próximas refeições do seu dia."
        right={
          <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#fff", padding: "10px 16px", borderRadius: 16, boxShadow: "var(--shadow-sm)", border: "1px solid var(--slate-100)" }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--green-400)" }} />
            <span style={{ fontSize: 12, fontWeight: 800, color: "var(--slate-700)" }}>Plano Ativo</span>
            <span style={{ fontSize: 10, color: "var(--slate-400)", fontWeight: 500 }}>· Dra. Sofia Almeida</span>
          </div>
        }
      />

      {/* progress */}
      <NCard radius="var(--radius-xl)" pad={false} style={{ padding: 20, marginBottom: 20, boxShadow: "var(--shadow-sm)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
          <span style={{ fontSize: 14, fontWeight: 800, color: "var(--slate-700)" }}>Progresso do dia</span>
          <span style={{ fontSize: 12, fontWeight: 900, color: "var(--slate-900)", fontFamily: "var(--font-mono)" }}>{done}/{meals.length} refeições</span>
        </div>
        <NBar value={pct} tone="lime" />
      </NCard>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, paddingInline: 4 }}>
        <h2 style={{ fontSize: 18, fontWeight: 800, color: "var(--slate-800)", margin: 0 }}>Plano Alimentar · Hoje</h2>
        <span className="fs-eyebrow">deslize para navegar</span>
      </div>

      <MealScrollWheel meals={meals} completed={completed} onToggle={toggle} />
    </>
  );
}

window.NutricaoScreen = NutricaoScreen;

})();

(function(){
  const { useState } = React;
  const LF = window.LucideReact;
  function App() {
    const [screen, setScreen] = useState("dashboard");
    const [toast, setToast] = useState(false);
    const { user, meals, goals } = window.ALUNO;
    const camera = () => { setToast(true); setTimeout(() => setToast(false), 2600); };
    return (
      <>
        <window.AppShell active={screen} onNav={setScreen}>
          {screen === "nutricao"
            ? <window.NutricaoScreen user={user} meals={meals} />
            : <window.AlunoDashboard user={user} meals={meals} goals={goals} />}
        </window.AppShell>
        <div className="fab" onClick={camera} title="Identificar refeição com IA">
          <LF.Camera size={24} color="#000" strokeWidth={3} />
        </div>
        <div className={"toast" + (toast ? " show" : "")}>
          <LF.Sparkles size={16} /> Refeição identificada: Frango Grelhado · 350 kcal
        </div>
      </>
    );
  }
  if (!customElements.get('aluno-kit')) {
    customElements.define('aluno-kit', class extends HTMLElement {
      connectedCallback(){ if(this._m) return; this._m=1; window.ReactDOM.createRoot(this).render(React.createElement(App)); }
    });
  }
})();
