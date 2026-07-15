import React, { useState, useRef } from "react";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from "@dnd-kit/core";
import {
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable,
    arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
    GripVertical, Plus, Trash2, ChevronDown, ChevronUp,
    Coffee, Sun, Utensils, Apple, Moon, Zap,
} from "lucide-react";
import type { MealPlan, MealPlanBlock, MealPlanItem } from "@shared/schema";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function uid() {
    return Math.random().toString(36).slice(2, 9);
}

function blockIcon(type: MealPlanBlock["type"], title: string) {
    if (title.includes("Manhã") || title.includes("Café")) return Coffee;
    if (title.includes("Almoço")) return Utensils;
    if (title.includes("Lanche")) return Apple;
    if (title.includes("Pré") || title.includes("Treino")) return Zap;
    if (title.includes("Jantar") || title.includes("Ceia")) return Moon;
    return Sun;
}

function sumMacros(items: MealPlanItem[]) {
    return items.reduce(
        (acc, it) => ({
            cal: acc.cal + it.calories,
            prot: acc.prot + it.protein,
            carbs: acc.carbs + it.carbs,
            fat: acc.fat + it.fat,
        }),
        { cal: 0, prot: 0, carbs: 0, fat: 0 }
    );
}

// ─── MacroBar ─────────────────────────────────────────────────────────────────

