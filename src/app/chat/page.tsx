'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import styles from './chat.module.css';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m Orion, your AI assistant. I can help you with reasoning, coding, writing, analysis, and much more. What would you like to explore today?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userMessage.content }),
      });

      if (!res.ok) throw new Error('Network response was not ok');

      const assistantMessageId = (Date.now() + 1).toString();
      setMessages((prev) => [
        ...prev,
        {
          id: assistantMessageId,
          role: 'assistant',
          content: '',
          timestamp: new Date(),
        },
      ]);
      
      // Hide the wave typing indicator once the stream starts
      setIsLoading(false);

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          const chunk = decoder.decode(value, { stream: true });
          
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMessageId
                ? { ...msg, content: msg.content + chunk }
                : msg
            )
          );
        }
      }
    } catch {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Unable to connect to the Orion server. Please ensure the service is running and try again.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const suggestions = [
    'Explain quantum computing in simple terms',
    'Write a Python function to sort a linked list',
    'Compare REST vs GraphQL architectures',
    'Help me debug a React useEffect issue',
  ];

  return (
    <div className={styles.chatPage} id="chat-page">
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h3>💬 Chat</h3>
          <button
            className={styles.newChatBtn}
            onClick={() =>
              setMessages([
                {
                  id: '1',
                  role: 'assistant',
                  content:
                    "Hello! I'm Orion, your AI assistant. What would you like to explore today?",
                  timestamp: new Date(),
                },
              ])
            }
          >
            + New Chat
          </button>
        </div>
        <div className={styles.sidebarInfo}>
          <div className={styles.modelInfo}>
            <div className={styles.modelDot} />
            <div>
              <div className={styles.modelName}>Orion v1.0</div>
              <div className={styles.modelStatus}>Online • Ready</div>
            </div>
          </div>
        </div>
        <div className={styles.sidebarSuggestions}>
          <p className={styles.suggestionsTitle}>Try asking:</p>
          {suggestions.map((s, i) => (
            <button
              key={i}
              className={styles.suggestionBtn}
              onClick={() => {
                setInput(s);
                inputRef.current?.focus();
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </aside>

      {/* Chat area */}
      <div className={styles.chatArea}>
        <div className={styles.chatHeader}>
          <div className={styles.chatHeaderInfo}>
            <h2>Orion</h2>
            <span className="badge badge-primary" style={{ fontSize: '0.7rem' }}>v1.0</span>
          </div>
          <div className={styles.chatHeaderMeta}>
            128K context • Advanced Reasoning
          </div>
        </div>

        <div className={styles.messagesContainer}>
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`${styles.message} ${msg.role === 'user' ? styles.messageUser : styles.messageAssistant}`}
            >
              <div className={styles.messageAvatar}>
                {msg.role === 'user' ? '👤' : (
                  <Image src="/orion-logo.png" alt="Orion" width={24} height={24} style={{ borderRadius: '50%' }} />
                )}
              </div>
              <div className={styles.messageBubble}>
                <div className={styles.messageContent}>
                  {msg.content}
                </div>
                <div className={styles.messageTime}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className={`${styles.message} ${styles.messageAssistant}`}>
              <div className={styles.messageAvatar}>
                <Image src="/orion-logo.png" alt="Orion" width={24} height={24} style={{ borderRadius: '50%' }} />
              </div>
              <div className={styles.messageBubble}>
                <div className={styles.typingIndicator}>
                  <span className={styles.typingDot} />
                  <span className={styles.typingDot} />
                  <span className={styles.typingDot} />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className={styles.inputArea}>
          <div className={styles.inputWrapper}>
            <textarea
              ref={inputRef}
              className={styles.chatInput}
              placeholder="Ask Orion anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
              id="chat-input"
            />
            <button
              className={styles.sendBtn}
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              id="send-button"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
            </button>
          </div>
          <p className={styles.disclaimer}>
            Orion can make mistakes. Verify important information.
          </p>
        </div>
      </div>
    </div>
  );
}
