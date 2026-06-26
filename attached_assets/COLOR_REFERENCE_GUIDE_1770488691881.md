# 🎨 Guia Rápido de Cores - Fitness App

> Referência visual rápida para escolher as cores certas em cada contexto

---

## 📊 Tabela de Referência Rápida

| Contexto | Cor Base | Hex | HSL | Classe Tailwind | Uso Principal |
|----------|----------|-----|-----|-----------------|---------------|
| **🟡 Neon (CTA)** | `--primary` | `#DFFF00` | `66 90% 50%` | `bg-primary` | CTAs vibrantes, highlights, dashboard accent |
| **🟣 Personal/Treino** | `--personal` | `#8B5CF6` | `258 70% 58%` | `bg-personal` | Treinos, exercícios, personal trainer |
| **🟢 Nutrição/Alimentação** | `--nutrition` | `#10B981` | `158 64% 52%` | `bg-nutrition` | Alimentação, dieta, nutricionista |
 **⚫ Background** | `--background` | `#0F0F10` | `240 9% 10%` | `bg-background` | Fundo principal do app |
| **🔘 Cards** | `--card` | `#2A2A2E` | `240 6% 25%` | `bg-card` | Cards, painéis, containers |
| **🔴 Error** | `--destructive` | `#E87C7C` | `0 84% 60%` | `bg-destructive` | Erros, ações destrutivas |
| **🟠 Warning** | `--warning` | `#F5B759` | `38 95% 60%` | `bg-warning` | Avisos, alertas |
| **🔵 Info** | `--info` | `#5B9FF9` | `217 91% 65%` | `bg-info` | Informações, dicas |

---

## 🎯 Quando Usar Cada Cor

### 🟡 Use Neon Yellow quando:
- ✅ Destacar CTAs importantes (botões de upgrade, conversão)
- ✅ Criar contraste visual forte no dashboard
- ✅ Chamar atenção para métricas de progresso
- ✅ Elementos vibrantes que precisam se destacar
- ❌ **NÃO use** como cor de fundo (muito vibrante)
- ❌ **NÃO use** em grandes áreas (fadiga visual)

**Exemplo de uso:**
```tsx
<Button className="bg-primary text-primary-foreground hover:bg-primary/90">
  Upgrade to Pro
</Button>
```

---

### 🟣 Use Roxo (Personal/Treino) quando:
- ✅ Qualquer funcionalidade de treino/exercício
- ✅ Seção de personal training
- ✅ Planos de treino
- ✅ Biblioteca de exercícios
- ✅ Estatísticas de performance física
- ✅ Headers de seções de treino
- ✅ Badges para exercícios/treinos

**Exemplo de uso:**
```tsx
// Card de seção Personal
<Card className="border-personal/50">
  <CardHeader className="bg-personal text-personal-foreground">
    <CardTitle>Plano de Treino Semanal</CardTitle>
  </CardHeader>
  <CardContent className="bg-card">
    {/* Conteúdo */}
  </CardContent>
</Card>

// Badge de categoria
<Badge className="bg-personal text-personal-foreground">
  Treino
</Badge>

// Botão de ação
<Button className="bg-personal hover:bg-personal-dark">
  Novo Exercício
</Button>
```

---

### 🟢 Use Verde (Nutrição/Alimentação) quando:
- ✅ Funcionalidades de alimentação/dieta
- ✅ Planos nutricionais
- ✅ Receitas e refeições
- ✅ Contagem de calorias/macros
- ✅ Seção de nutricionista
- ✅ Headers de seções de nutrição
- ✅ Badges para alimentos/dietas

**Exemplo de uso:**
```tsx
// Card de seção Nutrição
<Card className="border-nutrition/50">
  <CardHeader className="bg-nutrition text-nutrition-foreground">
    <CardTitle>Plano Alimentar Diário</CardTitle>
  </CardHeader>
  <CardContent className="bg-card">
    {/* Conteúdo */}
  </CardContent>
</Card>

// Badge de categoria
<Badge className="bg-nutrition text-nutrition-foreground">
  Nutrição
</Badge>

// Botão de ação
<Button className="bg-nutrition hover:bg-nutrition-dark">
  Nova Refeição
</Button>
```

---

## 🧩 Variações de Uso

### Backgrounds Sutis (5% opacity)
Use para criar áreas sutilmente coloridas sem sobrecarregar:

```tsx
// Personal sutil
<div className="bg-personal/5 border-personal/20">
  {/* Conteúdo */}
</div>

// Nutrição sutil
<div className="bg-nutrition/5 border-nutrition/20">
  {/* Conteúdo */}
</div>
```

### Bordas Coloridas (50% opacity)
```tsx
<Card className="border-personal/50">  {/* Borda roxo sutil */}
<Card className="border-nutrition/50"> {/* Borda verde sutil */}
```

### Gradientes Contextuais
```tsx
// Personal gradient
<div className="bg-gradient-to-br from-personal/20 to-personal-dark/10">
  
</div>

// Nutrition gradient
<div className="bg-gradient-to-br from-nutrition/20 to-nutrition-dark/10">
  
</div>
```

---

## 🎨 Esquema de Cores por Página

### Dashboard (`/dashboard`)
- **Background**: `bg-background` (preto escuro)
- **Cards**: `bg-card` (cinza escuro)
- **CTA Principal**: `bg-primary` (neon yellow)
- **Métricas Personal**: Usar `text-personal` ou `bg-personal/10`
- **Métricas Nutrição**: Usar `text-nutrition` ou `bg-nutrition/10`

### Biblioteca de Exercícios (`/exercicios`)
- **Background**: `bg-background`
- **Headers**: `bg-personal` (roxo - contexto de treino)
- **Cards de Exercício**: `bg-card` com `border-personal/30`
- **Badges**: Usar `bg-personal` para treino, outras cores para tipos específicos

### Planos Alimentares (`/nutricao`)
- **Background**: `bg-background`
- **Headers**: `bg-nutrition` (verde - contexto de nutrição)
- **Cards de Refeição**: `bg-card` com `border-nutrition/30`
- **Badges**: Usar `bg-nutrition` para nutrição, outras cores para categorias

---

## ⚠️ Regras de Contraste

### Sempre garantir:
1. **Texto em fundo escuro**: Usar cores `*-foreground` (branco/claro)
2. **Texto em fundo claro**: Usar cores escuras
3. **Contraste mínimo**: 4.5:1 para texto normal, 3:1 para texto grande

### Combinações Seguras:

✅ **Boas combinações:**
- `bg-personal` + `text-personal-foreground` (roxo + branco)
- `bg-nutrition` + `text-nutrition-foreground` (verde + branco)
- `bg-primary` + `text-primary-foreground` (neon + preto)
- `bg-card` + `text-card-foreground` (cinza escuro + branco)

❌ **Más combinações:**
- `bg-personal` + `text-nutrition` (roxo + verde - baixo contraste)
- `bg-background` + `text-muted` (preto + cinza médio - baixo contraste)

---

## 📋 Checklist de Uso de Cores

Antes de adicionar uma cor, pergunte:

- [ ] A cor está relacionada ao contexto (Personal ou Nutrição)?
- [ ] O contraste é adequado (>=4.5:1)?
- [ ] A cor não está sendo usada em excesso?
- [ ] A cor está consistente com outras telas do mesmo contexto?
- [ ] A opacidade está apropriada para o elemento (fundo sutil = 5-10%, destaque = 100%)?

---

**Última atualização**: 2026-02-03  
**Baseado em**: Design System Specification - Fitness App
