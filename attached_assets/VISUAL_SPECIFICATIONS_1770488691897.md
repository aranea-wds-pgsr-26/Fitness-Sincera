# 📐 Especificação Visual Detalhada - Dashboard Reference

> Análise pixel-by-pixel do mockup de referência para replicação fiel

---

## 🎨 LAYOUT GERAL DO DASHBOARD

### Estrutura de Grid

```
┌─────────────────────────────────────────────────────────────────┐
│ [SIDEBAR - 256px]  │  [MAIN CONTENT AREA]                       │
│                    │                                             │
│  Logo              │  ┌─────────────────┐  ┌─────────────────┐  │
│  [Nav Items]       │  │  Health         │  │  Energy         │  │
│                    │  │  Overview       │  │  Used           │  │
│  • Dashboard       │  │  [Large Card]   │  │  [Med Card]     │  │
│  • Workout         │  │                 │  │                 │  │
│  • Nutrition       │  │  [Metrics +     │  │  [Bar Chart]    │  │
│  • Progress        │  │   Circular      │  │                 │  │
│  • Chat            │  │   Chart]        │  │                 │  │
│  • Settings        │  └─────────────────┘  └─────────────────┘  │
│                    │                                             │
│                    │  ┌─────────────────┐  ┌─────────────────┐  │
│  [Bottom]          │  │  Activity       │  │  Weekly         │  │
│  • Logout          │  │  [Bar Chart]    │  │  Summary        │  │
│                    │  │                 │  │  [Gauge]        │  │
│                    │  └─────────────────┘  └─────────────────┘  │
│                    │                                             │
│                    │  ┌──────────────────────────────────────┐  │
│                    │  │  [UPGRADE CTA - Neon Yellow BG]      │  │
│                    │  │  [Phone mockup] + [Text] + [Button]  │  │
│                    │  └──────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

### Dimensões e Espaçamento

```css
/* Layout */
--sidebar-width: 256px;
--content-max-width: 1440px;
--content-padding: 32px;
--grid-gap: 24px;

/* Cards */
--card-border-radius: 16px;
--card-padding: 24px;
--card-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);

/* Spacing scale */
--space-xs: 4px;
--space-sm: 8px;
--space-md: 16px;
--space-lg: 24px;
--space-xl: 32px;
--space-2xl: 48px;
```

---

## 🎯 COMPONENTES DETALHADOS

### 1. SIDEBAR (Esquerda)

**Especificações**:
- **Largura**: 256px (fixa)
- **Background**: `#1A1A1C` (cinza muito escuro, quase preto)
- **Border-right**: `1px solid rgba(255, 255, 255, 0.05)`
- **Padding**: 24px

**Estrutura**:

```tsx
<aside className="sidebar">
  {/* Logo/Brand */}
  <div className="logo">
    <h1>Fitness</h1> {/* Fonte: Gogh, size: 24px, color: #DFFF00 */}
  </div>
  
  {/* Navigation */}
  <nav className="nav-menu">
    <NavItem icon={LayoutDashboard} label="Dashboard" active />
    <NavItem icon={Dumbbell} label="Workout" />
    <NavItem icon={Apple} label="Nutrition" />
    <NavItem icon={TrendingUp} label="Progress" />
    <NavItem icon={MessageCircle} label="Chat" />
    <NavItem icon={Settings} label="Settings" />
  </nav>
  
  {/* User Profile (bottom) */}
  <div className="user-profile">
    <Avatar size={40} />
    <div>
      <p className="name">John Doe</p>
      <p className="role">Personal Trainer</p>
    </div>
  </div>
</aside>
```

**NavItem Specs**:
```css
/* Default state */
background: transparent;
padding: 12px 16px;
border-radius: 12px;
color: #9CA3AF; /* gray-400 */

/* Active state */
background: rgba(139, 92, 246, 0.15); /* personal/15 */
color: #A78BFA; /* personal-light */
border-left: 3px solid #8B5CF6; /* personal */

/* Hover state */
background: rgba(255, 255, 255, 0.05);
```

---

### 2. HEALTH OVERVIEW CARD (Grande, superior esquerdo)

**Localização**: Grid position 1,1 - span 2 columns
**Tamanho**: ~600px width × 380px height

**Elementos Visíveis**:

#### Header do Card:
```tsx
<CardHeader>
  <div className="flex items-center justify-between">
    <CardTitle className="flex items-center gap-2">
      <Activity className="h-5 w-5 text-personal" />
      <span>Health Overview</span>
    </CardTitle>
    <Button variant="ghost" size="sm">
      <MoreHorizontal className="h-4 w-4" />
    </Button>
  </div>
  <p className="text-sm text-muted-foreground">
    Your daily health metrics
  </p>
</CardHeader>
```

