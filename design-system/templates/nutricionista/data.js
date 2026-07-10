// Fitness Sincera - Nutricionista mock data
window.NUTRI = window.NUTRI || {};

window.NUTRI.pro = { name: "Dra. Sofia Almeida", role: "Nutricionista", crn: "CRN-3 12345" };

window.NUTRI.stats = { total: 24, active: 18, atRisk: 3, compliance: 74 };

window.NUTRI.alerts = [
  { id: "1", initials: "CS", dark: true, type: "risk", title: "Meta calórica não atingida", message: "Cátia Silva está 35% abaixo da meta calórica diária há 3 dias.", time: "há 1 dia" },
  { id: "2", initials: "AN", dark: false, type: "ok", title: "Plano alimentar atualizado", message: "Adriana Nobre recebeu o novo plano de emagrecimento - Fase 2.", time: "há 2 dias" },
  { id: "3", initials: "RG", dark: false, type: "risk", title: "Hidratação baixa", message: "Rita Gomes registou menos de 1L de água por 4 dias consecutivos.", time: "há 3 dias" },
];

window.NUTRI.clients = [
  { id: "c1", name: "Cátia Silva", goal: "Emagrecimento", status: "risk", compliance: 52, initials: "CS", dark: true },
  { id: "c2", name: "Adriana Nobre", goal: "Hipertrofia", status: "active", compliance: 91, initials: "AN" },
  { id: "c3", name: "Rita Gomes", goal: "Manutenção", status: "risk", compliance: 61, initials: "RG" },
  { id: "c4", name: "João Pereira", goal: "Performance", status: "active", compliance: 88, initials: "JP" },
  { id: "c5", name: "Marta Dias", goal: "Emagrecimento", status: "paused", compliance: 40, initials: "MD" },
];

// The Notion-like meal plan being edited (for Cátia Silva)
window.NUTRI.plan = {
  name: "Plano de Emagrecimento - Fase 2",
  client: "Cátia Silva",
  blocks: [
    {
      id: "b1", time: "07:30", title: "Café da Manhã", icon: "Coffee",
      items: [
        { id: "i1", name: "Ovos mexidos", qty: "3 un", kcal: 210, p: 18, c: 2, g: 14 },
        { id: "i2", name: "Pão integral", qty: "1 fatia", kcal: 80, p: 4, c: 14, g: 1 },
        { id: "i3", name: "Café preto", qty: "200ml", kcal: 5, p: 0, c: 1, g: 0 },
      ],
    },
    {
      id: "b2", time: "10:30", title: "Lanche da Manhã", icon: "Apple",
      items: [
        { id: "i4", name: "Iogurte natural", qty: "170g", kcal: 100, p: 10, c: 8, g: 4 },
        { id: "i5", name: "Morangos", qty: "100g", kcal: 32, p: 1, c: 7, g: 0 },
      ],
    },
    {
      id: "b3", time: "13:00", title: "Almoço", icon: "Utensils",
      items: [
        { id: "i6", name: "Peito de frango grelhado", qty: "150g", kcal: 240, p: 45, c: 0, g: 5 },
        { id: "i7", name: "Arroz integral", qty: "80g", kcal: 110, p: 3, c: 23, g: 1 },
        { id: "i8", name: "Brócolos no vapor", qty: "120g", kcal: 40, p: 3, c: 7, g: 0 },
      ],
    },
    {
      id: "b4", time: "16:00", title: "Pré-Treino", icon: "Zap",
      items: [
        { id: "i9", name: "Banana", qty: "1 un", kcal: 105, p: 1, c: 27, g: 0 },
        { id: "i10", name: "Whey protein", qty: "30g", kcal: 120, p: 24, c: 3, g: 2 },
      ],
    },
  ],
};

// A pending swap request from the student (drives the "agent edit" demo)
window.NUTRI.studentRequest = {
  client: "Cátia Silva",
  blockId: "b3",
  reason: "Não gosto do alimento",
  note: "Prefiro não comer brócolos, posso trocar por outro vegetal?",
  suggestion: { id: "i8", name: "Abobrinha grelhada", qty: "120g", kcal: 38, p: 3, c: 6, g: 0 },
};
