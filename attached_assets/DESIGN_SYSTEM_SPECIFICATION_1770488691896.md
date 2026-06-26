# Design System Specification - Fitness App
**Aplicação de Gerenciamento de Treinos e Bem-Estar**

> 📋 Esta documentação foi extraída do design system criado no Excalidraw e segue as melhores práticas para implementação com shadcn/ui e Next.js. Este documento serve como fonte única de verdade para o desenvolvimento da aplicação no Replit.

---

## 📖 Índice

1. [Visão Geral do Projeto](#visão-geral-do-projeto)
2. [Análise Visual do Design](#análise-visual-do-design)
3. [Design Tokens](#design-tokens)
4. [Tipografia](#tipografia)
5. [Componentes Identificados](#componentes-identificados)
6. [Estrutura de Páginas](#estrutura-de-páginas)
7. [Implementação Técnica](#implementação-técnica)
8. [Navegação e Fluxos](#navegação-e-fluxos)

---

## 🎯 Visão Geral do Projeto

### Nome da Aplicação
**Fitness** - Sistema de gerenciamento de treinos e bem-estar

### Propósito
Aplicação dual-purpose projetada para:
- **Usuários finais**: Acompanhamento de métricas de saúde, treinos e progresso
- **Profissionais** (Personal Trainers/Nutricionistas): Gerenciamento de clientes, criação de planos de treino e acompanhamento

### Princípio Fundamental de Design
**CONSISTÊNCIA ABSOLUTA**: O app deve seguir as mesmas cores e design tanto para o lado do usuário quanto para o lado do profissional. A experiência visual deve ser unificada.

---

## 🎨 Análise Visual do Design

### Screenshot de Referência Principal

O design foi baseado em um **dashboard dark mode** que serve como inspiração visual primária para extração de cores e padrões UX. Este dashboard mostra:

- **Health Overview**: Cards modulares com métricas de saúde
- **Visualizações de dados**: Gráficos circulares (wellness index), barras (sleep analysis/activity)
- **Upgrade CTA**: Call-to-action com gráficos 3D vibrantes
- **Navegação lateral**: Sidebar com menu completo

### Arquitetura Visual

```
┌─────────────────────────────────────────────────────────┐
│  [SIDEBAR]  │  [DASHBOARD PRINCIPAL]                    │
│             │                                            │
│  • Dashboard│  ┌─────────────────┐  ┌──────────────┐   │
│  • Alunos   │  │ Health Overview │  │ Energy Used  │   │
│  • Chat     │  │  [Metrics]      │  │  [Chart]     │   │
│  • Planos   │  └─────────────────┘  └──────────────┘   │
│  • Aulas    │                                            │
│  • Exerc.   │  ┌─────────────────┐  ┌──────────────┐   │
│  • Templates│  │ Heart Rate      │  │ Wellness Idx │   │
│  • Produtos │  │  [Data]         │  │  [Circular]  │   │
│  • Equipe   │  └─────────────────┘  └──────────────┘   │
│             │                                            │
│             │  ┌────────────────────────────────────┐   │
│             │  │ Upgrade to Pro (3D Graphics)       │   │
│             │  └────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

---

## 🎨 Design Tokens

### Tema e Modo

**Tema Principal**: **Dark Mode** (prioritário)
- Background base: `#1A1A1C` - `#0F0F10` (preto profundo com leve tom azulado)
- Dashboard inspiração: Fundo escuro com elementos em cinza escuro/preto

### Sistema de Cores por Seção

O app utiliza um **sistema de cores contextual** baseado na seção:

- **🟣 Personal/Treino**: Roxo (`#8B5CF6` / `#A78BFA`) - Para funcionalidades de personal trainer, exercícios, treinos
- **🟢 Alimentação/Nutrição**: Verde (`#10B981` / `#34D399`) - Para funcionalidades de nutrição, dieta, alimentação

### Paleta de Cores Extraída do Design

#### 1. Cores do Dashboard (Amarelo Neon + Roxo)

Analisando o dashboard de inspiração na imagem:

**Accent Color (Amarelo Neon)**: `#DFFF00` / `#C4E600`
- Uso: Call-to-action vibrante no dashboard (imagem do celular com "1.1"), highlights, progresso

**Secondary Purple**: `#6366F1` / `#8B5CF6`
- Uso: Headers, seção Personal, badges, gradientes

```css
/* Neon Yellow/Green Scale (Dashboard CTA) */
--neon-50: hsl(66, 100%, 97%);
--neon-100: hsl(66, 100%, 92%);
--neon-200: hsl(66, 100%, 85%);
--neon-300: hsl(66, 100%, 75%);
--neon-400: hsl(66, 95%, 60%);
--neon-500: hsl(66, 90%, 50%);      /* Base: #DFFF00 */
--neon-600: hsl(66, 85%, 45%);
--neon-700: hsl(66, 75%, 38%);
--neon-800: hsl(66, 65%, 30%);
--neon-900: hsl(66, 55%, 22%);
```

#### 2. Cores Contextuais por Seção

**🟣 Personal/Treino (Roxo)**

```css
/* Purple Scale - Para seção Personal */
--personal-50: hsl(258, 90%, 97%);
--personal-100: hsl(258, 90%, 94%);
--personal-200: hsl(258, 85%, 88%);
--personal-300: hsl(258, 80%, 78%);
--personal-400: hsl(258, 75%, 68%);
--personal-500: hsl(258, 70%, 58%);   /* Base: #8B5CF6 */
--personal-600: hsl(258, 65%, 48%);
--personal-700: hsl(258, 60%, 38%);
--personal-800: hsl(258, 55%, 28%);
--personal-900: hsl(258, 50%, 20%);
```

**🟢 Alimentação/Nutrição (Verde)**

```css
/* Green Scale - Para seção Nutrição */
--nutrition-50: hsl(158, 76%, 97%);
--nutrition-100: hsl(158, 76%, 94%);
--nutrition-200: hsl(158, 74%, 85%);
--nutrition-300: hsl(158, 70%, 72%);
--nutrition-400: hsl(158, 65%, 60%);
--nutrition-500: hsl(158, 64%, 52%);  /* Base: #10B981 */
--nutrition-600: hsl(158, 60%, 42%);
--nutrition-700: hsl(158, 55%, 32%);
--nutrition-800: hsl(158, 50%, 24%);
--nutrition-900: hsl(158, 45%, 18%);
```

#### 3. Cores Neutras (Grays - do Dashboard)

Baseado nos cards e background do dashboard:

```css
/* Gray Scale */
--gray-50: hsl(240, 6%, 97%);
--gray-100: hsl(240, 6%, 93%);
--gray-200: hsl(240, 5%, 84%);
--gray-300: hsl(240, 5%, 72%);
--gray-400: hsl(240, 4%, 58%);
--gray-500: hsl(240, 4%, 46%);
--gray-600: hsl(240, 5%, 35%);
--gray-700: hsl(240, 6%, 25%);       /* Cards escuros */
--gray-800: hsl(240, 7%, 16%);       /* Sidebar */
--gray-900: hsl(240, 9%, 10%);       /* Background principal */
```

#### 4. Cores Semânticas

```css
/* Success (Verde alinhado com Nutrição) */
--success: hsl(158, 64%, 52%);        /* #10B981 */
--success-foreground: hsl(0, 0%, 100%);

/* Warning (Laranja/Amarelo) */
--warning: hsl(38, 95%, 60%);
--warning-foreground: hsl(240, 10%, 10%);

/* Error/Destructive */
--destructive: hsl(0, 84%, 60%);
--destructive-foreground: hsl(0, 0%, 100%);

/* Info (Azul) */
--info: hsl(217, 91%, 65%);
--info-foreground: hsl(0, 0%, 100%);
```

#### 5. Cores das Caixas Informativas (do Excalidraw)

Identificadas no design:

```css
/* Purple Info Box (Header - "Inspiração para dashboard") */
--info-box-purple: hsl(258, 85%, 80%);      /* #E8DAFF */
--info-box-purple-text: hsl(258, 70%, 25%);

/* Green Info Box (Instruções - "O app tanto para o user...") */
--info-box-green: hsl(140, 60%, 85%);       /* #D4EDDA */
--info-box-green-text: hsl(140, 70%, 20%);

/* Pink Warning Box (Design System note) */
--info-box-pink: hsl(330, 85%, 92%);        /* #FFD1F5 */
--info-box-pink-text: hsl(330, 70%, 25%);
```

### globals.css - Tokens Completos

```css
@import "tailwindcss";

:root {
  /* === BASE === */
  --background: 240 9% 10%;             /* #0F0F10 - deep dark */
  --foreground: 0 0% 95%;               /* #F2F2F2 - light text */

  /* === CARD === */
  --card: 240 6% 25%;                   /* #2A2A2E - dark cards */
  --card-foreground: 0 0% 95%;

  /* === POPOVER / DROPDOWN / TOOLTIP === */
  --popover: 240 7% 16%;
  --popover-foreground: 0 0% 95%;

  /* === PRIMARY (Neon Yellow - Dashboard CTA) === */
  --primary: 66 90% 50%;                /* #DFFF00 - Neon accent */
  --primary-foreground: 240 10% 10%;    /* Dark text for contrast */

  /* === SECONDARY === */
  --secondary: 240 5% 35%;              /* Medium gray */
  --secondary-foreground: 0 0% 95%;

  /* === MUTED === */
  --muted: 240 4% 20%;                  /* Subtle gray background */
  --muted-foreground: 240 4% 58%;       /* Medium gray text */

  /* === ACCENT (Purple - default) === */
  --accent: 258 70% 58%;                /* #8B5CF6 - Purple */
  --accent-foreground: 0 0% 100%;

  /* === DESTRUCTIVE === */
  --destructive: 0 84% 60%;
  --destructive-foreground: 0 0% 100%;

  /* === BORDERS & INPUTS === */
  --border: 240 5% 25%;                 /* Subtle borders */
  --input: 240 5% 30%;                  /* Slightly lighter for inputs */
  --ring: 258 70% 58%;                  /* Purple for focus (default) */

  /* === BORDER RADIUS === */
  --radius: 0.75rem;                    /* 12px - rounded modern */

  /* === CHART COLORS === */
  --chart-1: 66 90% 50%;                /* Neon yellow */
  --chart-2: 258 70% 58%;               /* Purple */
  --chart-3: 158 64% 52%;               /* Green */
  --chart-4: 38 95% 60%;                /* Orange */
  --chart-5: 217 91% 65%;               /* Blue */

  /* === SIDEBAR === */
  --sidebar: 240 7% 16%;                /* Deep dark gray */
  --sidebar-foreground: 0 0% 90%;
  --sidebar-primary: 258 70% 58%;       /* Purple default */
  --sidebar-primary-foreground: 0 0% 100%;
  --sidebar-accent: 258 85% 80%;        /* Light purple */
  --sidebar-accent-foreground: 258 70% 25%;
  --sidebar-border: 240 5% 20%;
  --sidebar-ring: 258 70% 58%;

  /* === SEMANTIC COLORS === */
  --success: 158 64% 52%;               /* #10B981 - Green (Nutrição) */
  --success-foreground: 0 0% 100%;
  --warning: 38 95% 60%;
  --warning-foreground: 240 10% 10%;
  --info: 217 91% 65%;
  --info-foreground: 0 0% 100%;

  /* === CONTEXTUAL COLORS - PERSONAL (Roxo) === */
  --personal: 258 70% 58%;              /* #8B5CF6 */
  --personal-foreground: 0 0% 100%;
  --personal-light: 258 85% 80%;        /* #A78BFA */
  --personal-dark: 258 60% 38%;

  /* === CONTEXTUAL COLORS - NUTRIÇÃO (Verde) === */
  --nutrition: 158 64% 52%;             /* #10B981 */
  --nutrition-foreground: 0 0% 100%;
  --nutrition-light: 158 70% 72%;       /* #34D399 */
  --nutrition-dark: 158 55% 32%;

  /* === INFO BOXES (do Excalidraw) === */
  --info-box-purple: 258 85% 80%;       /* Purple header */
  --info-box-purple-text: 258 70% 25%;
  --info-box-green: 140 60% 85%;        /* Green instructions */
  --info-box-green-text: 140 70% 20%;
  --info-box-pink: 330 85% 92%;         /* Pink warnings */
  --info-box-pink-text: 330 70% 25%;
}

.dark {
  /* Dark mode já é o padrão, mas mantemos para consistência */
  --background: 240 9% 10%;
  --foreground: 0 0% 95%;
  /* ... outros tokens permanecem iguais */
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-success: var(--success);
  --color-success-foreground: var(--success-foreground);
  --color-warning: var(--warning);
  --color-warning-foreground: var(--warning-foreground);
  --color-info: var(--info);
  --color-info-foreground: var(--info-foreground);
  
  /* Contextual colors */
  --color-personal: var(--personal);
  --color-personal-foreground: var(--personal-foreground);
  --color-nutrition: var(--nutrition);
  --color-nutrition-foreground: var(--nutrition-foreground);
}

body {
  background: hsl(var(--background));
  color: hsl(var(--foreground));
  font-family: 'Resolve Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}
```

### Como Usar as Cores Contextuais

#### Seção Personal (Roxo) 🟣

Use as variáveis `--personal-*` para qualquer funcionalidade relacionada a treino/personal:

```tsx
// Exemplo: Card de treino
<Card className="border-personal/50 bg-personal/5">
  <CardHeader className="bg-personal text-personal-foreground">
    <CardTitle>Treino de Peito</CardTitle>
  </CardHeader>
  <CardContent>
    {/* ... */}
  </CardContent>
</Card>

// Badge para exercícios
<Badge className="bg-personal text-personal-foreground">
  Treino
</Badge>

// Botão de ação Personal
<Button className="bg-personal hover:bg-personal-dark text-personal-foreground">
  Novo Treino
</Button>
```

#### Seção Nutrição (Verde) 🟢

Use as variáveis `--nutrition-*` para funcionalidades de nutrição/alimentação:

```tsx
// Exemplo: Card de dieta
<Card className="border-nutrition/50 bg-nutrition/5">
  <CardHeader className="bg-nutrition text-nutrition-foreground">
    <CardTitle>Plano Alimentar</CardTitle>
  </CardHeader>
  <CardContent>
    {/* ... */}
  </CardContent>
</Card>

// Badge para nutrição
<Badge className="bg-nutrition text-nutrition-foreground">
  Nutrição
</Badge>

// Botão de ação Nutrição
<Button className="bg-nutrition hover:bg-nutrition-dark text-nutrition-foreground">
  Nova Refeição
</Button>
```

#### Uso no Tailwind Config

Para habilitar as cores customizadas no Tailwind, adicione em `tailwind.config.ts`:

```ts
module.exports = {
  theme: {
    extend: {
      colors: {
        personal: {
          DEFAULT: 'hsl(var(--personal))',
          foreground: 'hsl(var(--personal-foreground))',
          light: 'hsl(var(--personal-light))',
          dark: 'hsl(var(--personal-dark))',
        },
        nutrition: {
          DEFAULT: 'hsl(var(--nutrition))',
          foreground: 'hsl(var(--nutrition-foreground))',
          light: 'hsl(var(--nutrition-light))',
          dark: 'hsl(var(--nutrition-dark))',
        },
      },
    },
  },
}
```



---

## ✍️ Tipografia

### Fontes Especificadas no Design

**Nota**: "Gogh" e "Resolve Sans" são as fontes principais do design. Se não estiverem disponíveis no projeto, use as fallbacks do Google Fonts abaixo (Bebas Neue / Inter) até inserir as fontes locais.

#### 1. **Títulos/Headings**: "Gogh"
- **Características**: "Intensa e cheia de atitude"
- **Uso**: Títulos principais, headers, navegação
- **Fallback Google Font**: **"Bebas Neue"** (bold, condensed)

```tsx
import { Bebas_Neue } from 'next/font/google'

const headingFont = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-heading'
})
```

#### 2. **Body/Texto Corrido**: "Resolve Sans"
- **Características**: "Imponente mas marcante"
- **Uso**: Corpo de texto, descrições, labels
- **Fallback Google Font**: **"Inter"** ou **"DM Sans"** (modern, clean)

```tsx
import { Inter } from 'next/font/google'

const bodyFont = Inter({
  subsets: ['latin'],
  variable: '--font-body'
})
```

### Escala Tipográfica

```css
/* Headings (Gogh/Bebas Neue) */
--text-h1: 3.5rem;      /* 56px */
--text-h2: 2.5rem;      /* 40px */
--text-h3: 2rem;        /* 32px */
--text-h4: 1.5rem;      /* 24px */
--text-h5: 1.25rem;     /* 20px */
--text-h6: 1.125rem;    /* 18px */

/* Body (Resolve Sans/Inter) */
--text-base: 1rem;      /* 16px */
--text-sm: 0.875rem;    /* 14px */
--text-xs: 0.75rem;     /* 12px */
--text-lg: 1.125rem;    /* 18px */
--text-xl: 1.25rem;     /* 20px */

/* Weights */
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

### Implementação no layout.tsx

```tsx
import { Bebas_Neue, Inter } from 'next/font/google'

const headingFont = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap'
})

const bodyFont = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap'
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={`${headingFont.variable} ${bodyFont.variable} font-body`}>
        {children}
      </body>
    </html>
  )
}
```

```css
/* globals.css */
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading), sans-serif;
  font-weight: 700;
  letter-spacing: 0.02em;
}

body, p, span, div {
  font-family: var(--font-body), sans-serif;
}
```

---

## 🧩 Componentes Identificados

### Do Excalidraw - Mapeamento para shadcn/ui

| Elemento Visual | shadcn Component | Notas de Implementação |
|----------------|------------------|------------------------|
| **Sidebar de Navegação** | `sidebar` | Menu com: Dashboard, Alunos, Chat, Planos, Aulas, Biblioteca de Exercícios, Templates, Produtos, Equipe |
| **Cards de Métricas** | `card` | Health Overview, Energy Used, Heart Rate, Wellness Index |
| **Gráficos Circulares** | `chart` (recharts) | Wellness Index com gauge circular |
| **Gráficos de Barras** | `chart` (recharts) | Sleep Analysis, Activity tracking |
| **Tabela de Exercícios** | `table` ou `data-table` | Lista com grupos musculares, tipos, status (tags coloridas) |
| **Tags de Status** | `badge` | Variantes: vermelho (Cardio), verde (strength), roxo (HIIT), rosa (special) |
| **Cards de Templates** | `card` | "Treino Intermediário", "Legião De Ferro" com ícones de edição |
| **Modal de Criação** | `dialog` | Popup "Adicione Treinos" com seleção de dias da semana |
| **Botões de Ação** | `button` | Variantes: primary (neon), outline, ghost |
| **Lista de Clientes** | `card` ou custom list | Com status "Ativo" e informações do cliente |
| **Upgrade CTA** | `card` customizado | Com gráficos 3D e call-to-action vibrante |
| **Ícones** | `lucide-react` | User, Calendar, Activity, Heart, etc. |

### Componentes shadcn a Instalar

```bash
npx shadcn@latest init

# Base components
npx shadcn@latest add button card badge alert sidebar

# Navigation
npx shadcn@latest add tabs dropdown-menu navigation-menu

# Forms & Inputs
npx shadcn@latest add input select checkbox radio-group switch label form

# Data Display
npx shadcn@latest add table data-table chart avatar

# Feedback
npx shadcn@latest add toast progress skeleton

# Overlays
npx shadcn@latest add dialog drawer popover tooltip

# Utilities
npx shadcn@latest add separator accordion collapsible
```

---

## 📄 Estrutura de Páginas

### Navegação Principal (Sidebar)

```
app/
├── dashboard/           # Dashboard com métricas de saúde
├── alunos/             # Gestão de clientes (para profissionais)
├── chat/               # Sistema de mensagens
├── planos/             # Planos de treino/nutrição
├── aulas/              # Agendamento de aulas
├── exercicios/         # Biblioteca de exercícios
│   └── [categoria]/    # Peitoral, Costas, Pernas, etc.
├── templates/          # Templates pré-configurados de treinos
├── produtos/           # Marketplace de produtos
└── equipe/             # Gestão de equipe (para profissionais)
```

### Página: Dashboard (Principal)

**Rota**: `/dashboard` ou `/`

**Layout**:
```tsx
// app/dashboard/page.tsx
export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      {/* Health Overview */}
      <Card className="col-span-1 lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Health Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Métricas principais */}
        </CardContent>
      </Card>

      {/* Energy Used */}
      <Card>
        <CardHeader>
          <CardTitle>Energy Used</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Gráfico de barras */}
        </CardContent>
      </Card>

      {/* Heart Rate */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-destructive" />
            Heart Rate
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Data de batimento cardíaco */}
        </CardContent>
      </Card>

      {/* Wellness Index */}
      <Card className="col-span-1 lg:col-span-2">
        <CardHeader>
          <CardTitle>Wellness Index</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Gráfico circular */}
        </CardContent>
      </Card>

      {/* Sleep Analysis */}
      <Card className="col-span-1 lg:col-span-2">
        <CardHeader>
          <CardTitle>Sleep Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Gráfico de barras */}
        </CardContent>
      </Card>

      {/* Upgrade CTA */}
      <Card className="col-span-full bg-gradient-to-br from-primary/20 to-purple-500/20 border-primary/50">
        <CardContent className="flex items-center justify-between p-6">
          <div>
            <h3 className="text-2xl font-heading font-bold">Upgrade to Pro</h3>
            <p className="text-muted-foreground">Unlock advanced features</p>
          </div>
          <Button size="lg" className="bg-primary text-primary-foreground">
            Upgrade Now
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
```

### Página: Biblioteca de Exercícios

**Rota**: `/exercicios`

**Componentes**:
- Tabela com categorização por grupo muscular
- Tags de status coloridas (Cardio: vermelho, Strength: verde, HIIT: roxo)
- Ações inline (menu com 3 pontos)

**Estrutura da Tabela**:

| Thumbnail | Nome do Exercício | Categoria | Tipo | Status | Ações |
|-----------|-------------------|-----------|------|--------|-------|
| 📷 | Remada Articulada Polia Alta | Costas | Strength | 🟢 Active | ⋮ |
| 📷 | Barra Inclinada com Halter JH | Peitoral | Strength | 🟢 Active | ⋮ |
| 📷 | Cadeira HS | Pernas | Cardio | 🔴 Cardio | ⋮ |

### Página: Templates

**Rota**: `/templates`

**Componentes**:
- Cards de templates pré-configurados
- Ícones de edição rápida
- Modal de criação de novo treino

**Cards de Template**:
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <Card>
    <CardHeader className="flex-row items-center justify-between">
      <CardTitle>Treino Intermediário</CardTitle>
      <Button variant="ghost" size="icon">
        <Edit className="h-4 w-4" />
      </Button>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-muted-foreground">
        Plano de 4x por semana
      </p>
    </CardContent>
  </Card>
  
  <Card>
    <CardHeader className="flex-row items-center justify-between">
      <CardTitle>Legião De Ferro</CardTitle>
      <Button variant="ghost" size="icon">
        <Edit className="h-4 w-4" />
      </Button>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-muted-foreground">
        Força e hipertrofia avançada
      </p>
    </CardContent>
  </Card>
</div>
```