function MacroPill({ label, val, color }: { label: string; val: number; color: string }) {
    return (
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${color}`}>
            {label} <span className="font-black">{Math.round(val)}g</span>
        </span>
    );
}

// ─── Editable Item Row ────────────────────────────────────────────────────────

interface ItemRowProps {
    item: MealPlanItem;
    onChange: (updated: MealPlanItem) => void;
    onRemove: () => void;
}

function ItemRow({ item, onChange, onRemove }: ItemRowProps) {
    function field<K extends keyof MealPlanItem>(key: K, raw: string) {
        const val = key === "name" || key === "quantity" || key === "notes"
            ? raw
            : parseFloat(raw) || 0;
        onChange({ ...item, [key]: val });
    }

    return (
        <div className="group flex items-center gap-2 py-1.5 px-3 rounded-lg hover:bg-black/5 transition-colors">
            {/* Bullet */}
            <span className="w-1.5 h-1.5 rounded-full bg-slate-300 flex-shrink-0 mt-0.5" />

            {/* Name */}
            <input
                value={item.name}
                onChange={e => field("name", e.target.value)}
                placeholder="Alimento…"
                className="flex-1 min-w-0 bg-transparent text-sm text-slate-700 font-medium focus:outline-none placeholder:text-slate-300"
            />

            {/* Quantity */}
            <input
                value={item.quantity}
                onChange={e => field("quantity", e.target.value)}
                placeholder="qtd"
                className="w-20 bg-transparent text-xs text-slate-400 text-right focus:outline-none focus:text-slate-700 placeholder:text-slate-300"
            />

            {/* Macros inline */}
            <div className="hidden sm:flex items-center gap-1 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
                {(["calories", "protein", "carbs", "fat"] as const).map((k, i) => (
                    <div key={k} className="flex items-center">
                        <span className="text-[9px] text-slate-400 mr-0.5">
                            {["kcal", "P", "C", "G"][i]}
                        </span>
                        <input
                            value={item[k]}
                            onChange={e => field(k, e.target.value)}
                            type="number"
                            className="w-10 text-[10px] text-slate-500 bg-slate-100 rounded px-1 py-0.5 focus:outline-none focus:bg-slate-200 text-center"
                        />
                    </div>
                ))}
            </div>

            {/* Delete */}
            <button
                onClick={onRemove}
                className="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-red-400 transition-all ml-1"
            >
                <Trash2 className="w-3.5 h-3.5" />
            </button>
        </div>
    );
}

// ─── Sortable Block Card ──────────────────────────────────────────────────────

interface BlockCardProps {
    block: MealPlanBlock;
    onChange: (updated: MealPlanBlock) => void;
    onRemove: () => void;
}

function SortableBlockCard({ block, onChange, onRemove }: BlockCardProps) {
    const [collapsed, setCollapsed] = useState(false);
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
        useSortable({ id: block.id });

    const style: React.CSSProperties = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        zIndex: isDragging ? 50 : "auto",
    };

    const totals = sumMacros(block.items);
    const Icon = blockIcon(block.type, block.title);

    function addItem() {
        const newItem: MealPlanItem = { id: uid(), name: "", quantity: "", calories: 0, protein: 0, carbs: 0, fat: 0 };
        onChange({ ...block, items: [...block.items, newItem] });
    }

    function updateItem(id: string, updated: MealPlanItem) {
        onChange({ ...block, items: block.items.map(i => i.id === id ? updated : i) });
    }

    function removeItem(id: string) {
        onChange({ ...block, items: block.items.filter(i => i.id !== id) });
    }

    return (
        <div ref={setNodeRef} style={style} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden mb-3">
            {/* Block header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-50">
                {/* Drag handle */}
                <button
                    {...attributes}
                    {...listeners}
                    className="text-slate-300 hover:text-slate-500 cursor-grab active:cursor-grabbing transition-colors touch-none"
                >
                    <GripVertical className="w-4 h-4" />
                </button>

                {/* Icon */}
                <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-slate-500" />
                </div>

                {/* Title */}
                <input
                    value={block.title}
                    onChange={e => onChange({ ...block, title: e.target.value })}
                    className="flex-1 font-bold text-slate-800 text-sm bg-transparent focus:outline-none min-w-0"
                />

                {/* Time */}
                <input
                    value={block.time}
                    onChange={e => onChange({ ...block, time: e.target.value })}
                    className="w-16 text-xs text-slate-400 text-right bg-transparent focus:outline-none focus:text-slate-600 font-mono"
                />

                {/* Collapse */}
                <button onClick={() => setCollapsed(c => !c)} className="text-slate-300 hover:text-slate-500 transition-colors">
                    {collapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
                </button>

                {/* Delete block */}
                <button onClick={onRemove} className="text-slate-200 hover:text-red-400 transition-colors">
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>

            {!collapsed && (
                <>
                    {/* Items */}
                    <div className="py-1">
                        {block.items.map(item => (
                            <ItemRow
                                key={item.id}
                                item={item}
                                onChange={updated => updateItem(item.id, updated)}
                                onRemove={() => removeItem(item.id)}
                            />
                        ))}

                        {/* Add item */}
                        <button
                            onClick={addItem}
                            className="w-full text-left flex items-center gap-2 px-3 py-2 text-xs text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors rounded-b-xl"
                        >
                            <Plus className="w-3.5 h-3.5" />
                            Adicionar alimento
                        </button>
                    </div>

                    {/* Block footer: subtotals */}
                    <div className="border-t border-slate-50 px-4 py-2 flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider mr-1">Subtotal</span>
                        <span className="text-[10px] font-black text-slate-600">{Math.round(totals.cal)} kcal</span>
                        <MacroPill label="P" val={totals.prot} color="bg-blue-50 text-blue-500" />
                        <MacroPill label="C" val={totals.carbs} color="bg-amber-50 text-amber-500" />
                        <MacroPill label="G" val={totals.fat} color="bg-rose-50 text-rose-500" />
                    </div>
                </>
            )}
        </div>
    );
}

// ─── Main Editor ──────────────────────────────────────────────────────────────

interface MealPlanEditorProps {
    plan: MealPlan;
    onChange: (updated: MealPlan) => void;
}

export function MealPlanEditor({ plan, onChange }: MealPlanEditorProps) {
    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    const totals = plan.blocks.reduce(
        (acc, b) => {
            const s = sumMacros(b.items);
            return { cal: acc.cal + s.cal, prot: acc.prot + s.prot, carbs: acc.carbs + s.carbs, fat: acc.fat + s.fat };
        },
        { cal: 0, prot: 0, carbs: 0, fat: 0 }
    );

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;
        if (!over || active.id === over.id) return;
        const oldIndex = plan.blocks.findIndex(b => b.id === active.id);
        const newIndex = plan.blocks.findIndex(b => b.id === over.id);
        onChange({ ...plan, blocks: arrayMove(plan.blocks, oldIndex, newIndex) });
    }

    function addBlock() {
        const newBlock: MealPlanBlock = {
            id: uid(),
            time: "08:00",
            title: "Nova Refeição",
            type: "meal",
            items: [],
        };
        onChange({ ...plan, blocks: [...plan.blocks, newBlock] });
    }

    function updateBlock(id: string, updated: MealPlanBlock) {
        onChange({ ...plan, blocks: plan.blocks.map(b => b.id === id ? updated : b) });
    }

    function removeBlock(id: string) {
        onChange({ ...plan, blocks: plan.blocks.filter(b => b.id !== id) });
    }

    return (
        <div className="max-w-3xl mx-auto px-6 py-6">
            {/* Plan name (editable) */}
            <input
                value={plan.name}
                onChange={e => onChange({ ...plan, name: e.target.value })}
                className="w-full text-3xl font-black text-slate-800 bg-transparent focus:outline-none mb-1 placeholder:text-slate-300"
                placeholder="Nome do plano…"
            />
            <p className="text-slate-400 text-sm mb-6">
                Clique em qualquer campo para editar. Arraste os blocos para reordenar.
            </p>

            {/* ── Daily totals bar ─────────────────────────────── */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 mb-6 flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                    <div className="w-8 h-8 bg-[#d4f54c] rounded-lg flex items-center justify-center flex-shrink-0">
                        <Zap className="w-4 h-4 text-black fill-black" />
                    </div>
                    <div>
                        <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Total Diário</p>
                        <p className="text-xl font-black text-slate-800">{Math.round(totals.cal)} <span className="text-sm font-normal text-slate-400">kcal</span></p>
                    </div>
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                    {[
                        { label: "Proteína", val: totals.prot, unit: "g", color: "text-blue-600", bg: "bg-blue-50" },
                        { label: "Carboidratos", val: totals.carbs, unit: "g", color: "text-amber-600", bg: "bg-amber-50" },
                        { label: "Gordura", val: totals.fat, unit: "g", color: "text-rose-600", bg: "bg-rose-50" },
                    ].map(m => (
                        <div key={m.label} className={`${m.bg} rounded-xl px-3 py-2 text-center`}>
                            <p className="text-[9px] text-slate-400 font-medium uppercase tracking-wider">{m.label}</p>
                            <p className={`text-sm font-black ${m.color}`}>{Math.round(m.val)}{m.unit}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Blocks ───────────────────────────────────────── */}
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={plan.blocks.map(b => b.id)} strategy={verticalListSortingStrategy}>
                    {plan.blocks.map(block => (
                        <SortableBlockCard
                            key={block.id}
                            block={block}
                            onChange={updated => updateBlock(block.id, updated)}
                            onRemove={() => removeBlock(block.id)}
                        />
                    ))}
                </SortableContext>
            </DndContext>

            {/* Add block button */}
            <button
                onClick={addBlock}
                className="w-full border-2 border-dashed border-slate-200 text-slate-400 hover:border-slate-300 hover:text-slate-600
                   text-sm font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-colors mt-2"
            >
                <Plus className="w-4 h-4" />
                Adicionar Refeição
            </button>
        </div>
    );
}
