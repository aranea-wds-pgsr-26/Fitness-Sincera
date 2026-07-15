// Fitness Sincera - Aluno (client) mock data
// Mirrors front-end/src/lib/mockData.ts + the meal-plan block shape.

window.ALUNO = window.ALUNO || {};

window.ALUNO.user = {
  name: "Lucas Bennett",
  email: "bennet02@gmail.com",
  avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop",
};

// Daily routine meals (the "drum-roll" scroll wheel feeds on this)
window.ALUNO.meals = [
  {
    id: "m1", time: "07:00", title: "Café da Manhã", type: "meal", calories: 320,
    macros: { p: 24, c: 28, g: 12 },
    items: [
      { name: "3 Ovos Mexidos", qty: "3 un", kcal: 210 },
      { name: "Pão Integral", qty: "1 fatia", kcal: 80 },
      { name: "Café Preto s/ Açúcar", qty: "200ml", kcal: 5 },
    ],
    image: "https://images.unsplash.com/photo-1525351484163-7529414395d8?w=800&q=80",
    ai: ["Mingau de Aveia + Whey", "Crepioca de Frango", "Iogurte + Granola"],
  },
  {
    id: "m2", time: "10:00", title: "Lanche da Manhã", type: "snack", calories: 150,
    macros: { p: 5, c: 18, g: 7 },
    items: [
      { name: "Maçã", qty: "1 un", kcal: 95 },
      { name: "Castanhas", qty: "15g", kcal: 55 },
    ],
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80",
    ai: ["Banana + Pasta de Amendoim", "Mix de Frutas Vermelhas"],
  },
  {
    id: "m3", time: "13:00", title: "Almoço", type: "meal", calories: 450,
    macros: { p: 42, c: 48, g: 9 },
    items: [
      { name: "Peito de Frango", qty: "150g", kcal: 240 },
      { name: "Arroz Branco", qty: "100g", kcal: 130 },
      { name: "Salada à Vontade", qty: " - ", kcal: 80 },
    ],
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80",
    ai: ["Patinho Moído + Batata Inglesa", "Salmão + Quinoa", "Tilápia + Mandioca"],
  },
  {
    id: "m4", time: "16:00", title: "Pré-Treino", type: "snack", calories: 280,
    macros: { p: 8, c: 52, g: 4 },
    items: [
      { name: "Banana", qty: "1 un", kcal: 105 },
      { name: "Doce de Leite", qty: "30g", kcal: 100 },
      { name: "Creatina", qty: "5g", kcal: 0 },
    ],
    image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=800&q=80",
    ai: ["Pão + Mel + Whey", "Tapioca com Banana"],
  },
  {
    id: "m5", time: "20:00", title: "Jantar", type: "meal", calories: 380,
    macros: { p: 38, c: 30, g: 8 },
    items: [
      { name: "Tilápia", qty: "150g", kcal: 200 },
      { name: "Purê de Batata", qty: "100g", kcal: 130 },
      { name: "Legumes no Vapor", qty: " - ", kcal: 50 },
    ],
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&q=80",
    ai: ["Omelete de Claras + Salada", "Sopa de Legumes + Frango"],
  },
];

window.ALUNO.goals = {
  kcalTarget: 1580, kcalDone: 0,
  protein: { val: 117, max: 152 },
  carbs: { val: 176, max: 220 },
  fat: { val: 40, max: 55 },
};