### Página: Gestão de Alunos (Profissionais)

**Rota**: `/alunos`

**Componentes**:
- Lista de clientes com avatar
- Status badges ("Ativo")
- Filtros e busca

---

## 🔧 Implementação Técnica

### 1. Inicialização do Projeto

```bash
# Criar projeto Next.js
npx create-next-app@latest fitness-app --typescript --tailwind --app

cd fitness-app

# Inicializar shadcn/ui
npx shadcn@latest init
# Escolher: Default, Neutral, Yes (CSS variables)

# Instalar dependências adicionais
npm install recharts lucide-react
npm install @radix-ui/react-icons
```

### 2. Estrutura de Diretórios

```
fitness-app/
├── app/
│   ├── layout.tsx                 # Root layout com fontes
│   ├── globals.css                # Design tokens
│   ├── page.tsx                   # Home redirect
│   ├── dashboard/
│   │   └── page.tsx
│   ├── alunos/
│   │   ├── page.tsx
│   │   └── [id]/
│   │       └── page.tsx
│   ├── exercicios/
│   │   ├── page.tsx
│   │   └── [categoria]/
│   │       └── page.tsx
│   ├── templates/
│   │   └── page.tsx
│   └── styleguide/                # Design system showcase
│       ├── layout.tsx
│       ├── navigation.ts
│       ├── page.tsx               # All design tokens
│       └── components/
│           └── [component-name]/
│               └── page.tsx
├── components/
│   ├── ui/                        # shadcn components
│   ├── sidebar/
│   │   └── app-sidebar.tsx
│   ├── dashboard/
│   │   ├── health-overview.tsx
│   │   ├── wellness-chart.tsx
│   │   └── upgrade-cta.tsx
│   └── shared/
│       ├── header.tsx
│       └── user-menu.tsx
├── lib/
│   └── utils.ts                   # cn() helper
└── public/
    ├── images/
    └── icons/
```

