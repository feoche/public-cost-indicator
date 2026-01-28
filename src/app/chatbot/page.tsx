'use client';

import { useEffect, useState } from 'react';
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

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now(),
      text: input,
      sender: 'user',
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch(`/api/chatbot/${conversationId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();

      const botMessage: Message = {
        id: Date.now() + 1,
        text: data.message,
        sender: 'bot',
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch {
      const errorMessage: Message = {
        id: Date.now() + 1,
        text: 'Error: Failed to send message',
        sender: 'bot',
      };
      setMessages((prev) => [...prev, errorMessage]);
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
      
      <div style={{
        flex: 1,
        overflowY: 'auto',
        border: '1px solid var(--chatbot-border)',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '16px',
        backgroundColor: 'var(--chatbot-bg)',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      }}>
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
          messages.map((message) => (
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
                }}
              >
                {message.sender === 'bot' ? (
                  <MarkdownRenderer content={message.text} />
                ) : (
                  <span style={{ lineHeight: '1.5' }}>{message.text}</span>
                )}
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '16px' }}>
            <div
              style={{
                padding: '12px 16px',
                borderRadius: '18px 18px 18px 4px',
                backgroundColor: 'var(--chatbot-loading-bg)',
                color: 'var(--chatbot-loading-text)',
                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
              }}
            >
              Thinking...
            </div>
          </div>
        )}
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
            transition: 'border-color 0.2s, box-shadow 0.2s',
          }}
          onFocus={(e) => {
            e.target.style.borderColor = 'var(--chatbot-user-bubble)';
            e.target.style.boxShadow = '0 0 0 3px rgba(0, 112, 243, 0.1)';
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