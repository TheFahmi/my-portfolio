"use client";

import { useState, useRef, useEffect } from "react";
import { Send, X, Bot, MessageSquare } from "lucide-react";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export default function AIChatBox() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [locale, setLocale] = useState<"en" | "id">("en");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const copy = {
    en: {
      ariaOpen: "Open AI chat",
      ariaClose: "Close AI chat",
      prompt: "Questions about Fahmi? Chat here.",
      greeting: "Hi! How can I help you learn about Fahmi?",
      hint: "Ask about projects, skills, experience, or services.",
      typing: "Typing...",
      placeholder: "Ask anything...",
      error: "🤵 Sorry, something went wrong. Please try again later.",
      connectionError: "🤵 Sorry, failed to connect to the server. Please try again later.",
    },
    id: {
      ariaOpen: "Buka chat AI",
      ariaClose: "Tutup chat AI",
      prompt: "Mau tanya tentang Fahmi? Chat di sini.",
      greeting: "Halo! Ada yang bisa saya bantu tentang Fahmi?",
      hint: "Tanya soal proyek, skill, pengalaman, atau layanan.",
      typing: "Mengetik...",
      placeholder: "Tanya apa saja...",
      error: "🤵 Maaf, terjadi kesalahan. Coba lagi nanti.",
      connectionError: "🤵 Maaf, gagal terhubung ke server. Coba lagi nanti.",
    },
  };
  const t = copy[locale];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const pathLocale = window.location.pathname.split("/")[1];
    if (pathLocale === "id" || pathLocale === "en") {
      setLocale(pathLocale);
      return;
    }

    setLocale(navigator.language?.toLowerCase().startsWith("id") ? "id" : "en");
  }, []);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, { role: "user", content: userMessage }],
        }),
      });

      const data = await response.json();

      if (data.content) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.content }]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: t.error },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: t.connectionError },
      ]);
    } finally {
      setIsLoading(false);
    }
  };


  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-7 left-24 md:bottom-9 md:left-28 z-40 max-w-[220px] rounded-2xl px-4 py-3 text-left text-sm shadow-md transition-colors duration-200 cursor-pointer"
          style={{
            backgroundColor: "var(--theme-bg-card)",
            color: "var(--theme-fg)",
            border: "1px solid var(--theme-border)",
          }}
          aria-label={t.ariaOpen}
        >
          <span className="block font-medium leading-snug">{t.prompt}</span>
        </button>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 md:bottom-8 md:left-8 z-40 h-14 w-14 rounded-full shadow-md transition-colors duration-200 flex items-center justify-center cursor-pointer"
        style={{
          backgroundColor: "var(--theme-bg-card)",
          color: "var(--theme-fg)",
          border: "1px solid var(--theme-border)",
        }}
        aria-label={isOpen ? t.ariaClose : t.ariaOpen}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          ref={chatContainerRef}
          className="fixed bottom-24 left-6 z-40 w-[calc(100vw-3rem)] max-w-96 h-[500px] rounded-xl shadow-xl flex flex-col overflow-hidden"
          style={{
            animation: "chatSlideUp 0.25s ease-out",
            backgroundColor: "var(--theme-bg-card)",
            border: "1px solid var(--theme-border)",
          }}
        >
          <style jsx>{`
            @keyframes chatSlideUp {
              from {
                opacity: 0;
                transform: translateY(12px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `}</style>

          {/* Header */}
          <div
            className="flex items-center justify-between p-4"
            style={{
              backgroundColor: "var(--theme-bg-secondary)",
              color: "var(--theme-fg)",
              borderBottom: "1px solid var(--theme-border)",
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="h-9 w-9 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: "var(--theme-bg-card)",
                  border: "1px solid var(--theme-border)",
                }}
              >
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold text-sm">AI Assistant</p>
                <p className="text-xs" style={{ opacity: 0.6 }}>
                  M Fahmi Hassan Portfolio
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg transition-colors cursor-pointer"
              style={{ color: "inherit" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "transparent")
              }
              aria-label="Tutup chat"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.length === 0 && (
              <div className="text-center py-8">
                <Bot
                  className="h-10 w-10 mx-auto mb-3"
                  style={{ color: "var(--theme-fg-dim)", opacity: 0.5 }}
                />
                <p className="text-sm" style={{ color: "var(--theme-fg)" }}>
                  {t.greeting}
                </p>
                <p
                  className="text-xs mt-1"
                  style={{ color: "var(--theme-fg-muted)" }}
                >
                  {t.hint}
                </p>
              </div>
            )}
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "user" ? (
                  <div
                    className="max-w-[80%] px-4 py-2 rounded-2xl rounded-br-none"
                    style={{
                      backgroundColor: "var(--theme-fg)",
                      color: "var(--theme-bg)",
                    }}
                  >
                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                  </div>
                ) : (
                  <div
                    className="max-w-[80%] px-4 py-2 rounded-2xl rounded-bl-none"
                    style={{
                      backgroundColor: "var(--theme-bg-secondary)",
                      color: "var(--theme-fg)",
                    }}
                  >
                    <div className="text-sm leading-relaxed prose-chat">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                          strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                          ul: ({ children }) => <ul className="my-2 ml-4 list-disc space-y-1">{children}</ul>,
                          ol: ({ children }) => <ol className="my-2 ml-4 list-decimal space-y-1">{children}</ol>,
                          li: ({ children }) => <li>{children}</li>,
                          code: ({ children }) => (
                            <code
                              className="px-1 py-0.5 rounded text-xs font-mono"
                              style={{ backgroundColor: "var(--theme-bg-card-hover)" }}
                            >
                              {children}
                            </code>
                          ),
                          a: ({ href, children }) => (
                            <a
                              href={href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="underline underline-offset-2"
                              style={{ color: "var(--theme-fg-secondary)" }}
                            >
                              {children}
                            </a>
                          ),
                        }}
                      >
                        {msg.content}
                      </ReactMarkdown>
                    </div>
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Loading indicator */}
          {isLoading && (
            <div
              className="flex items-center gap-2 px-4 py-2"
              style={{ color: "var(--theme-fg-muted)" }}
            >
              <div
                className="h-4 w-4 border-2 border-t-transparent rounded-full animate-spin"
                style={{ borderColor: "var(--theme-fg-muted)", borderTopColor: "transparent" }}
              />
              <span className="text-sm">{t.typing}</span>
            </div>
          )}

          {/* Input */}
          <div
            className="p-3"
            style={{ borderTop: "1px solid var(--theme-border)" }}
          >
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t.placeholder}
                className="flex-1 px-4 py-2 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-current/30"
                style={{
                  backgroundColor: "var(--theme-input-bg)",
                  color: "var(--theme-fg)",
                  border: "1px solid var(--theme-border)",
                  caretColor: "var(--theme-fg)",
                }}
                disabled={isLoading}
                aria-label="Pesan ke AI"
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                className="p-2 disabled:opacity-40 disabled:cursor-not-allowed rounded-full transition-colors cursor-pointer"
                style={{
                  backgroundColor: "var(--theme-fg)",
                  color: "var(--theme-bg)",
                }}
                aria-label="Kirim pesan"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
