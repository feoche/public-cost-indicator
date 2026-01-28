'use client';

import { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '@/lib/types';
import styles from './Chatbot.module.css';

interface ChatbotProps {
  onProductSelect: (product: any) => void;
  cart: any[];
  onClose?: () => void;
}

export default function Chatbot({ onProductSelect, cart, onClose }: ChatbotProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: "👋 Bonjour ! Je suis votre assistant OVHcloud. Je vais vous aider à sélectionner les meilleurs produits Public Cloud selon vos besoins et estimer leur coût.",
      suggestions: [
        "Je veux héberger une application web",
        "J'ai besoin de stockage de données",
        "Je cherche une solution pour l'IA/ML",
        "Montrez-moi tous les produits disponibles"
      ]
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    const userMessage: ChatMessage = { role: 'user', content: message };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message, 
          context: { cart, previousMessages: messages }
        })
      });

      const data = await response.json();
      setMessages(prev => [...prev, data.message]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Désolé, une erreur s'est produite. Pouvez-vous reformuler votre demande ?"
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  // Gestion de l'overlay seulement si onClose est fourni
  const content = (
    <div className={styles.chatbot} onClick={(e) => onClose && e.stopPropagation()}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h2 className={styles.headerTitle}>💬 Assistant OVHcloud</h2>
          <p className={styles.headerSubtitle}>Posez vos questions sur les produits Public Cloud</p>
        </div>
        {onClose && (
          <button className={styles.closeButton} onClick={onClose}>
            ✕
          </button>
        )}
      </div>

      <div className={styles.messagesContainer}>
        {messages.map((msg, idx) => (
          <div 
            key={idx} 
            className={`${styles.messageWrapper} ${msg.role === 'user' ? styles.userWrapper : styles.assistantWrapper}`}
          >
            <div className={`${styles.message} ${msg.role === 'user' ? styles.userMessage : styles.assistantMessage}`}>
              <p className={styles.messageContent}>{msg.content}</p>
              
              {msg.suggestions && msg.suggestions.length > 0 && (
                <div className={styles.suggestions}>
                  {msg.suggestions.map((suggestion, i) => (
                    <button
                      key={i}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className={styles.suggestionButton}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}

              {msg.products && msg.products.length > 0 && (
                <div className={styles.products}>
                  {msg.products.map((product, i) => (
                    <div key={i} className={styles.productCard}>
                      <h4 className={styles.productName}>{product.name}</h4>
                      <p className={styles.productBrick}>{product.brick}</p>
                      <button
                        onClick={() => onProductSelect(product)}
                        className={styles.configureButton}
                      >
                        Configurer →
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className={styles.messageWrapper}>
            <div className={`${styles.message} ${styles.assistantMessage}`}>
              <div className={styles.loadingDots}>
                <div className={styles.dot}></div>
                <div className={styles.dot}></div>
                <div className={styles.dot}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <div className={styles.inputContainer}>
        <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(input); }} className={styles.inputForm}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Décrivez vos besoins..."
            className={styles.input}
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className={styles.sendButton}
          >
            Envoyer
          </button>
        </form>
      </div>
    </div>
  );

  // Si onClose est fourni, on wrap dans un overlay (mode modal)
  if (onClose) {
    return (
      <div className={styles.overlay} onClick={onClose}>
        {content}
      </div>
    );
  }

  // Sinon, on retourne juste le contenu (mode page)
  return content;
}