### 3. Sidebar de Navegação

```tsx
// components/sidebar/app-sidebar.tsx
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  FileText,
  Calendar,
  Dumbbell,
  FileTemplate,
  ShoppingBag,
  UsersRound
} from "lucide-react"

const menuItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Alunos", href: "/alunos", icon: Users },
  { name: "Chat", href: "/chat", icon: MessageSquare },
  { name: "Planos", href: "/planos", icon: FileText },
  { name: "Aulas", href: "/aulas", icon: Calendar },
  { name: "Exercícios", href: "/exercicios", icon: Dumbbell },
  { name: "Templates", href: "/templates", icon: FileTemplate },
  { name: "Produtos", href: "/produtos", icon: ShoppingBag },
  { name: "Equipe", href: "/equipe", icon: UsersRound },
]

export function AppSidebar() {
  const pathname = usePathname()
  
  return (
    <aside className="w-64 h-screen fixed left-0 top-0 bg-sidebar border-r border-sidebar-border p-6 flex flex-col gap-6">
      {/* Logo */}
      <div>
        <h1 className="text-2xl font-heading font-bold text-primary">
          Fitness
        </h1>
      </div>
      
      {/* Navigation */}
      <nav className="flex flex-col gap-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{item.name}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
```

### 4. Layout Principal

