import { 
  LayoutDashboard, 
  Home, 
  Apple, 
  BarChart3, 
  Users, 
  MessageSquare, 
  Settings,
  Dumbbell,
  Trophy,
  User
} from "lucide-react";

export type MealStatus = "pending" | "completed";

export interface MealItem {
  id: string;
  time: string;
  title: string;
  items: string[];
  calories: number;
  status: MealStatus;
  type: "meal" | "snack";
  swapOptions?: string[];
  image?: string;
}

export const mockDiet: MealItem[] = [
  {
    id: "meal-1",
    time: "07:00",
    title: "Café da Manhã",
    items: ["3 Ovos Mexidos", "1 Fatia Pão Integral", "Café Preto s/ Açúcar"],
    calories: 320,
    status: "pending",
    type: "meal",
    swapOptions: ["Mingau de Aveia + Whey", "Crepioca de Frango"],
    image: "https://images.unsplash.com/photo-1525351484163-7529414395d8?w=800&q=80"
  },
  {
    id: "meal-2",
    time: "10:00",
    title: "Lanche da Manhã",
    items: ["1 Maçã", "15g Castanhas"],
    calories: 150,
    status: "pending",
    type: "snack",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80"
  },
  {
    id: "meal-3",
    time: "13:00",
    title: "Almoço",
    items: ["150g Peito de Frango", "100g Arroz Branco", "Salada à Vontade"],
    calories: 450,
    status: "pending",
    type: "meal",
    swapOptions: ["150g Patinho Moído + 150g Batata Inglesa"],
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80"
  },
  {
    id: "meal-4",
    time: "16:00",
    title: "Pré-Treino",
    items: ["1 Banana", "30g Doce de Leite", "5g Creatina"],
    calories: 280,
    status: "pending",
    type: "snack",
    image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=800&q=80"
  },
  {
    id: "meal-5",
    time: "20:00",
    title: "Jantar",
    items: ["150g Tilápia", "100g Purê de Batata"],
    calories: 380,
    status: "pending",
    type: "meal",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&q=80"
  }
];

export const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Apple, label: "Nutrição", href: "/nutricao" },
  { icon: Dumbbell, label: "Treino", href: "/treino" },
  { icon: MessageSquare, label: "Agente", href: "/chat" },
  { icon: User, label: "Perfil", href: "/perfil" },
];
