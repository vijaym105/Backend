import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useChat } from "../hooks/useChat";

/* ---------- Icons (inline, no dependencies) ---------- */
const Icon = ({ children, className = "h-5 w-5" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {children}
  </svg>
);

const LayersIcon = (p) => (
  <Icon {...p}>
    <path d="M12 3 3 8l9 5 9-5-9-5Z" />
    <path d="m3 13 9 5 9-5" />
    <path d="m3 17.5 9 5 9-5" opacity=".0" />
  </Icon>
);
const PlusIcon = (p) => (
  <Icon {...p}>
    <path d="M12 5v14M5 12h14" />
  </Icon>
);
const SendIcon = (p) => (
  <Icon {...p}>
    <path d="M22 2 11 13" />
    <path d="M22 2 15 22l-4-9-9-4 20-7Z" />
  </Icon>
);
const LogoutIcon = (p) => (
  <Icon {...p}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <path d="m16 17 5-5-5-5M21 12H9" />
  </Icon>
);

/* ---------- Seed data ---------- */
const time = () =>
  new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });

const SEED = [
  {
    id: 1,
    title: "Design system tokens",
    preview: "How should I structure color tokens?",
    messages: [
      {
        id: "m1",
        role: "user",
        text: "How should I structure color tokens in a design system?",
        time: "2:14 PM",
      },
      {
        id: "m2",
        role: "assistant",
        time: "2:14 PM",
        text: [
          "A solid token system uses three layers:",
          ["Primitive tokens", "raw values like blue-500: #3b82f6"],
          ["Semantic tokens", "intent aliases like primary: {blue-500}"],
          ["Component tokens", "scoped like button-bg: {primary}"],
          "This lets you retheme globally by swapping semantic tokens without touching components.",
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Glassmorphism best practices",
    preview: "Best practices for glass effects",
    messages: [],
  },
  {
    id: 3,
    title: "React state patterns",
    preview: "Context vs Zustand vs Redux",
    messages: [],
  },
  {
    id: 4,
    title: "API rate limiting",
    preview: "Strategies for throttling requests",
    messages: [],
  },
];


/* ---------- Message renderer ---------- */
function MessageBody({ text }) {
  if (typeof text === "string") return <p>{text}</p>;
  return (
    <div className="space-y-4">
      {text.map((line, i) =>
        Array.isArray(line) ? (
          <p key={i}>
            <span className="font-semibold text-white">{line[0]}</span>
            <span className="text-slate-200"> — {line[1]}</span>
          </p>
        ) : (
          <p key={i}>{line}</p>
        )
      )}
    </div>
  );
}

/* ---------- Dashboard ---------- */
const Dashboard = ({ onLogout = () => {} }) => {
  const chat = useChat();
  const authUser = useSelector((state) => state.auth.user);

  const displayName = authUser?.username || authUser?.name || "User Account";
  const user = {
    name: displayName,
    email: authUser?.email || "",
    initial: displayName.charAt(0).toUpperCase(),
  };

  // connect socket once on mount
  useEffect(() => {
    chat.initializeSocketConnection();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [chats, setChats] = useState(SEED);
  const [activeId, setActiveId] = useState(1);
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef(null);
  const taRef = useRef(null);

  const active = useMemo(
    () => chats.find((c) => c.id === activeId),
    [chats, activeId]
  );

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [active?.messages.length, typing]);

  // auto-grow textarea
  useEffect(() => {
    const el = taRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 160) + "px";
  }, [draft]);

  const newConversation = () => {
    const id = Date.now();
    setChats((c) => [
      { id, title: "New conversation", preview: "No messages yet", messages: [] },
      ...c,
    ]);
    setActiveId(id);
    setDraft("");
    taRef.current?.focus();
  };

  const send = () => {
    const text = draft.trim();
    if (!text || typing) return;
    const chatId = activeId;
    const userMsg = { id: crypto.randomUUID(), role: "user", text, time: time() };

    setChats((all) =>
      all.map((c) =>
        c.id === chatId
          ? {
              ...c,
              title: c.messages.length ? c.title : text.slice(0, 32),
              preview: text,
              messages: [...c.messages, userMsg],
            }
          : c
      )
    );
    setDraft("");
    setTyping(true);

    // Replace this timeout with your real API call.
    setTimeout(() => {
      const reply = {
        id: crypto.randomUUID(),
        role: "assistant",
        text: "This is a placeholder reply. Connect your backend here to stream a real response.",
        time: time(),
      };
      setChats((all) =>
        all.map((c) =>
          c.id === chatId ? { ...c, messages: [...c.messages, reply] } : c
        )
      );
      setTyping(false);
    }, 900);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="relative flex h-screen w-full overflow-hidden bg-[#06040f] font-sans text-slate-100 antialiased">
      {/* ambient background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-violet-700/25 blur-[140px]" />
        <div className="absolute -bottom-52 right-0 h-[560px] w-[560px] rounded-full bg-blue-600/20 blur-[160px]" />
      </div>

      {/* ---------- Sidebar ---------- */}
      <aside className="relative z-10 hidden w-[330px] shrink-0 flex-col border-r border-white/10 bg-white/[0.03] backdrop-blur-xl md:flex">
        <div className="flex items-center justify-between px-5 pb-4 pt-9">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 to-violet-500 text-white shadow-lg shadow-violet-500/30">
              <LayersIcon />
            </div>
            <span className="text-2xl font-bold tracking-tight">Nexora</span>
          </div>
          <span className="rounded-md border border-cyan-400/30 bg-cyan-400/10 px-2.5 py-1 text-xs font-medium text-cyan-300">
            Beta
          </span>
        </div>

        <div className="px-5">
          <button
            onClick={newConversation}
            className="flex w-full items-center gap-3 rounded-xl border border-white/10 bg-violet-500/10 px-4 py-3 text-left font-medium text-slate-100 transition hover:border-violet-400/40 hover:bg-violet-500/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
          >
            <PlusIcon className="h-5 w-5 text-slate-300" />
            New conversation
          </button>
        </div>

        <p className="px-7 pb-3 pt-8 text-xs font-medium tracking-[0.14em] text-slate-500">
          RECENT
        </p>

        <nav className="flex-1 space-y-1 overflow-y-auto px-5 pb-4">
          {chats.map((c) => {
            const isActive = c.id === activeId;
            return (
              <button
                key={c.id}
                onClick={() => setActiveId(c.id)}
                className={`w-full rounded-xl border px-4 py-3.5 text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 ${
                  isActive
                    ? "border-violet-400/40 bg-white/[0.07]"
                    : "border-transparent hover:bg-white/[0.04]"
                }`}
              >
                <span className="block truncate text-[15px] font-semibold text-slate-100">
                  {c.title}
                </span>
                <span className="mt-1 block truncate text-sm text-slate-400">
                  {c.preview}
                </span>
              </button>
            );
          })}
        </nav>

        <div className="p-5">
          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-purple-600 font-semibold">
              {user.initial}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{user.name}</p>
              <p className="truncate text-sm text-slate-400">{user.email}</p>
            </div>
            <button
              onClick={onLogout}
              aria-label="Log out"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-slate-400 transition hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
            >
              <LogoutIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* ---------- Main ---------- */}
      <main className="relative z-10 flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-white/10 bg-white/[0.02] px-6 py-5 backdrop-blur-xl md:px-9">
          <div className="min-w-0">
            <h1 className="truncate text-lg font-semibold">{active?.title}</h1>
            <p className="mt-1 text-sm text-slate-400">
              {active?.messages.length} message
              {active?.messages.length === 1 ? "" : "s"}
            </p>
          </div>
          <span className="flex shrink-0 items-center gap-2 rounded-lg border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-300">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
            Nexora Pro
          </span>
        </header>

        {/* messages */}
        <section className="flex-1 overflow-y-auto px-6 py-8 md:px-9">
          <div className="mx-auto flex max-w-5xl flex-col gap-8">
            {active?.messages.length === 0 && (
              <div className="mt-24 text-center text-slate-400">
                <p className="text-lg font-medium text-slate-200">
                  Start the conversation
                </p>
                <p className="mt-1 text-sm">
                  Ask Nexora anything about your project.
                </p>
              </div>
            )}

            {active?.messages.map((m) =>
              m.role === "user" ? (
                <div key={m.id} className="flex flex-col items-end gap-2">
                  <div className="flex items-start gap-4">
                    <div className="max-w-2xl rounded-2xl rounded-tr-md border border-violet-400/20 bg-gradient-to-br from-violet-600/30 to-indigo-600/20 px-5 py-4 text-[17px] shadow-lg shadow-black/20">
                      {m.text}
                    </div>
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-purple-600 font-semibold">
                      {user.initial}
                    </div>
                  </div>
                  <span className="mr-14 text-xs text-slate-400">{m.time}</span>
                </div>
              ) : (
                <div key={m.id} className="flex items-start gap-4">
                  <div className="relative shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 to-violet-500 text-white">
                      <LayersIcon className="h-5 w-5" />
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#0b0818] bg-emerald-400" />
                  </div>
                  <div className="flex max-w-[46rem] flex-col gap-2">
                    <div className="rounded-2xl rounded-tl-md border border-white/10 bg-white/[0.05] px-5 py-4 text-[17px] leading-relaxed text-slate-200 shadow-lg shadow-black/20 backdrop-blur-md">
                      <MessageBody text={m.text} />
                    </div>
                    <span className="text-xs text-sky-300/80">{m.time}</span>
                  </div>
                </div>
              )
            )}

            {typing && (
              <div className="flex items-center gap-4" aria-live="polite">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 to-violet-500">
                  <LayersIcon className="h-5 w-5" />
                </div>
                <div className="flex gap-1.5 rounded-2xl border border-white/10 bg-white/[0.05] px-5 py-4">
                  {[0, 150, 300].map((d) => (
                    <span
                      key={d}
                      style={{ animationDelay: `${d}ms` }}
                      className="h-2 w-2 animate-bounce rounded-full bg-slate-400"
                    />
                  ))}
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>
        </section>

        {/* composer */}
        <footer className="px-6 pb-6 md:px-9">
          <div className="mx-auto max-w-5xl rounded-2xl border border-white/10 bg-white/[0.04] px-5 pb-3 pt-4 backdrop-blur-xl transition focus-within:border-violet-400/50">
            <div className="flex items-end gap-3">
              <textarea
                ref={taRef}
                rows={1}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Message Nexora... (Enter to send)"
                className="max-h-40 flex-1 resize-none bg-transparent py-1 text-[17px] text-slate-100 placeholder-slate-500 outline-none"
              />
              <button
                onClick={send}
                disabled={!draft.trim() || typing}
                aria-label="Send message"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-slate-300 transition enabled:hover:bg-violet-500 enabled:hover:text-white disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
              >
                <SendIcon className="h-5 w-5" />
              </button>
            </div>
            <p className="mt-2 text-center text-xs text-slate-500">
              Nexora may make mistakes. Verify important information.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Dashboard;
