import { useState, useEffect, useRef } from "react";
import { DashboardLayout } from "@/layout/DashboardLayout";
import { ProSidebar } from "@/layout/ProSidebar";
import { useAuth } from "@/features/auth/AuthProvider";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Paperclip,
  Image as ImageIcon,
  Camera,
  ArrowUp,
  SquarePen,
  ChevronLeft,
  Menu,
  Loader2,
  Sparkles,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useProfile } from "@/lib/hooks/use-profile";
import {
  getAIResponse,
  MOCK_CONVERSATIONS,
  CHAT_SUGGESTIONS,
  CONVERSATION_TOPICS,
  type MockConversation,
} from "@/lib/ai-responses";

// ─── Types ───────────────────────────────────────────────────────────────────

interface ChatMessage {
  id: number;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

// ─── Markdown-lite renderer ───────────────────────────────────────────────────

function renderMarkdown(text: string, isDark: boolean) {
  const lines = text.split("\n");
  return lines.map((line, i) => {
    // Bold **text**
    const parts = line.split(/(\*\*[^*]+\*\*)/g);
    const rendered = parts.map((part, j) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={j} className={isDark ? "text-[#d4f54c]" : "text-slate-900"}>
            {part.slice(2, -2)}
          </strong>
        );
      }
      return <span key={j}>{part}</span>;
    });
    return (
      <span key={i}>
        {rendered}
        {i < lines.length - 1 && <br />}
      </span>
    );
  });
}

// ─── Sidebar ─────────────────────────────────────────────────────────────────