#### Conteúdo - Layout de 2 colunas:

**Coluna Esquerda (Métricas em lista)**:
```tsx
<div className="metrics-list space-y-4">
  {/* Métrica 1: Calories */}
  <div className="metric-item">
    <div className="flex items-center justify-between mb-2">
      <span className="text-sm text-muted-foreground">Calories Burned</span>
      <span className="text-lg font-semibold">2,340</span>
    </div>
    <Progress value={78} className="h-2" /> {/* Neon yellow */}
    <p className="text-xs text-muted-foreground mt-1">
      Goal: 3,000 kcal
    </p>
  </div>
  
  {/* Métrica 2: Steps */}
  <div className="metric-item">
    <div className="flex items-center justify-between mb-2">
      <span className="text-sm text-muted-foreground">Steps Today</span>
      <span className="text-lg font-semibold">8,547</span>
    </div>
    <Progress value={85} className="h-2" /> {/* Personal purple */}
    <p className="text-xs text-muted-foreground mt-1">
      Goal: 10,000 steps
    </p>
  </div>
  
  {/* Métrica 3: Water */}
  <div className="metric-item">
    <div className="flex items-center justify-between mb-2">
      <span className="text-sm text-muted-foreground">Water Intake</span>
      <span className="text-lg font-semibold">1.8L</span>
    </div>
    <Progress value={60} className="h-2" /> {/* Nutrition green */}
    <p className="text-xs text-muted-foreground mt-1">
      Goal: 3L
    </p>
  </div>
</div>
```

**Coluna Direita (Gráfico Circular - Wellness Index)**:
```tsx
<div className="wellness-gauge">
  <div className="relative w-40 h-40 mx-auto">
    {/* Circular Progress */}
    <CircularProgress 
      value={72} 
      size={160}
      strokeWidth={12}
      color="hsl(var(--personal))" /* Purple */
    />
    
    {/* Center value */}
    <div className="absolute inset-0 flex flex-col items-center justify-center">
      <span className="text-4xl font-bold font-heading">72</span>
      <span className="text-xs text-muted-foreground">Wellness Score</span>
    </div>
  </div>
  
  <p className="text-center text-sm mt-4">
    <span className="text-success">↑ 5%</span> from last week
  </p>
</div>
```

**Specs do Circular Progress**:
```css
/* Circular gauge */
--gauge-size: 160px;
--gauge-stroke-width: 12px;
--gauge-color: hsl(258, 70%, 58%); /* Personal purple */
--gauge-bg: rgba(255, 255, 255, 0.05);
--gauge-animation: 1.5s ease-out;
```

---

### 3. ENERGY USED CARD (Médio, superior direito)

**Tamanho**: ~380px width × 380px height

**Estrutura**:
```tsx
<Card>
  <CardHeader>
    <CardTitle className="flex items-center gap-2">
      <Zap className="h-5 w-5 text-primary" />
      Energy Used
    </CardTitle>
    <div className="flex items-center gap-2 mt-2">
      <span className="text-3xl font-bold font-heading">1,847</span>
      <span className="text-sm text-muted-foreground">kcal</span>
    </div>
  </CardHeader>
  
  <CardContent>
    {/* Bar Chart */}
    <BarChart 
      data={weeklyEnergyData}
      height={200}
      barColor="hsl(var(--primary))" /* Neon yellow */
    />
    
    {/* Legend */}
    <div className="flex justify-between mt-4 text-xs text-muted-foreground">
      <span>Mon</span>
      <span>Tue</span>
      <span>Wed</span>
      <span>Thu</span>
      <span>Fri</span>
      <span>Sat</span>
      <span>Sun</span>
    </div>
  </CardContent>
</Card>
```

**Bar Chart Specs**:
```typescript
// Data structure
const weeklyEnergyData = [
  { day: 'Mon', value: 1650 },
  { day: 'Tue', value: 1890 },
  { day: 'Wed', value: 1740 },
  { day: 'Thu', value: 1847 }, // Current day - highlighted
  { day: 'Fri', value: 0 },
  { day: 'Sat', value: 0 },
  { day: 'Sun', value: 0 },
]

// Chart config
{
  barRadius: 8,
  barColor: '#DFFF00', // Current day
  barColorInactive: 'rgba(223, 255, 0, 0.3)', // Future days
  barColorPast: 'rgba(223, 255, 0, 0.7)', // Past days
  barSpacing: 8,
  height: 200,
}
```

