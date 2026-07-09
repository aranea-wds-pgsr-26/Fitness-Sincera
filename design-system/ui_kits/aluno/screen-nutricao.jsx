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
    height: dir === "top" ? 18 : 80,
    background: `linear-gradient(to ${dir === "top" ? "bottom" : "top"}, rgba(245,245,245,0.72) 0%, rgba(255,255,255,0) 100%)`,
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
                paddingBottom: 18,
              }}>
                <MealBlock meal={meal} isCompleted={completed.has(meal.id)} onToggle={() => onToggle(meal.id)} defaultOpen={index === activeIndex} isActive={dist === 0} />
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
function MealBlock({ meal, isCompleted, onToggle, defaultOpen, isActive }) {
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
    <div style={{ background: isCompleted ? "var(--surface-tint-lime)" : "#fff", borderRadius: "var(--radius-xl)", boxShadow: isActive ? "var(--shadow-lg)" : "var(--shadow-sm)", overflow: "hidden", border: `1.5px solid ${isCompleted ? "rgba(212,245,76,.5)" : isActive ? "var(--lime-400)" : "var(--slate-100)"}`, transition: "box-shadow .3s ease, border-color .3s ease" }}>
      {/* header */}
      <button onClick={() => setOpen(v => !v)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 14, padding: "16px 20px", background: "none", border: "none", textAlign: "left", cursor: "pointer" }}>
        <div style={{ width: 44, height: 44, borderRadius: "var(--radius-lg)", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: isCompleted ? "var(--lime-400)" : "var(--slate-100)" }}>
          {isCompleted ? <Ln.Check size={18} color="#000" strokeWidth={3} /> : <Icon size={18} color="var(--slate-500)" />}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
            <span className="fs-mono" style={{ fontSize: 10, fontWeight: 900, color: "var(--slate-400)", textTransform: "uppercase", letterSpacing: ".12em" }}>{meal.time}</span>
            {meal.type === "snack" && <NBadge tone="neutral">Lanche</NBadge>}
            {isCompleted && <NBadge tone="green">Concluído</NBadge>}
          </div>
          <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, lineHeight: 1.2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", color: isCompleted ? "var(--slate-400)" : "var(--slate-900)", textDecoration: isCompleted ? "line-through" : "none" }}>{meal.title}</h3>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", lineHeight: 1 }}>
            <span style={{ fontSize: 17, fontWeight: 800, color: "var(--slate-900)", fontFamily: "var(--font-display)" }}>{meal.calories}</span>
            <span className="fs-mono" style={{ fontSize: 9, fontWeight: 700, color: "var(--slate-400)", letterSpacing: ".08em", marginTop: 2 }}>KCAL</span>
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