```tsx
// app/layout.tsx
import type { Metadata } from "next"
import { Bebas_Neue, Inter } from "next/font/google"
import { AppSidebar } from "@/components/sidebar/app-sidebar"
import "./globals.css"

const headingFont = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
})

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Fitness - Gerenciamento de Treinos",
  description: "Aplicação de gerenciamento de treinos e bem-estar",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={`${headingFont.variable} ${bodyFont.variable} font-body antialiased`}>
        <div className="flex min-h-screen">
          <AppSidebar />
          <main className="flex-1 ml-64 overflow-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
```

### 5. Styleguide Setup

```ts
// app/styleguide/navigation.ts
export interface NavItem {
  name: string
  href: string
}

export interface NavSection {
  title: string
  items: NavItem[]
}

export const navigation: NavSection[] = [
  {
    title: "Foundation",
    items: [
      { name: "Design Tokens", href: "/styleguide" },
    ]
  },
  {
    title: "Components",
    items: [
      { name: "Buttons", href: "/styleguide/components/buttons" },
      { name: "Cards", href: "/styleguide/components/cards" },
      { name: "Badges", href: "/styleguide/components/badges" },
      { name: "Charts", href: "/styleguide/components/charts" },
    ]
  }
]
```

---

## 🧭 Navegação e Fluxos

