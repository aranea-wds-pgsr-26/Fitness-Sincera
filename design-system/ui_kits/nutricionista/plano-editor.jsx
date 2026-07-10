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
      <input value={item.name} onChange={e => field("name", e.target.value)} placeholder="Alimento" aria-label="Nome do alimento"
        style={{ flex: 1, minWidth: 0, border: "none", background: "transparent", fontSize: 14, fontWeight: 500, color: "var(--slate-700)" }} />
      <input value={item.qty} onChange={e => field("qty", e.target.value)} placeholder="qtd" aria-label="Quantidade"
        style={{ width: 64, border: "none", background: "transparent", fontSize: 12, color: "var(--slate-400)", textAlign: "right" }} />
      <div className="item-macros" style={{ display: "flex", gap: 4 }}>
        {[["kcal","kcal","kcal"],["p","P","Prote\u00edna"],["c","C","Carboidrato"],["g","G","Gordura"]].map(([k, short, full]) => (
          <span key={k} style={{ display: "flex", alignItems: "center" }}>
            <span aria-hidden="true" style={{ fontSize: 9, color: "var(--slate-400)", marginRight: 2 }}>{short}</span>
            <input value={item[k]} onChange={e => field(k, e.target.value)} type="number" aria-label={full}
              style={{ width: 38, fontSize: 10, color: "var(--slate-500)", background: "var(--slate-100)", borderRadius: 5, border: "none", padding: "3px 4px", textAlign: "center" }} />
          </span>
        ))}
      </div>
      <button className="item-del" onClick={onRemove} aria-label="Remover alimento" style={{ background: "none", border: "none", color: "var(--slate-400)", cursor: "pointer", padding: 10, margin: -10, display: "flex", alignItems: "center" }}><Le.Trash2 size={14} /></button>
    </div>
  );
}

// ── Sortable block card ───────────────────────────────────────────────────────
function BlockCard({ block, onChange, onRemove, dragHandlers, dragging, flashItem, onMoveUp, onMoveDown, canMoveUp, canMoveDown }) {
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
        <span className="drag-handle" style={{ color: "var(--slate-300)", cursor: "grab", display: "none" }}><Le.GripVertical size={16} /></span>
        <span style={{ display: "flex", flexDirection: "column" }}>
          <button onClick={onMoveUp} disabled={!canMoveUp} aria-label="Mover refeição para cima" style={{ background: "none", border: "none", padding: 4, cursor: canMoveUp ? "pointer" : "default", color: canMoveUp ? "var(--slate-500)" : "var(--slate-200)", display: "flex" }}><Le.ChevronUp size={14} /></button>
          <button onClick={onMoveDown} disabled={!canMoveDown} aria-label="Mover refeição para baixo" style={{ background: "none", border: "none", padding: 4, cursor: canMoveDown ? "pointer" : "default", color: canMoveDown ? "var(--slate-500)" : "var(--slate-200)", display: "flex" }}><Le.ChevronDown size={14} /></button>
        </span>
        <ETile tone="slate" size={32} radius="10px"><Icon size={16} /></ETile>
        <input value={block.title} onChange={e => onChange({ ...block, title: e.target.value })} aria-label="Nome da refeição"
          style={{ flex: 1, minWidth: 0, border: "none", background: "transparent", fontSize: 14, fontWeight: 800, color: "var(--slate-800)" }} />
        <input value={block.time} onChange={e => onChange({ ...block, time: e.target.value })} aria-label="Horário da refeição"
          className="fs-mono" style={{ width: 56, border: "none", background: "transparent", fontSize: 12, color: "var(--slate-400)", textAlign: "right" }} />
        <button onClick={() => setCollapsed(c => !c)} aria-label={collapsed ? "Expandir refeição" : "Recolher refeição"} style={{ background: "none", border: "none", color: "var(--slate-500)", cursor: "pointer", padding: 10, margin: -10 }}>{collapsed ? <Le.ChevronDown size={16} /> : <Le.ChevronUp size={16} />}</button>
        <button onClick={onRemove} aria-label="Remover refeição" style={{ background: "none", border: "none", color: "var(--slate-400)", cursor: "pointer", padding: 10, margin: -10 }}><Le.Trash2 size={16} /></button>
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

  // Touch-friendly alternative to drag-and-drop reordering.
  const moveBlock = (from, to) => {
    if (to < 0 || to >= plan.blocks.length) return;
    setPlan(p => {
      const blocks = [...p.blocks];
      const [moved] = blocks.splice(from, 1);
      blocks.splice(to, 0, moved);
      return { ...p, blocks };
    });
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
        <input value={plan.name} onChange={e => setPlan(p => ({ ...p, name: e.target.value }))} aria-label="Nome do plano"
          style={{ flex: 1, fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 900, color: "var(--slate-800)", border: "none", background: "transparent", letterSpacing: "-.01em" }} />
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
          canMoveUp={i > 0}
          canMoveDown={i < plan.blocks.length - 1}
          onMoveUp={() => moveBlock(i, i - 1)}
          onMoveDown={() => moveBlock(i, i + 1)}
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
