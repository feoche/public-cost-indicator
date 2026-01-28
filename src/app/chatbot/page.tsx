'use client';

import { useEffect, useState, useRef } from 'react';
import MarkdownRenderer from '@/components/MarkdownRenderer';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

const ChatbotPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const sendMessage = async () => {
    if (!input.trim() || isLoading || !conversationId) return;

    const userMessage: Message = {
      id: Date.now(),
      text: input,
      sender: 'user',
    };

    setMessages((prev) => [...prev, userMessage]);
    const messageText = input;
    setInput('');
    setIsLoading(true);

    // Create a placeholder bot message that will be updated via streaming
    const botMessageId = Date.now() + 1;
    const botMessage: Message = {
      id: botMessageId,
      text: '',
      sender: 'bot',
    };

    setMessages((prev) => [...prev, botMessage]);

    try {
      const response = await fetch(`/api/chatbot/${conversationId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: messageText }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error('No response body');
      }

      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              
              if (data.type === 'content') {
                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === botMessageId
                      ? { ...msg, text: data.content }
                      : msg
                  )
                );
                // Scroll to bottom after content update
                setTimeout(() => {
                  messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
                }, 10);
              } else if (data.type === 'error') {
                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === botMessageId
                      ? { ...msg, text: data.message || 'Erreur lors du traitement' }
                      : msg
                  )
                );
                setIsLoading(false);
                return;
              } else if (data.type === 'done') {
                setIsLoading(false);
                return;
              }
            } catch {
              // Ignore parsing errors for malformed SSE data
            }
          }
        }
      }
    } catch {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === botMessageId
            ? { ...msg, text: 'Erreur: Échec de l\'envoi du message' }
            : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  useEffect(() => {
    const createConversation = async () => {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
      });
      const data = await response.json();
      setConversationId(data.conversationId);
    };
    createConversation();
  }, []);

  // Auto-scroll to bottom when messages change or when loading
  useEffect(() => {
    if (messagesContainerRef.current) {
      const container = messagesContainerRef.current;
      const shouldScroll = container.scrollHeight - container.scrollTop <= container.clientHeight + 100;
      
      if (shouldScroll) {
        setTimeout(() => {
          messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 50);
      }
    }
  }, [messages, isLoading]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
      backgroundColor: 'var(--background)',
      color: 'var(--foreground)',
    }}>
      <h1 style={{ 
        marginBottom: '24px',
        fontSize: '28px',
        fontWeight: '600',
        color: 'var(--foreground)',
      }}>
        Chatbot
      </h1>
      
      <div 
        ref={messagesContainerRef}
        style={{
          flex: 1,
          overflowY: 'auto',
          border: '1px solid var(--chatbot-border)',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '16px',
          backgroundColor: 'var(--chatbot-bg)',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        }}
      >
        {messages.length === 0 ? (
          <p style={{ 
            color: 'var(--chatbot-placeholder)', 
            textAlign: 'center', 
            marginTop: '40px',
            fontSize: '16px',
          }}>
            Start a conversation...
          </p>
        ) : (
          messages.map((message) => {
            const isThinking = message.sender === 'bot' && 
              (message.text === '' || message.text === 'Réfléchit à une solution pour vous...');
            
            return (
              <div
                key={message.id}
                style={{
                  marginBottom: '16px',
                  display: 'flex',
                  justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                <div
                  style={{
                    maxWidth: '75%',
                    padding: '12px 16px',
                    borderRadius: message.sender === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                    backgroundColor: message.sender === 'user' 
                      ? 'var(--chatbot-user-bubble)' 
                      : 'var(--chatbot-bot-bubble)',
                    color: message.sender === 'user' 
                      ? '#ffffff' 
                      : 'var(--chatbot-bot-text)',
                    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
                    wordBreak: 'break-word',
                    opacity: isThinking ? 0.7 : 1,
                    transition: 'opacity 0.3s ease-in-out',
                  }}
                >
                  {message.sender === 'bot' ? (
                    <div style={{ 
                      animation: message.text && !isThinking ? 'fadeIn 0.3s ease-out' : 'none',
                      transition: 'opacity 0.2s ease-in-out',
                    }}>
                      <MarkdownRenderer content={message.text || 'Réfléchit à une solution pour vous...'} />
                    </div>
                  ) : (
                    <span style={{ lineHeight: '1.5' }}>{message.text}</span>
                  )}
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          disabled={isLoading}
          style={{
            flex: 1,
            padding: '14px 16px',
            border: '1px solid var(--chatbot-input-border)',
            borderRadius: '24px',
            fontSize: '16px',
            outline: 'none',
            backgroundColor: 'var(--chatbot-input-bg)',
            color: 'var(--chatbot-input-text)',
            transition: 'border-color 0.2s, box-shadow 0.2s, opacity 0.2s',
            opacity: isLoading ? 0.6 : 1,
            cursor: isLoading ? 'not-allowed' : 'text',
          }}
          onFocus={(e) => {
            if (!isLoading) {
              e.target.style.borderColor = 'var(--chatbot-user-bubble)';
              e.target.style.boxShadow = '0 0 0 3px rgba(0, 112, 243, 0.1)';
            }
          }}
          onBlur={(e) => {
            e.target.style.borderColor = 'var(--chatbot-input-border)';
            e.target.style.boxShadow = 'none';
          }}
        />
        <button
          onClick={sendMessage}
          disabled={isLoading || !input.trim()}
          style={{
            padding: '14px 28px',
            backgroundColor: isLoading || !input.trim() 
              ? 'var(--chatbot-button-disabled)' 
              : 'var(--chatbot-button-bg)',
            color: '#ffffff',
            border: 'none',
            borderRadius: '24px',
            cursor: isLoading || !input.trim() ? 'not-allowed' : 'pointer',
            fontSize: '16px',
            fontWeight: '500',
            transition: 'background-color 0.2s, transform 0.1s',
            boxShadow: isLoading || !input.trim() 
              ? 'none' 
              : '0 2px 4px rgba(0, 112, 243, 0.3)',
          }}
          onMouseDown={(e) => {
            if (!isLoading && input.trim()) {
              e.currentTarget.style.transform = 'scale(0.98)';
            }
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatbotPage;