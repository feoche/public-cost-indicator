"use client";
import { useState, useEffect, useRef } from "react";
import { Button, Input, Card, FormField, FormFieldLabel } from "../ods";
import MarkdownRenderer from "./MarkdownRenderer";
import { useConfigStore } from "../state/configStore";

interface ChatMessage {
  id: number;
  text: string;
  sender: "user" | "bot";
}

export default function ChatbotPanel() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const { config, patch, toJSON, fromJSON } = useConfigStore();

  // Create conversation on mount
  useEffect(() => {
    const createConversation = async () => {
      try {
        const response = await fetch("/api/chatbot", { method: "POST" });
        const data = await response.json();
        setConversationId(data.conversationId);
      } catch {
        // noop: could show a toast
      }
    };
    createConversation();
  }, []);

  // Auto-scroll
  useEffect(() => {
    if (messagesContainerRef.current) {
      const container = messagesContainerRef.current;
      const shouldScroll = container.scrollHeight - container.scrollTop <= container.clientHeight + 100;
      if (shouldScroll) {
        setTimeout(() => {
          messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 50);
      }
    }
  }, [messages, isLoading]);

  // Apply JSON patch if the bot returns a line like { "patch": { ... } }
  const tryApplyPatch = (payload: any) => {
    if (payload && typeof payload === "object" && payload.patch && typeof payload.patch === "object") {
      patch(payload.patch);
      return true;
    }
    if (payload && typeof payload === "object" && payload.set && typeof payload.set === "object") {
      patch(payload.set);
      return true;
    }
    if (payload && typeof payload === "object" && payload.json) {
      fromJSON(typeof payload.json === "string" ? payload.json : JSON.stringify(payload.json));
      return true;
    }
    return false;
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading || !conversationId) return;

    const userMessage: ChatMessage = { id: Date.now(), text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    const messageText = input;
    setInput("");
    setIsLoading(true);

    // Placeholder bot message to be updated via streaming
    const botMessageId = Date.now() + 1;
    const botMessage: ChatMessage = { id: botMessageId, text: "", sender: "bot" };
    setMessages((prev) => [...prev, botMessage]);

    try {
      const response = await fetch(`/api/chatbot/${conversationId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: messageText, context: { config } }),
      });
      if (!response.ok) throw new Error("Failed to send message");

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      if (!reader) throw new Error("No response body");

      let buffer = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            try {
              const data = JSON.parse(line.slice(6));
              // If bot returns a JSON command, apply it and continue
              if (tryApplyPatch(data)) {
                continue;
              }
              if (data.type === "content") {
                setMessages((prev) => prev.map((m) => (m.id === botMessageId ? { ...m, text: data.content } : m)));
                setTimeout(() => {
                  messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
                }, 10);
              } else if (data.type === "error") {
                setMessages((prev) => prev.map((m) => (m.id === botMessageId ? { ...m, text: data.message || "Erreur lors du traitement" } : m)));
                setIsLoading(false);
                return;
              } else if (data.type === "done") {
                setIsLoading(false);
                return;
              }
            } catch {
              // ignore malformed lines
            }
          }
        }
      }
    } catch {
      setMessages((prev) => prev.map((m) => (m.id === botMessageId ? { ...m, text: "Erreur: Échec de l'envoi du message" } : m)));
    } finally {
      setIsLoading(false);
    }
  };

  // Simple local commands for manual config control via user
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      // slash commands
      if (input.startsWith("/get")) {
        setMessages((prev) => [...prev, { id: Date.now(), text: toJSON(), sender: "bot" }]);
        setInput("");
        return;
      }
      if (input.startsWith("/set ")) {
        try {
          const json = input.slice(5);
          fromJSON(json);
          setMessages((prev) => [...prev, { id: Date.now(), text: "Configuration updated.", sender: "bot" }]);
        } catch {
          setMessages((prev) => [...prev, { id: Date.now(), text: "Invalid JSON.", sender: "bot" }]);
        }
        setInput("");
        return;
      }
      sendMessage();
    }
  };

  return (
    <section aria-labelledby="chatbot-title" style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Card>
        <header style={{ padding: "0.75rem 1rem", borderBottom: "1px solid var(--chatbot-border)" }}>
          <h2 id="chatbot-title">Chatbot</h2>
          <p style={{ fontSize: "0.9rem", color: "#666" }}>Ask questions and get guidance while you configure your instance.</p>
        </header>
        <div
          ref={messagesContainerRef}
          style={{ flex: 1, overflowY: "auto", padding: "1rem", borderTop: "none" }}
        >
          {messages.length === 0 ? (
            <p style={{ color: "var(--chatbot-placeholder)", textAlign: "center", marginTop: 40, fontSize: 16 }}>
              Start a conversation...
            </p>
          ) : (
            messages.map((message) => {
              const isThinking = message.sender === "bot" && (message.text === "" || message.text === "Réfléchit à une solution pour vous...");
              return (
                <div key={message.id} style={{ marginBottom: 16, display: "flex", justifyContent: message.sender === "user" ? "flex-end" : "flex-start" }}>
                  <div
                    style={{
                      maxWidth: "75%",
                      padding: "12px 16px",
                      borderRadius: message.sender === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                      backgroundColor: message.sender === "user" ? "var(--chatbot-user-bubble)" : "var(--chatbot-bot-bubble)",
                      color: message.sender === "user" ? "#ffffff" : "var(--chatbot-bot-text)",
                      boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
                      wordBreak: "break-word",
                      opacity: isThinking ? 0.7 : 1,
                      transition: "opacity 0.3s ease-in-out",
                    }}
                  >
                    {message.sender === "bot" ? (
                      <div style={{ animation: message.text && !isThinking ? "fadeIn 0.3s ease-out" : "none" }}>
                        <MarkdownRenderer content={message.text || "Réfléchit à une solution pour vous..."} />
                      </div>
                    ) : (
                      <span style={{ lineHeight: 1.5 }}>{message.text}</span>
                    )}
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        <div style={{ padding: "0 1rem 0.5rem", borderTop: "1px solid var(--chatbot-border)" }}>
          <small style={{ color: "#666" }}>Current config JSON:</small>
          <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word", fontSize: 12, maxHeight: 120, overflow: "auto", background: "#fafafa", padding: 8, borderRadius: 8 }}>
            {toJSON()}
          </pre>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
          style={{ display: "flex", gap: 12, padding: "0.75rem", borderTop: "1px solid var(--chatbot-border)", alignItems: "center" }}
          aria-label="Send a message"
        >
          <FormField style={{ flex: 1 }}>
            <FormFieldLabel className="visually-hidden">Message</FormFieldLabel>
            <Input
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
            />
          </FormField>
          <Button
            color={isLoading || !input.trim() ? "neutral" : "primary"}
            variant="default"
            type="submit"
            disabled={isLoading || !input.trim()}
          >
            Send
          </Button>
        </form>
      </Card>
    </section>
  );
}
