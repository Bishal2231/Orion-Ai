import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import styles from "./page.module.css";

const features = [
  {
    icon: "🧠",
    title: "Advanced Reasoning",
    description:
      "Multi-step logical reasoning and complex problem decomposition with chain-of-thought capabilities.",
    color: "#4f8fff",
  },
  {
    icon: "⚡",
    title: "Code Generation",
    description:
      "Write, debug, and refactor code across 50+ programming languages with deep contextual understanding.",
    color: "#8b5cf6",
  },
  {
    icon: "✨",
    title: "Creative Writing",
    description:
      "Generate compelling narratives, poetry, scripts, and creative content with nuanced style control.",
    color: "#ec4899",
  },
  {
    icon: "📊",
    title: "Deep Analysis",
    description:
      "Process and analyze complex datasets, research papers, and structured information with precision.",
    color: "#10b981",
  },
  {
    icon: "🔗",
    title: "Context Mastery",
    description:
      "128K token context window enables understanding of entire codebases, books, and document collections.",
    color: "#06b6d4",
  },
  {
    icon: "🛡️",
    title: "Safety First",
    description:
      "Built with constitutional AI principles and multi-layer safety alignment for responsible deployment.",
    color: "#fbbf24",
  },
];

const stats = [
  { value: "3B", label: "Parameters", sublabel: "Dense Transformer" },
  { value: "128K", label: "Context Window", sublabel: "Token Capacity" },
  { value: "50+", label: "Languages", sublabel: "Programming & Natural" },
  { value: "99.2%", label: "Accuracy", sublabel: "On Benchmarks" },
];

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className={styles.hero} id="hero">
        <div className={styles.heroGlow} />
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>
            <span className={styles.heroBadgeDot} />
            Now Available — Orion v1.0
          </div>

          <h1 className={styles.heroTitle}>
            The Next Frontier of{" "}
            <span className="text-gradient">Artificial Intelligence</span>
          </h1>

          <p className={styles.heroSubtitle}>
            Orion is a state-of-the-art language model engineered for exceptional reasoning,
            creative generation, and deep analytical capabilities. Built from the ground up with
            a proprietary architecture designed to push the boundaries of what AI can achieve.
          </p>

          <div className={styles.heroCTA}>
            <Link href="/chat" className="btn btn-primary" style={{ padding: "14px 36px", fontSize: "1rem" }}>
              <span>🚀</span> Start Chatting
            </Link>
            <Link href="/api-keys" className="btn btn-secondary" style={{ padding: "14px 36px", fontSize: "1rem" }}>
              <span>🔑</span> Get API Key
            </Link>
          </div>

          <div className={styles.heroLogo}>
            <div className={styles.heroLogoRing} />
            <div className={styles.heroLogoRing2} />
            <Image
              src="/orion-logo.png"
              alt="Orion AI"
              width={180}
              height={180}
              className={styles.heroLogoImage}
              priority
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={styles.statsSection}>
        <div className="container">
          <div className={styles.statsGrid}>
            {stats.map((stat) => (
              <div key={stat.label} className={styles.statCard}>
                <div className={styles.statValue}>{stat.value}</div>
                <div className={styles.statLabel}>{stat.label}</div>
                <div className={styles.statSublabel}>{stat.sublabel}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section" id="features">
        <div className="container">
          <div className="section-header">
            <span className="badge badge-primary">Capabilities</span>
            <h2 style={{ marginTop: "16px" }}>
              Built for the <span className="text-gradient">Impossible</span>
            </h2>
            <p>
              Orion combines cutting-edge architecture with proprietary training techniques
              to deliver unmatched performance across every domain.
            </p>
          </div>

          <div className={styles.featuresGrid}>
            {features.map((feature, i) => (
              <div
                key={feature.title}
                className={`glass-card ${styles.featureCard}`}
                style={{ animationDelay: `${i * 0.1}s`, "--feature-color": feature.color } as React.CSSProperties}
              >
                <div className={styles.featureIcon}>{feature.icon}</div>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDesc}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaCard}>
            <div className={styles.ctaGlow} />
            <h2 className={styles.ctaTitle}>
              Ready to experience the future?
            </h2>
            <p className={styles.ctaSubtitle}>
              Start building with Orion today. Free API access, no credit card required.
            </p>
            <div className={styles.ctaButtons}>
              <Link href="/chat" className="btn btn-primary" style={{ padding: "14px 36px", fontSize: "1rem" }}>
                Try Orion Free
              </Link>
              <Link href="/pricing" className="btn btn-secondary" style={{ padding: "14px 36px", fontSize: "1rem" }}>
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
