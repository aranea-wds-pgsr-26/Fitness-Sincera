// Fitness Sincera - Aluno Dashboard ("Routine First" home)
const DS_d = window.FitnessSinceraDesignSystem_06b67f;
const { Card: DCard, Badge: DBadge, RingGauge: DRing, ProgressBar: DBar, Button: DBtn, IconTile: DTile } = DS_d;
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
        <DTile tone={tone} size={38} radius="var(--radius-md)"><Ic size={18} /></DTile>
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
    <div style={{ maxWidth: 1240, margin: "0 auto" }}>
      <WorkHeader user={user} />
      <window.PageHeader
        eyebrow="Painel do aluno · 12 Julho 2024"
        title="Visão Geral de Saúde"
        subtitle="Tome o controlo da sua saúde hoje."
        right={
          <button style={{ background: "#fff", padding: "10px 18px", borderRadius: "var(--radius-lg)", border: "1px solid var(--slate-100)", boxShadow: "var(--shadow-sm)", fontSize: 13, fontWeight: 700, display: "inline-flex", alignItems: "center", gap: 8, cursor: "pointer" }}>Hoje <Ld.ChevronDown size={14} color="var(--slate-400)" /></button>
        }
      />

      <div className="fs-dash-grid" style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 18 }}>
        <div className="fs-dash-col" style={{ gridColumn: "span 5" }}><NextActivityCard meal={meals[0]} /></div>
        <div className="fs-dash-col" style={{ gridColumn: "span 4" }}><GoalProgressCard goals={goals} /></div>
        <div className="fs-dash-col" style={{ gridColumn: "span 3", display: "flex", flexDirection: "column", gap: 18 }}>
          <MiniCard icon={Ld.Droplets} title="Hidratação" value="1.8" unit="L" foot="Meta: 3L · 60%" tone="green" />
          <MiniCard icon={Ld.Flame} title="Energia" value="1,847" unit="kcal" foot="Hoje · +12% vs. ontem" tone="lime" />
        </div>
      </div>
    </div>
  );
}

window.AlunoDashboard = AlunoDashboard;