interface SidebarProps {
  conversations: MockConversation[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onNew: () => void;
  onClose?: () => void;
  mobile?: boolean;
}

function ChatSidebar({ conversations, activeId, onSelect, onNew, onClose, mobile }: SidebarProps) {
  return (
    <div
      className={cn(
        "flex flex-col bg-[#1a1c1e] h-full",
        mobile ? "w-full" : "w-64 flex-shrink-0"
      )}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-[#d4f54c] rounded-lg flex items-center justify-center">
            <Sparkles size={14} className="text-black" />
          </div>
          <span className="text-white font-bold text-sm">Agente Fitness</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={onNew}
            title="Nova conversa"
            className="p-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors"
          >
            <SquarePen size={16} />
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Tópicos */}
      <div className="px-3 pt-4 pb-2">
        <p className="text-[10px] text-white/30 uppercase tracking-widest font-bold mb-2 px-2">Tópicos</p>
        <div className="flex flex-wrap gap-1.5">
          {CONVERSATION_TOPICS.map((t) => (
            <button
              key={t.id}
              onClick={onNew}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/8 hover:bg-white/15 text-white/60 hover:text-white text-[11px] font-medium transition-colors border border-white/10"
            >
              <span>{t.icon}</span>
              <span>{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Conversations list */}
      <div className="flex-1 overflow-y-auto px-2 py-2 space-y-0.5">
        <p className="text-[10px] text-white/30 uppercase tracking-widest font-bold mb-2 px-2">Histórico</p>
        {conversations.map((conv) => (
          <button
            key={conv.id}
            onClick={() => onSelect(conv.id)}
            className={cn(
              "w-full text-left px-3 py-2.5 rounded-xl transition-all group",
              activeId === conv.id
                ? "bg-white/15 text-white"
                : "hover:bg-white/8 text-white/60 hover:text-white/90"
            )}
          >
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-sm">{conv.topic === "treino" ? "🏋️" : conv.topic === "nutricao" ? "🥗" : conv.topic === "hidratacao" ? "💧" : conv.topic === "progresso" ? "📈" : conv.topic === "sono" ? "😴" : "💬"}</span>
              <p className="text-xs font-semibold truncate">{conv.title}</p>
            </div>
            <p className="text-[10px] text-white/30 truncate pl-6">{conv.timestamp}</p>
          </button>
        ))}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-white/10">
        <p className="text-[10px] text-center text-white/20 uppercase tracking-widest font-bold">
          Fitness Sincera AI · Beta
        </p>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ChatPage() {
  const { session } = useAuth();
  const { data: profile } = useProfile();
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [conversations, setConversations] = useState<MockConversation[]>(MOCK_CONVERSATIONS);
  const [activeConvId, setActiveConvId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const isEmptyChat = chatHistory.length === 0;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatHistory, isTyping]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 160)}px`;
    }
  }, [message]);

  const handleSend = (text?: string) => {
    const content = (text || message).trim();
    if (!content) return;

    const userMsg: ChatMessage = {
      id: Date.now(),
      role: "user",
      content,
      timestamp: new Date(),
    };
    setChatHistory((prev) => [...prev, userMsg]);
    setMessage("");
    setIsTyping(true);

    // Save as new conversation if it's the first message
    if (chatHistory.length === 0) {
      const newConv: MockConversation = {
        id: `conv-new-${Date.now()}`,
        title: content.slice(0, 40) + (content.length > 40 ? "..." : ""),
        preview: content,
        timestamp: "Agora",
        topic: "general",
      };
      setConversations((prev) => [newConv, ...prev]);
      setActiveConvId(newConv.id);
    }

    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content: getAIResponse(content),
        timestamp: new Date(),
      };
      setChatHistory((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 600);
  };

  const handleNewConversation = () => {
    setChatHistory([]);
    setActiveConvId(null);
    setSidebarOpen(false);
  };

  const handleSelectConversation = (id: string) => {
    setActiveConvId(id);
    setSidebarOpen(false);
    // In a real app this would load the conversation messages
    // For demo, start a new empty chat
    setChatHistory([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const isProUser = session?.role === "nutritionist" || session?.role === "trainer";

  const chatInner = (
        <div className="flex-1 flex overflow-hidden rounded-[28px] md:rounded-[36px]">

          {/* ── Desktop Sidebar ── */}
          <div className="hidden md:flex flex-shrink-0">
            <ChatSidebar
              conversations={conversations}
              activeId={activeConvId}
              onSelect={handleSelectConversation}
              onNew={handleNewConversation}
            />
          </div>

          {/* ── Mobile Sidebar Overlay ── */}
          {sidebarOpen && (
            <div className="md:hidden fixed inset-0 z-50 flex">
              <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={() => setSidebarOpen(false)}
              />
              <div className="relative w-[280px] h-full z-10 shadow-2xl">
                <ChatSidebar
                  conversations={conversations}
                  activeId={activeConvId}
                  onSelect={handleSelectConversation}
                  onNew={handleNewConversation}
                  onClose={() => setSidebarOpen(false)}
                  mobile
                />
              </div>
            </div>
          )}

          {/* ── Main Chat Area ── */}
          <div className="flex-1 bg-[#e9e9e9] flex flex-col overflow-hidden">

            {/* Chat Topbar */}
            <div className="flex items-center justify-between px-4 md:px-6 py-3 border-b border-slate-200/80 bg-white/50 backdrop-blur-sm flex-shrink-0">
              <div className="flex items-center gap-3">
                {/* Mobile menu button */}
                <button
                  className="md:hidden p-2 rounded-xl hover:bg-slate-100 text-slate-500 transition-colors"
                  onClick={() => setSidebarOpen(true)}
                >
                  <Menu size={20} />
                </button>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-[#1a1c1e] rounded-lg flex items-center justify-center">
                    <Sparkles size={14} className="text-[#d4f54c]" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">Agente Fitness</p>
                    <p className="text-[10px] text-slate-400 font-medium">IA personalizada · Online</p>
                  </div>
                </div>
              </div>
              <button
                onClick={handleNewConversation}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold transition-colors"
              >
                <SquarePen size={13} />
                <span className="hidden sm:inline">Nova conversa</span>
              </button>
            </div>

            {/* Messages / Empty State */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-4 md:px-8 lg:px-12 pt-6 pb-4"
            >
              {isEmptyChat ? (
                /* ── Empty State ── */
                <div className="flex flex-col items-center justify-center h-full text-center px-4 max-w-3xl mx-auto">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-[#1a1c1e] rounded-[20px] flex items-center justify-center mb-5 shadow-lg">
                    <Sparkles size={28} className="text-[#d4f54c]" />
                  </div>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight mb-2">
                    Como posso te ajudar?
                  </h2>
                  <p className="text-slate-500 text-sm md:text-base font-medium max-w-xl mb-10 leading-relaxed">
                    Sou seu assistente de performance. Pergunte sobre treinos, nutrição, hidratação, evolução ou suplementação.
                  </p>

                  {/* Suggestion Cards */}
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 md:gap-3 w-full max-w-2xl">
                    {CHAT_SUGGESTIONS.map((s) => (
                      <button
                        key={s.label}
                        onClick={() => handleSend(s.prompt)}
                        className="flex items-start gap-3 bg-white p-4 md:p-5 rounded-2xl border border-slate-100 text-left hover:border-[#d4f54c] hover:shadow-md transition-all duration-200 group active:scale-[0.98]"
                      >
                        <span className="text-xl flex-shrink-0 mt-0.5">{s.icon}</span>
                        <span className="text-sm font-semibold text-slate-700 group-hover:text-slate-900 transition-colors leading-snug">
                          {s.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                /* ── Messages ── */
                <div className="max-w-3xl mx-auto space-y-5 md:space-y-6 pb-4">
                  {chatHistory.map((msg) => (
                    <div
                      key={msg.id}
                      className={cn(
                        "flex w-full",
                        msg.role === "user" ? "justify-end" : "justify-start"
                      )}
                    >
                      <div
                        className={cn(
                          "flex gap-3 max-w-[88%] md:max-w-[80%]",
                          msg.role === "user" ? "flex-row-reverse" : "flex-row"
                        )}
                      >
                        {/* Avatar */}
                        {msg.role === "user" ? (
                          <Avatar className="w-8 h-8 flex-shrink-0 border-2 border-white shadow-sm mt-1">
                            <AvatarImage src={profile?.avatar} />
                            <AvatarFallback className="bg-slate-800 text-white text-xs font-bold">
                              {profile?.name?.slice(0, 2).toUpperCase() ?? "LB"}
                            </AvatarFallback>
                          </Avatar>
                        ) : (
                          <div className="w-8 h-8 rounded-full flex-shrink-0 bg-[#1a1c1e] flex items-center justify-center shadow-sm mt-1">
                            <Sparkles size={14} className="text-[#d4f54c]" />
                          </div>
                        )}

                        {/* Bubble */}
                        <div
                          className={cn(
                            "px-4 md:px-5 py-3 md:py-3.5 text-sm md:text-[15px] leading-relaxed",
                            msg.role === "user"
                              ? "bg-[#1a1c1e] text-white rounded-[20px] rounded-tr-md shadow-sm"
                              : "bg-white text-slate-700 rounded-[20px] rounded-tl-md shadow-sm border border-slate-100"
                          )}
                        >
                          {renderMarkdown(msg.content, msg.role === "user")}
                          <p className={cn(
                            "text-[10px] mt-2 font-medium",
                            msg.role === "user" ? "text-white/40 text-right" : "text-slate-400"
                          )}>
                            {msg.timestamp.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full flex-shrink-0 bg-[#1a1c1e] flex items-center justify-center shadow-sm">
                          <Sparkles size={14} className="text-[#d4f54c]" />
                        </div>
                        <div className="bg-white px-5 py-4 rounded-[20px] rounded-tl-md shadow-sm border border-slate-100">
                          <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                            <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                            <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* ── Input Area ── */}
            <div className="px-4 md:px-8 lg:px-12 pb-4 md:pb-6 pt-2 flex-shrink-0 bg-[#e9e9e9]">
              <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-[24px] md:rounded-[28px] border border-slate-200/60 shadow-lg p-3 md:p-4 flex flex-col gap-2.5">

                  {/* Textarea input */}
                  <textarea
                    ref={textareaRef}
                    rows={1}
                    placeholder="Pergunte sobre treinos, dieta, evolução..."
                    className="w-full bg-transparent border-none focus:outline-none text-slate-800 placeholder-slate-400 text-sm md:text-base font-medium px-2 py-1 resize-none leading-relaxed min-h-[36px] max-h-[160px]"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={isTyping}
                  />

                  {/* Actions Row */}
                  <div className="flex items-center justify-between border-t border-slate-100 pt-2.5">
                    <div className="flex items-center gap-1 text-slate-300">
                      <button className="hover:text-slate-500 transition-colors p-2 rounded-xl hover:bg-slate-50" title="Anexar arquivo">
                        <Paperclip size={18} strokeWidth={1.5} />
                      </button>
                      <button className="hover:text-slate-500 transition-colors p-2 rounded-xl hover:bg-slate-50" title="Enviar imagem">
                        <ImageIcon size={18} strokeWidth={1.5} />
                      </button>
                      <button className="hover:text-slate-500 transition-colors p-2 rounded-xl hover:bg-slate-50" title="Câmera">
                        <Camera size={18} strokeWidth={1.5} />
                      </button>
                    </div>

                    {/* Send Button */}
                    <button
                      onClick={() => handleSend()}
                      disabled={!message.trim() || isTyping}
                      className={cn(
                        "w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center transition-all active:scale-95",
                        message.trim() && !isTyping
                          ? "bg-[#1a1c1e] text-[#d4f54c] hover:bg-black shadow-md"
                          : "bg-slate-100 text-slate-300 cursor-not-allowed"
                      )}
                    >
                      {isTyping ? (
                        <Loader2 size={18} className="animate-spin" />
                      ) : (
                        <ArrowUp size={18} strokeWidth={2.5} />
                      )}
                    </button>
                  </div>
                </div>

                <p className="text-[10px] text-center text-slate-400 mt-3 uppercase tracking-[0.15em] font-bold">
                  Agente Fitness Sincera · IA simulada para demonstração
                </p>
              </div>
            </div>
          </div>
        </div>
  );

  if (isProUser) {
    return (
      <div className="h-screen bg-[#111111] overflow-hidden flex flex-col">
        <ProSidebar role={session?.role as "nutritionist" | "trainer"} />
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between px-4 py-3 bg-[#1a1c1e] border-b border-white/10 flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-[#d4f54c] rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-black" />
            </div>
            <span className="text-lg font-bold text-white tracking-tight">Flux Pro</span>
          </div>
          <button
            className="p-2 rounded-xl text-white hover:bg-white/10 transition-colors"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={20} />
          </button>
        </div>
        <main className="flex-1 md:pl-64 overflow-hidden flex p-3 md:p-4">
          {chatInner}
        </main>
      </div>
    );
  }

  return (
    <DashboardLayout>
      {chatInner}
    </DashboardLayout>
  );
}
