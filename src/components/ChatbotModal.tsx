'use client';

import { useEffect, useState, useRef } from 'react';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import styles from './ChatbotModal.module.css';

interface Configuration {
  name: string;
  gamme?: string;
  limit?: string;
  modeleHardware?: string;
  cpu?: number;
  memoire?: number;
  blockStorage?: number;
  ipPubliques?: number;
  stockageS3?: number;
  localisation?: string;
  region?: string;
  resilience?: string;
  modeRotation?: string;
  souverainete?: string;
  savingsPlan?: string;
}

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  configurations?: Configuration[];
}

interface ChatbotModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyConfiguration?: (config: Configuration) => void;
}

const ChatbotModal = ({ isOpen, onClose, onApplyConfiguration }: ChatbotModalProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Fonction pour extraire les configurations du texte
  const extractConfigurations = (text: string): Configuration[] => {
    const configs: Configuration[] = [];
    
    // Chercher des blocs de configuration JSON dans le texte
    const jsonRegex = /```json\s*(\{[\s\S]*?\})\s*```/g;
    let match;
    
    while ((match = jsonRegex.exec(text)) !== null) {
      try {
        const config = JSON.parse(match[1]);
        if (config.name) {
          configs.push(config);
        }
      } catch (e) {
        // Ignorer les erreurs de parsing
      }
    }
    
    return configs;
  };

  const handleApplyConfiguration = (config: Configuration) => {
    if (onApplyConfiguration) {
      onApplyConfiguration(config);
      // Optionnel : fermer le chatbot après l'application
      // onClose();
    }
  };

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
                // Extraire les configurations du message final
                setMessages((prev) =>
                  prev.map((msg) => {
                    if (msg.id === botMessageId) {
                      const configurations = extractConfigurations(msg.text);
                      return { ...msg, configurations };
                    }
                    return msg;
                  })
                );
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
    if (isOpen && !conversationId) {
      const createConversation = async () => {
        const response = await fetch('/api/chatbot', {
          method: 'POST',
        });
        const data = await response.json();
        setConversationId(data.conversationId);
      };
      createConversation();
    }
  }, [isOpen, conversationId]);

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

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <div className={styles.headerTop}>
            <div className={styles.headerLeft}>
              <span className={styles.headerIcon}>🛍️</span>
              <h3 className={styles.headerLabel}>Cloud Cost Assistant</h3>
            </div>
            <button className={styles.closeButton} onClick={onClose}>
              ✕
            </button>
          </div>
          <p className={styles.title}>
            Hello! I'm your Cloud Cost Assistant. I can help you understand cloud pricing, recommend configurations for your workload, or answer questions about infrastructure options. How can I help you today?
          </p>
        </div>
        
        <div 
          ref={messagesContainerRef}
          className={styles.messagesContainer}
        >
          {messages.length === 0 ? (
            <p className={styles.emptyState}>
              Ask me anything about cloud products and pricing...
            </p>
          ) : (
            messages.map((message) => {
              const isThinking = message.sender === 'bot' && 
                (message.text === '' || message.text === 'Réfléchit à une solution pour vous...');
              
              return (
                <div
                  key={message.id}
                  className={`${styles.messageWrapper} ${
                    message.sender === 'user' ? styles.userWrapper : styles.botWrapper
                  }`}
                >
                  <div
                    className={`${styles.message} ${
                      message.sender === 'user' ? styles.userMessage : styles.botMessage
                    } ${isThinking ? styles.thinking : ''}`}
                  >
                    {message.sender === 'bot' ? (
                      <>
                        <div className={styles.markdownContent}>
                          <MarkdownRenderer content={message.text || 'Réfléchit à une solution pour vous...'} />
                        </div>
                        {message.configurations && message.configurations.length > 0 && (
                          <div className={styles.configurationsContainer}>
                            <p className={styles.configPrompt}>Quelle configuration souhaitez-vous appliquer ?</p>
                            <div className={styles.configButtons}>
                              {message.configurations.map((config, idx) => (
                                <button
                                  key={idx}
                                  className={styles.configButton}
                                  onClick={() => handleApplyConfiguration(config)}
                                >
                                  <span className={styles.configButtonIcon}>✓</span>
                                  <span>{config.name}</span>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <span className={styles.textContent}>{message.text}</span>
                    )}
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className={styles.inputContainer}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about cloud pricing..."
            disabled={isLoading}
            className={styles.input}
          />
          <button
            onClick={sendMessage}
            disabled={isLoading || !input.trim()}
            className={styles.sendButton}
            title="Send message"
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatbotModal;