### Fluxo do Usuário Final

1. **Login** → Dashboard
2. **Dashboard**: Visualiza métricas (Health Overview, Wellness Index, Sleep Analysis)
3. **Planos**: Acessa plano de treino personalizado
4. **Exercícios**: Vê demonstrações e instruções de exercícios
5. **Chat**: Comunica com personal trainer/nutricionista

### Fluxo do Profissional

1. **Login** → Dashboard de Gestão
2. **Alunos**: Lista e gerencia clientes
   - Clique em aluno → Visualiza detalhes, métricas, progresso
3. **Templates**: Cria/edita templates de treino
   - Clique em "Adicionar" → Modal de criação
   - Seleciona dias da semana → Adiciona exercícios
4. **Biblioteca de Exercícios**: Adiciona novos exercícios
5. **Planos**: Atribui planos customizados a clientes

---

## 📝 Resumo do Design System

### Design Summary

- **Primary Color**: Neon Yellow (#DFFF00 / #C4E600) - vibrante, energético, focado em CTAs
- **Contextual Colors**:
  - 🟣 **Personal/Treino**: Roxo (#8B5CF6) - profissional, fitness, força
  - 🟢 **Nutrição/Alimentação**: Verde (#10B981) - saúde, bem-estar, natural
- **Font (Headings)**: Gogh (fallback: Bebas Neue) - intensa e cheia de atitude
- **Font (Body)**: Resolve Sans (fallback: Inter) - imponente mas marcante
- **Style**: **Dark Mode Premium** - fundo escuro (#0F0F10) com acentos neon e roxo, gráficos vibrantes e visualizações de dados modernas
- **Border Radius**: Arredondado (12px / 0.75rem) - moderno e amigável
- **Overall Feel**: **Fitness Tech Premium** - Uma experiência visual ousada e moderna que combina profissionalismo com energia. O dark mode com acentos vibrantes (neon + roxo/verde contextual) transmite inovação e foco. As cores contextuais por seção (Personal = Roxo, Nutrição = Verde) criam uma navegação visual intuitiva enquanto mantêm a consistência geral do sistema.

### Princípios de Design

1. **Consistência com Contexto**: Mesma base visual, mas cores contextuais por seção criam identidade clara
2. **Hierarquia Clara**: Tipografia contrastante (headings vs body) + cores contextuais definem estrutura
3. **Feedback Visual**: Sistema de cores contextual + tags coloridas + gráficos para comunicação rápida
4. **Dark Mode First**: Otimizado para uso prolongado, redução de fadiga visual
5. **Data-Driven**: Visualizações de progresso e métricas em destaque com cores vibrantes
6. **Acessibilidade**: Contraste adequado em todas as combinações (roxo e verde em fundo escuro = excelente contraste)
7. **Navegação Visual**: Cores por seção facilitam orientação do usuário no app

---

## ✅ Checklist de Implementação

### Fase 1: Setup (Prompt 1)
- [ ] Inicializar Next.js com TypeScript
- [ ] Configurar shadcn/ui
- [ ] Criar `/app/globals.css` com tokens
- [ ] Instalar fontes (Gogh + Resolve Sans) e fallbacks (Bebas Neue + Inter)
- [ ] Instalar componentes base (button, card, badge, chart, sidebar)
- [ ] Criar styleguide layout + navigation
- [ ] Criar página de tokens `/styleguide/page.tsx`

### Fase 2: Componentes (Prompt 2)
- [ ] Implementar Sidebar de navegação
- [ ] Criar cards de métricas customizados
- [ ] Implementar gráficos (recharts)
- [ ] Criar badge variants para status
- [ ] Implementar tabela de exercícios
- [ ] Criar modal de criação de treino
- [ ] Documentar cada componente no styleguide

### Fase 3: Páginas (Prompt 3)
- [ ] Dashboard principal
- [ ] Página de alunos
- [ ] Biblioteca de exercícios
- [ ] Templates de treino
- [ ] Perfil de usuário
- [ ] Sistema de chat (opcional)

### Fase 4: Interatividade
- [ ] Navegação entre páginas
- [ ] Filtros e busca
- [ ] Formulários de criação
- [ ] Toasts de feedback
- [ ] Loading states

### Fase 5: Responsividade
- [ ] Mobile navigation (drawer)
- [ ] Layouts responsivos (grid → stack)
- [ ] Sidebar collapse em mobile
- [ ] Gráficos adaptáveis

---

## 📚 Recursos Adicionais

### Design System References
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Radix UI Primitives](https://www.radix-ui.com)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Recharts](https://recharts.org)

### Color Tool
- [HS L Color Picker](https://hslpicker.com)
- [Contrast Checker](https://webaim.org/resources/contrastchecker/)

### Typography
- [Google Fonts](https://fonts.google.com)
- [Bebas Neue](https://fonts.google.com/specimen/Bebas+Neue)
- [Inter](https://fonts.google.com/specimen/Inter)

---

**Documentação criada em**: 2026-02-03  
**Baseada em**: Excalidraw Design System + GitHub Templates (dfolloni82/design-system-prompts)  
**Para uso em**: Replit, Next.js, shadcn/ui  

🎯 **Objetivo**: Este documento serve como fonte única de verdade para implementar o Fitness App com consistência visual e técnica absoluta.
