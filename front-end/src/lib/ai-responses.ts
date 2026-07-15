/**
 * ai-responses.ts — Respostas simuladas do agente de IA do Fitness Sincera.
 * Centraliza toda a lógica de resposta para facilitar expansão futura.
 */

export interface ConversationTopic {
    id: string;
    label: string;
    icon: string;
}

export const CONVERSATION_TOPICS: ConversationTopic[] = [
    { id: "general", label: "Geral", icon: "💬" },
    { id: "treino", label: "Treino", icon: "🏋️" },
    { id: "nutricao", label: "Nutrição", icon: "🥗" },
    { id: "hidratacao", label: "Hidratação", icon: "💧" },
    { id: "progresso", label: "Progresso", icon: "📈" },
    { id: "sono", label: "Sono", icon: "😴" },
];

export const AI_RESPONSES: Record<string, string> = {
    treino: `Com base no seu perfil (82.5kg, foco em hipertrofia), recomendo hoje um treino de **Membros Superiores — Push**:

1. **Supino Reto** — 4×8-10 (carga: 70kg)
2. **Desenvolvimento com Halteres** — 3×10-12
3. **Supino Inclinado 30°** — 3×10
4. **Elevação Lateral** — 3×15 (carga leve)
5. **Tríceps Corda** — 3×12
6. **Fundos no Banco** — 2×até a falha

⏱ Descanso: 90s entre séries. Progressão de carga a cada semana.`,

    hipertrofia: `Para **maximizar hipertrofia** no seu perfil:

- **Volume semanal:** 15-20 séries por grupo muscular
- **Repetições:** 8-12 (zona de hipertrofia)
- **Carga:** 70-80% do seu 1RM
- **Progressão:** +2.5kg por semana nos compostos

💡 *Dica:* Garanta **1h30min de sono** extra — é quando o GH é liberado para recuperação muscular.`,

    cardio: `Para **queima de gordura** eficiente com seu nível, recomendo:

**HIIT 3x por semana:**
- 10 min aquecimento leve
- 6 rounds: 40s intenso / 20s descanso
- 10 min desaceleração

**LISS 2x por semana:**
- 30-40 min de caminhada rápida ou bicicleta
- Frequência cardíaca: 60-70% da máxima

🔥 **Déficit calórico alvo:** 300-500 kcal/dia`,

    dieta: `Analisando sua dieta de hoje:

- **Consumido:** 920 kcal (de 2.500)
- **Proteína:** 67g ← *abaixo da meta de 160g*
- **Carboidratos:** 105g
- **Gordura:** 29g

**O que ajustar:**
- Adicione **1 scoop de Whey** no lanche pré-treino
- Aumente o frango no jantar para **200g**
- Inclua **ovos** no almoço para proteína adicional

📊 Aderência hoje: **68%** — você consegue!`,

    macros: `Seus macros ideais para **ganho de massa limpa**:

| Macro | Meta/dia | Por kg |
| --- | --- | --- |
| **Proteína** | 165g | 2.0g/kg |
| **Carboidratos** | 312g | 3.8g/kg |
| **Gordura** | 83g | 1.0g/kg |
| **Calorias** | 2.650 kcal | — |

💡 Distribua a proteína em pelo menos **5 refeições** ao longo do dia para absorção ideal.`,

    agua: `Considerando seu peso (82.5kg) e treino hoje:

| | Volume |
| --- | --- |
| Meta base (30ml/kg) | **2.475 ml** |
| Adicional treino | **+600 ml** |
| **Total recomendado** | **3.075 ml** |

Você já bebeu **1.5L** hoje. Faltam **~1.6L** até as 22h.

⏰ *Estratégia:* 250ml a cada hora. Deixe uma garrafinha visível na mesa.`,

    hidratacao: `**Dicas de hidratação inteligente:**

1. **Beba antes de sentir sede** — quando a sede bate, já está desidratado
2. **Urina clara** = hidratação ideal; **amarelo escuro** = beba mais
3. **Eletrólitos** pós-treino intenso (sódio, potássio, magnésio)
4. **Café e chá** contam! São diuréticos leves, mas ainda hidratam
5. **Alimentos hidratantes:** pepino, melancia, laranja, morango

💧 Meta para amanhã: **3.1L** (treino de pernas programado)`,

    evolucao: `Sua evolução nos últimos 30 dias:

- **Peso:** 83.2kg → 82.5kg (-0.7kg) 📉
- **Streak atual:** **31 dias** consecutivos 🔥
- **Treinos completos:** 27 de 31 (87% de aderência)
- **Média calórica:** 2.320 kcal/dia
- **Média de água:** 2.3L/dia

**Próximas metas:**
- Manter streak por mais 60 dias → conquista "Lenda Sincera"
- Aumentar hidratação para 3L/dia
- Meta de peso em 3 meses: **80.5kg**`,

    progresso: `📊 **Relatório de Progresso — Março 2024:**

**Composição corporal:**
- Massa muscular estimada: **↑ +0.8kg**
- Gordura corporal: **↓ -1.5kg**
- IMC: 24.6 (normal)

**Performance:**
- Supino: 80kg → 87.5kg (+9%)
- Agachamento: 120kg → 132.5kg (+10%)
- Corrida 5km: 28min → 25min30s

🎯 Você está superando a média dos usuários Pro! Continue assim.`,

    sono: `**Análise do seu sono e recuperação:**

O sono é quando **70% da recuperação muscular** acontece. Problemas no sono impactam diretamente:
- Produção de GH (hormônio do crescimento)
- Síntese proteica
- Produção de testosterona

**Para melhorar:**
1. Durma entre **22h-23h** (ciclos circadianos)
2. Evite telas **1h antes** de dormir
3. Quarto: **frio (18-20°C)** e escuro
4. Evite cafeína após **14h**
5. Suplementos: magnésio glicinato ou ashwagandha

⭐ **Meta:** 7-8h de sono de qualidade por noite`,

    suplementacao: `**Suplementação recomendada para o seu perfil:**

| Suplemento | Dose | Horário |
| --- | --- | --- |
| **Creatina** | 5g | Qualquer horário (pós-treino ideal) |
| **Whey Protein** | 1 scoop (30g proteína) | Pós-treino |
| **Vitamina D3** | 2.000-4.000 UI | Com refeição gordurosa |
| **Ômega-3** | 2g EPA+DHA | Com refeição |
| **Magnésio** | 300mg | Antes de dormir |

❌ **Não precisa de:** pré-treino termogênico, BCAA (redundante com Whey), fat burners

💡 Creatina e Whey têm as **melhores evidências científicas** para hipertrofia.`,

    default: `Entendido! Analisei seu perfil, histórico de treinos e plano alimentar para dar a melhor recomendação personalizada.

Você está no caminho certo com **31 dias de streak**! 💪

Posso te ajudar com:
- 🏋️ Sugestões de treino para hoje
- 🥗 Análise da sua dieta
- 💧 Meta de hidratação
- 📈 Análise de evolução e progresso
- 😴 Dicas de recuperação e sono
- 💊 Orientações de suplementação

O que você gostaria de explorar?`,
};

