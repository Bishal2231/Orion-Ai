 'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import styles from './chat.module.css';

const CopyIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
  </svg>
);

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const CodeBlock = ({ node, className, children, ...props }: any) => {
  const match = /language-(\w+)/.exec(className || '');
  const language = match ? match[1] : 'text';
  const isInline = !match && !String(children).includes('\n');
  
  const [copied, setCopied] = useState(false);
  const codeString = String(children).replace(/\n$/, '');

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isInline) {
    return (
      <code {...props} className={className}>
        {children}
      </code>
    );
  }

  return (
    <div style={{ position: 'relative', marginTop: '1rem', marginBottom: '1rem', borderRadius: '6px', overflow: 'hidden', border: '1px solid #333' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: '#1e1e1e',
        color: '#a3a3a3',
        padding: '6px 12px',
        fontSize: '0.75rem',
        fontFamily: 'sans-serif',
        borderBottom: '1px solid #333'
      }}>
        <span style={{ textTransform: 'uppercase' }}>{language}</span>
        <button
          onClick={handleCopy}
          className={styles.copyButton}
        >
          {copied ? (
            <>
              <CheckIcon /> Copied!
            </>
          ) : (
            <>
              <CopyIcon /> Copy
            </>
          )}
        </button>
      </div>
      <SyntaxHighlighter
        {...props}
        PreTag="div"
        children={codeString}
        language={language}
        style={vscDarkPlus}
        customStyle={{ margin: 0, borderRadius: 0 }}
      />
    </div>
  );
};

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
  const [abortController, setAbortController] = useState<AbortController | null>(null);
  const [selectedModel, setSelectedModel] = useState('orion');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (quickPrompt?: string) => {
    const promptToSend = quickPrompt || input.trim();
    if (!promptToSend || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: promptToSend,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!quickPrompt) setInput('');
    setIsLoading(true);

    const controller = new AbortController();
    setAbortController(controller);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userMessage.content, model: selectedModel }),
        signal: controller.signal,
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
      setAbortController(null);
    } catch (error: any) {
      if (error.name === 'AbortError') {
        console.log('Request aborted by user');
      } else {
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: `> ⚠️ **Service Unavailable**

This project was **temporarily built as a learning exercise** to explore the deployment of Large Language Models (LLMs) using a **Google Cloud VPS**.

The cloud server that powered Orion's inference engine has since been **decommissioned**, so live AI responses are no longer available.

---

**What was this project?**
- A full-stack LLM chat interface built with Next.js
- Self-hosted **Ollama** running custom fine-tuned models on a Google Cloud Compute Engine instance
- Designed to learn real-world deployment patterns: streaming responses, rate limiting, model management, and cloud infrastructure

> 💡 The source code is still fully functional — if you spin up an Ollama instance locally, this chat will work out of the box!`,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
      setIsLoading(false);
      setAbortController(null);
    }
  };

  const handleStop = () => {
    if (abortController) {
      abortController.abort();
      setAbortController(null);
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
            <div className={styles.modelDot} style={{ background: '#ef4444', boxShadow: '0 0 8px rgba(239,68,68,0.4)' }} />
            <div>
              <div className={styles.modelName}>Orion System</div>
              <div className={styles.modelStatus} style={{ color: '#ef4444' }}>Offline • VPS Removed</div>
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
          {messages.map((msg, index) => (
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
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                    components={{
                      code: CodeBlock
                    }}
                  >
                    {msg.content}
                  </ReactMarkdown>
                </div>
                <div className={styles.messageTime}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>

                {/* Follow-up chips for the latest AI message containing code */}
                {msg.role === 'assistant' && index === messages.length - 1 && !isLoading && msg.content.includes('```') && (
                  <div className={styles.actionChips}>
                    <button className={styles.actionChip} onClick={() => handleSend('Explain this code step-by-step')}>
                      Explain step-by-step
                    </button>
                    <button className={styles.actionChip} onClick={() => handleSend('Add error handling to this')}>
                      Add error handling
                    </button>
                    <button className={styles.actionChip} onClick={() => handleSend('Write a unit test for this function')}>
                      Write unit test
                    </button>
                  </div>
                )}
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
            <select 
              className={styles.inputModelSelect} 
              value={selectedModel} 
              onChange={(e) => setSelectedModel(e.target.value)}
              title="Select Model"
            >
              <option value="orion">Orion Lite - Best at Communication</option>
              <option value="orion:prime">Orion Prime - Best at Coding</option>
            </select>
            {isLoading ? (
              <button
                className={styles.sendBtn}
                onClick={handleStop}
                id="stop-button"
                title="Stop generating"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="6" y="6" width="12" height="12" rx="2" ry="2" />
                </svg>
              </button>
            ) : (
              <button
                className={styles.sendBtn}
                onClick={() => handleSend()}
                disabled={!input.trim()}
                id="send-button"
                title="Send message"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                </svg>
              </button>
            )}
          </div>
          <p className={styles.disclaimer}>
            Orion can make mistakes. Verify important information.
          </p>
        </div>
      </div>
    </div>
  );
}
