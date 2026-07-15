import type { UserRole } from "../auth/types";
import type { ChatRole } from "../../repositories/chatRepository";

interface ChatHistoryItem {
  role: ChatRole;
  content: string;
}

interface BuildChatReplyInput {
  message: string;
  role: UserRole;
  userName?: string;
  recentHistory?: ChatHistoryItem[];
}

type ChatIntent =
  | "nutrition"
  | "workout"
  | "wearable"
  | "sleep"
  | "hydration"
  | "admin"
  | "general";

function detectIntent(message: string): ChatIntent {
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.match(/refeicao|refeição|dieta|alimento|proteina|proteína|macro|caloria|nutri/)) {
    return "nutrition";
  }

  if (lowerMessage.match(/treino|exercicio|exercício|workout|serie|série|carga|personal/)) {
    return "workout";
  }

  if (lowerMessage.match(/wearable|pulseira|relogio|relógio|passos|stress|estresse|sono registrado/)) {
    return "wearable";
  }

  if (lowerMessage.match(/sono|dormir|descanso|recuperacao|recuperação/)) {
    return "sleep";
  }

  if (lowerMessage.match(/agua|água|hidrat/)) {
    return "hydration";
  }

  if (lowerMessage.match(/admin|usuario|usuário|profissional|cadastro|sistema|faturamento/)) {
    return "admin";
  }

  return "general";
}

function clientReply(intent: ChatIntent) {
  const replies: Record<ChatIntent, string> = {
    nutrition:
      "Para melhorar sua alimentacao, eu olharia tres pontos: meta diaria de calorias, proteina por refeicao e consistencia. Se voce me disser seu objetivo e o que comeu hoje, eu monto uma sugestao simples para revisar com seu nutricionista.",
    workout:
      "Para treino, eu preciso entender objetivo, nivel, equipamentos disponiveis e restricoes. Com isso posso sugerir uma estrutura inicial e sinalizar pontos para o personal ajustar com seguranca.",
    wearable:
      "Com dados de wearable, eu consigo ajudar a interpretar passos, sono, frequencia cardiaca e sinais de estresse. A ideia e transformar esses dados em acoes simples para hoje, sem substituir avaliacao profissional.",
    sleep:
      "Sono e recuperacao afetam fome, treino e aderencia. Minha sugestao inicial e observar horario de dormir, cafeina, telas a noite e regularidade. Se voce tiver dados de sono, posso resumir os pontos de atencao.",
    hydration:
      "Para hidratacao, uma meta inicial pratica e distribuir agua ao longo do dia e ajustar em dias de treino. Se voce informar peso, treino de hoje e clima, eu sugiro uma meta aproximada.",
    admin:
      "Como cliente, voce nao precisa cuidar da parte administrativa. Posso te ajudar a entender planos, profissionais disponiveis e proximos passos dentro da plataforma.",
    general:
      "Posso te ajudar com metas, alimentacao, treino, hidratacao, sono e evolucao. Me conte seu objetivo principal agora: perder gordura, ganhar massa, melhorar rotina ou ter acompanhamento profissional.",
  };

  return replies[intent];
}

function nutritionistReply(intent: ChatIntent) {
  const replies: Record<ChatIntent, string> = {
    nutrition:
      "Para construir uma dieta personalizada, comece por objetivo, restricoes, rotina, preferencias e adesao esperada. Posso ajudar a transformar isso em blocos de refeicao e sugestoes de substituicao por macros.",
    workout:
      "Esse ponto toca treino. Vale alinhar com o personal, mas posso ajudar a ajustar alimentacao em torno do treino: pre-treino, pos-treino, proteina diaria e hidratacao.",
    wearable:
      "Dados de wearable podem apoiar aderencia nutricional: sono ruim, estresse alto e baixa atividade mudam fome e planejamento. Posso resumir esses sinais para acompanhar o cliente.",
    sleep:
      "Sono ruim costuma afetar fome, desejo por ultraprocessados e recuperacao. Para o nutricionista, eu destacaria padroes e possiveis ajustes de rotina alimentar noturna.",
    hydration:
      "Para hidratacao, podemos trabalhar meta diaria, distribuicao por horarios e ajuste em dias de treino. Posso ajudar a criar orientacoes simples para o plano alimentar.",
    admin:
      "A parte administrativa deve ficar no painel admin. Para o nutricionista, posso ajudar mais em clientes, planos, substituicoes e analise de adesao.",
    general:
      "Posso apoiar criacao de planos alimentares, substituicoes, leitura de aderencia, ideias de refeicoes e preparacao de orientacoes para clientes.",
  };

  return replies[intent];
}

function trainerReply(intent: ChatIntent) {
  const replies: Record<ChatIntent, string> = {
    nutrition:
      "Esse ponto e nutricional. Posso sugerir perguntas para enviar ao nutricionista e ajustar o treino considerando energia, recuperacao e aderencia alimentar.",
    workout:
      "Para criar um treino sob medida, eu partiria de objetivo, nivel, lesoes, equipamentos, dias por semana e tempo por sessao. Posso montar um rascunho de treino para voce revisar antes de publicar.",
    wearable:
      "Wearables ajudam a adaptar carga: sono, estresse, passos e frequencia cardiaca podem indicar se o treino deve ser intenso, moderado ou regenerativo.",
    sleep:
      "Sono e recuperacao devem influenciar volume e intensidade. Se o cliente dormiu mal, uma sessao tecnica ou mais leve pode ser melhor do que forcar progressao.",
    hydration:
      "Hidratacao afeta performance. Posso criar lembretes simples para antes, durante e depois do treino, principalmente em sessoes longas ou intensas.",
    admin:
      "A parte administrativa fica melhor no painel admin. Para o personal, posso ajudar com alunos, biblioteca de exercicios, templates e ajustes por perfil.",
    general:
      "Posso apoiar criacao de treinos, progressao de carga, substituicao de exercicios, orientacoes tecnicas e leitura de sinais de recuperacao.",
  };

  return replies[intent];
}

function adminReply(intent: ChatIntent) {
  if (intent === "admin") {
    return "Para o painel admin, eu acompanharia usuarios ativos, profissionais cadastrados, clientes por plano, dietas e treinos criados, leads recebidos, faturamento e pendencias de validacao.";
  }

  return "Como admin, seu chat pode ser mais operacional: resumo de uso, leads, profissionais pendentes, conteudos aguardando revisao e alertas do sistema.";
}

function historyNote(recentHistory?: ChatHistoryItem[]) {
  const userMessages = recentHistory?.filter((item) => item.role === "user").length ?? 0;

  if (userMessages < 2) {
    return "";
  }

  return " Vou considerar tambem o que voce ja comentou nesta conversa.";
}

export function buildChatReply(input: BuildChatReplyInput) {
  const intent = detectIntent(input.message);
  const greeting = input.userName ? `${input.userName}, ` : "";

  if (input.role === "nutritionist") {
    return `${greeting}${nutritionistReply(intent)}${historyNote(input.recentHistory)}`;
  }

  if (input.role === "trainer") {
    return `${greeting}${trainerReply(intent)}${historyNote(input.recentHistory)}`;
  }

  if (input.role === "admin") {
    return `${greeting}${adminReply(intent)}${historyNote(input.recentHistory)}`;
  }

  return `${greeting}${clientReply(intent)}${historyNote(input.recentHistory)}`;
}
