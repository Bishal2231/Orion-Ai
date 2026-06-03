'use client';

import { useState } from 'react';
import Footer from '@/components/Footer';
import styles from './apikeys.module.css';

export default function ApiKeysPage() {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateKey = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch('/api/generate-key', { method: 'POST' });
      const data = await res.json();
      setApiKey(data.apiKey);
    } catch {
      alert('Failed to generate API key. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const copyKey = () => {
    if (apiKey) {
      navigator.clipboard.writeText(apiKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className={styles.page} id="api-keys-page">
      <section className={styles.hero}>
        <div className="container">
          <span className="badge badge-primary">Developer API</span>
          <h1 className={styles.title}>
            Build with <span className="text-gradient">Orion</span>
          </h1>
          <p className={styles.subtitle}>
            Integrate Orion&apos;s intelligence into your applications with our simple REST API.
            Get your free API key instantly — no credit card required.
          </p>
        </div>
      </section>

      <section className={styles.generateSection}>
        <div className="container">
          <div className={styles.generateCard}>
            <div className={styles.generateCardGlow} />
            <h2>🔑 Get Your Free API Key</h2>
            <p>Generate an API key to start making requests to the Orion API immediately.</p>

            {!apiKey ? (
              <button
                className="btn btn-primary"
                onClick={generateKey}
                disabled={isGenerating}
                style={{ padding: '14px 40px', fontSize: '1rem', marginTop: '24px' }}
                id="generate-key-btn"
              >
                {isGenerating ? 'Generating...' : 'Generate API Key'}
              </button>
            ) : (
              <div className={styles.keyDisplay}>
                <div className={styles.keyValue}>
                  <code>{apiKey}</code>
                  <button className={styles.copyBtn} onClick={copyKey} id="copy-key-btn">
                    {copied ? '✓ Copied!' : '📋 Copy'}
                  </button>
                </div>
                <p className={styles.keyWarning}>
                  ⚠️ Save this key securely. It won&apos;t be shown again.
                </p>
                <button
                  className="btn btn-secondary"
                  onClick={() => setApiKey(null)}
                  style={{ marginTop: '12px' }}
                >
                  Generate Another
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="section" id="api-examples">
        <div className="container">
          <div className="section-header">
            <h2>Quick Start</h2>
            <p>Get started with the Orion API in seconds</p>
          </div>

          <div className={styles.examplesGrid}>
            <div className={styles.exampleCard}>
              <div className={styles.exampleHeader}>
                <span className={styles.exampleLang}>cURL</span>
              </div>
              <div className="code-block">
                <pre>{`curl https://api.orion.ai/v1/chat \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "prompt": "Explain quantum computing",
    "model": "orion-v1"
  }'`}</pre>
              </div>
            </div>

            <div className={styles.exampleCard}>
              <div className={styles.exampleHeader}>
                <span className={styles.exampleLang}>Python</span>
              </div>
              <div className="code-block">
                <pre>{`import requests

response = requests.post(
    "https://api.orion.ai/v1/chat",
    headers={
        "Authorization": "Bearer YOUR_API_KEY",
        "Content-Type": "application/json"
    },
    json={
        "prompt": "Write a sorting algorithm",
        "model": "orion-v1"
    }
)

print(response.json()["answer"])`}</pre>
              </div>
            </div>

            <div className={styles.exampleCard}>
              <div className={styles.exampleHeader}>
                <span className={styles.exampleLang}>Node.js</span>
              </div>
              <div className="code-block">
                <pre>{`const response = await fetch(
  "https://api.orion.ai/v1/chat",
  {
    method: "POST",
    headers: {
      "Authorization": "Bearer YOUR_API_KEY",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      prompt: "Analyze this dataset",
      model: "orion-v1"
    })
  }
);

const data = await response.json();
console.log(data.answer);`}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-header">
            <h2>API Reference</h2>
            <p>Everything you need to know about the Orion API</p>
          </div>

          <div className={styles.referenceGrid}>
            <div className={`glass-card ${styles.refCard}`}>
              <div className={styles.refMethod}>POST</div>
              <h3>/v1/chat</h3>
              <p>Send a prompt and receive an AI-generated response.</p>
              <div className={styles.refParams}>
                <div className={styles.refParam}>
                  <code>prompt</code>
                  <span>string (required)</span>
                </div>
                <div className={styles.refParam}>
                  <code>model</code>
                  <span>string — &quot;orion-v1&quot;</span>
                </div>
                <div className={styles.refParam}>
                  <code>max_tokens</code>
                  <span>integer — default 2048</span>
                </div>
                <div className={styles.refParam}>
                  <code>temperature</code>
                  <span>float — 0.0 to 2.0</span>
                </div>
              </div>
            </div>

            <div className={`glass-card ${styles.refCard}`}>
              <div className={styles.refMethod} style={{ background: 'rgba(5, 150, 105, 0.1)', color: 'var(--accent-green)' }}>GET</div>
              <h3>/v1/models</h3>
              <p>List all available Orion models and their capabilities.</p>
              <div className={styles.refParams}>
                <div className={styles.refParam}>
                  <span style={{ color: 'var(--text-muted)' }}>No parameters required</span>
                </div>
              </div>
            </div>

            <div className={`glass-card ${styles.refCard}`}>
              <div className={styles.refMethod}>POST</div>
              <h3>/v1/embeddings</h3>
              <p>Generate vector embeddings for text inputs.</p>
              <div className={styles.refParams}>
                <div className={styles.refParam}>
                  <code>input</code>
                  <span>string or array (required)</span>
                </div>
                <div className={styles.refParam}>
                  <code>model</code>
                  <span>string — &quot;orion-embed-v1&quot;</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