export function getAIResponse(message: string): string {
    const lower = message.toLowerCase();

    if (lower.match(/treino|exercício|academia|musculação|malhar|treinar/)) {
        if (lower.match(/hipertrofia|massa|ganho/)) return AI_RESPONSES["hipertrofia"];
        if (lower.match(/cardio|correr|queimar|gordura/)) return AI_RESPONSES["cardio"];
        return AI_RESPONSES["treino"];
    }
    if (lower.match(/dieta|alimenta|comida|refeição|comer|calorias/)) {
        if (lower.match(/macro|proteína|carboidrato|gordura/)) return AI_RESPONSES["macros"];
        return AI_RESPONSES["dieta"];
    }
    if (lower.match(/água|hidrat|beber|sede/)) {
        if (lower.match(/dica|como|quanto|estratégia/)) return AI_RESPONSES["hidratacao"];
        return AI_RESPONSES["agua"];
    }
    if (lower.match(/evolução|progresso|resultado|melhora/)) return AI_RESPONSES["evolucao"];
    if (lower.match(/peso|composição|imc|gordura corporal/)) return AI_RESPONSES["progresso"];
    if (lower.match(/sono|descanso|recupera|dormir/)) return AI_RESPONSES["sono"];
    if (lower.match(/suplemento|whey|creatina|vitamina|proteína em pó/)) return AI_RESPONSES["suplementacao"];

    return AI_RESPONSES["default"];
}

export interface MockConversation {
    id: string;
    title: string;
    preview: string;
    timestamp: string;
    topic: string;
}

export const MOCK_CONVERSATIONS: MockConversation[] = [
    { id: "conv-1", title: "Treino de hipertrofia para hoje", preview: "Recomendo hoje um treino de Membros Superiores...", timestamp: "Hoje, 09:14", topic: "treino" },
    { id: "conv-2", title: "Análise da minha dieta", preview: "Analisando sua dieta de hoje: Consumido 920 kcal...", timestamp: "Ontem", topic: "nutricao" },
    { id: "conv-3", title: "Quanto de água beber?", preview: "Considerando seu peso (82.5kg) e treino hoje...", timestamp: "25 fev", topic: "hidratacao" },
    { id: "conv-4", title: "Evolução dos últimos 30 dias", preview: "Sua evolução: -0.7kg, 31 dias de streak...", timestamp: "22 fev", topic: "progresso" },
    { id: "conv-5", title: "Suplementação básica", preview: "Creatina, Whey e Vitamina D3 têm as melhores evidências...", timestamp: "18 fev", topic: "treino" },
    { id: "conv-6", title: "Melhorar qualidade do sono", preview: "O sono é quando 70% da recuperação muscular acontece...", timestamp: "15 fev", topic: "sono" },
];

export const CHAT_SUGGESTIONS = [
    { icon: "🏋️", label: "Treino de hoje", prompt: "Sugira um treino de hipertrofia para hoje" },
    { icon: "🥗", label: "Analisar dieta", prompt: "Analise minha dieta de hoje e sugira melhorias nos macros" },
    { icon: "📈", label: "Ver evolução", prompt: "Como está minha evolução e progresso nas últimas semanas?" },
    { icon: "💧", label: "Hidratação", prompt: "Quanto de água devo beber hoje considerando meu treino?" },
    { icon: "😴", label: "Recuperação", prompt: "Como melhorar meu sono e recuperação muscular?" },
    { icon: "💊", label: "Suplementação", prompt: "Quais suplementos são recomendados para o meu perfil?" },
];