---

### 4. ACTIVITY CHART CARD (Médio, linha 2 esquerda)

**Estrutura similar ao Energy Used mas com**:
- **Título**: "Activity Levels"
- **Subtítulo**: "Weekly breakdown"
- **Bar Chart**: Multiplas barras por dia (diferentes atividades)
- **Cores**: Mix de personal (roxo) e nutrition (verde)

```tsx
<Card>
  <CardHeader>
    <CardTitle>Activity Levels</CardTitle>
    <p className="text-sm text-muted-foreground">Weekly breakdown</p>
  </CardHeader>
  
  <CardContent>
    <BarChart 
      data={activityData}
      height={180}
      stacked={true}
      colors={[
        'hsl(var(--personal))', // Workout
        'hsl(var(--nutrition))', // Cardio
        'hsl(var(--primary))', // HIIT
      ]}
    />
    
    {/* Legend */}
    <div className="flex gap-4 mt-4 text-xs">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-personal" />
        <span>Workout</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-nutrition" />
        <span>Cardio</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-primary" />
        <span>HIIT</span>
      </div>
    </div>
  </CardContent>
</Card>
```

---

### 5. WEEKLY SUMMARY CARD (Médio, linha 2 direita)

Com **radial/gauge chart**:

```tsx
<Card>
  <CardHeader>
    <CardTitle>Weekly Summary</CardTitle>
    <p className="text-sm text-muted-foreground">Your week at a glance</p>
  </CardHeader>
  
  <CardContent className="flex flex-col items-center">
    {/* Radial Gauge */}
    <div className="relative w-48 h-48">
      <svg viewBox="0 0 200 200" className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx="100"
          cy="100"
          r="80"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="16"
          fill="none"
        />
        
        {/* Progress circle */}
        <circle
          cx="100"
          cy="100"
          r="80"
          stroke="url(#gradient-personal)"
          strokeWidth="16"
          fill="none"
          strokeDasharray="502"
          strokeDashoffset={502 - (502 * 68 / 100)} // 68% progress
          strokeLinecap="round"
        />
        
        <defs>
          <linearGradient id="gradient-personal">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#A78BFA" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-5xl font-bold font-heading">68%</span>
        <span className="text-xs text-muted-foreground mt-1">Complete</span>
      </div>
    </div>
    
    {/* Stats below */}
    <div className="grid grid-cols-2 gap-4 w-full mt-6">
      <div className="text-center">
        <p className="text-2xl font-bold">5/7</p>
        <p className="text-xs text-muted-foreground">Workouts</p>
      </div>
      <div className="text-center">
        <p className="text-2xl font-bold">87%</p>
        <p className="text-xs text-muted-foreground">Nutrition</p>
      </div>
    </div>
  </CardContent>
</Card>
```

---

### 6. UPGRADE CTA CARD (Full-width, bottom)

**Este é o elemento mais VIBRANTE do design**:

```tsx
<Card className="col-span-full overflow-hidden relative">
  {/* Background gradient */}
  <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-personal/20 to-background opacity-50" />
  
  <CardContent className="relative flex items-center justify-between p-8">
    {/* Left: Phone mockup */}
    <div className="flex-shrink-0">
      <div className="relative w-32 h-64 bg-card rounded-[32px] border-4 border-primary/50 overflow-hidden shadow-2xl">
        {/* Phone screen */}
        <div className="absolute inset-2 bg-background rounded-[24px] flex flex-col items-center justify-center">
          <Activity className="h-12 w-12 text-primary mb-2" />
          <span className="text-6xl font-bold font-heading text-primary">1.1</span>
          <span className="text-xs text-muted-foreground mt-1">Active Score</span>
        </div>
        
        {/* Phone notch */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-6 bg-black rounded-b-2xl" />
      </div>
    </div>
    
    {/* Center: Text content */}
    <div className="flex-1 px-12">
      <h3 className="text-4xl font-heading font-bold mb-2">
        Upgrade to <span className="text-primary">Pro</span>
      </h3>
      <p className="text-lg text-muted-foreground mb-4">
        Unlock advanced analytics, personalized plans, and more
      </p>
      
      {/* Features list */}
      <ul className="space-y-2">
        <li className="flex items-center gap-2text-sm">
          <Check className="h-4 w-4 text-success" />
          <span>Unlimited workout plans</span>
        </li>
        <li className="flex items-center gap-2 text-sm">
          <Check className="h-4 w-4 text-success" />
          <span>Advanced nutrition tracking</span>
        </li>
        <li className="flex items-center gap-2 text-sm">
          <Check className="h-4 w-4 text-success" />
          <span>Priority support</span>
        </li>
      </ul>
    </div>
    
    {/* Right: CTA Button */}
    <div className="flex-shrink-0">
      <Button 
        size="lg" 
        className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg font-semibold shadow-lg shadow-primary/50"
      >
        Upgrade Now
        <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
      
      <p className="text-xs text-center text-muted-foreground mt-2">
        Starting at $9.99/month
      </p>
    </div>
  </CardContent>
</Card>
```

**Efeitos visuais**:
```css
/* Phone mockup glow */
.phone-mockup {
  box-shadow: 
    0 0 40px rgba(223, 255, 0, 0.3),
    0 10px 60px rgba(0, 0, 0, 0.5),
    inset 0 0 20px rgba(223, 255, 0, 0.1);
}

/* CTA button */
.upgrade-button {
  box-shadow: 
    0 10px 40px rgba(223, 255, 0, 0.4),
    0 0 20px rgba(223, 255, 0, 0.2);
  
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.upgrade-button:hover {
  transform: translateY(-2px);
  box-shadow: 
    0 15px 50px rgba(223, 255, 0, 0.5),
    0 0 30px rgba(223, 255, 0, 0.3);
}
```

---

## 📊 COMPONENTES DE GRÁFICOS

### Progress Bar Component
```tsx
interface ProgressProps {
  value: number // 0-100
  color?: 'primary' | 'personal' | 'nutrition'
  height?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
}

// Usage
<Progress 
  value={78} 
  color="primary" 
  height="sm" 
  showLabel 
/>
```

**Visual specs**:
```css
/* Small */
height: 6px;
border-radius: 3px;

/* Medium */
height: 8px;
border-radius: 4px;

/* Large */
height: 12px;
border-radius: 6px;

/* Colors */
--progress-bg: rgba(255, 255, 255, 0.05);
--progress-primary: hsl(var(--primary));
--progress-personal: hsl(var(--personal));
--progress-nutrition: hsl(var(--nutrition));
```

### Circular Progress Component
```tsx
interface CircularProgressProps {
  value: number // 0-100
  size: number // px
  strokeWidth: number
  color: string
  showValue?: boolean
}
```

### Bar Chart Component
```tsx
interface BarChartProps {
  data: Array<{ label: string; value: number }>
  height: number
  barColor: string
  barRadius?: number
  stacked?: boolean
  colors?: string[] // for stacked charts
}
```

---

## 🎨 SISTEMA DE CORES APLICADO

### Dashboard Color Usage:

```typescript
const dashboardColors = {
  // Metrics
  calories: 'hsl(var(--primary))',      // Yellow neon
  steps: 'hsl(var(--personal))',        // Purple
  water: 'hsl(var(--nutrition))',       // Green
  
  // Charts
  energyChart: 'hsl(var(--primary))',
  workoutBars: 'hsl(var(--personal))',
  cardioBars: 'hsl(var(--nutrition))',
  hiitBars: 'hsl(var(--warning))',
  
  // Gauges
  wellnessGauge: 'hsl(var(--personal))',
  weeklyGauge: 'hsl(var(--personal))',
  
  // CTA
  upgradeCTA: 'hsl(var(--primary))',
}
```

---

## 📱 RESPONSIVIDADE

### Breakpoints:
```css
/* Mobile first */
@media (max-width: 768px) {
  /* Stack all cards */
  .dashboard-grid {
    grid-template-columns: 1fr;
  }
  
  /* Hide sidebar, show mobile menu */
  .sidebar {
    transform: translateX(-100%);
  }
  
  /* Adjust card heights */
  .card {
    min-height: auto;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  /* 2 columns */
  .dashboard-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1025px) {
  /* 3-4 columns */
  .dashboard-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

---

## ✨ MICRO-INTERAÇÕES

### Card Hover:
```css
.card {
  transition: all 0.2s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.6);
}
```

### Progress Animation:
```css
@keyframes progress-fill {
  from {
    width: 0%;
  }
  to {
    width: var(--progress-value);
  }
}

.progress-bar {
  animation: progress-fill 1s ease-out;
}
```

### Number Count-up:
```typescript
// Animar números ao aparecer
useCountUp({
  end: 2340,
  duration: 1.5,
  separator: ',',
})
```

---

**Próximo passo**: Criar esses componentes exatos usando shadcn/ui + recharts com as especificações acima! 🚀

Quer que eu comece a implementar cada componente agora?
