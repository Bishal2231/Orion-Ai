import Image from 'next/image';
import Footer from '@/components/Footer';
import styles from './about.module.css';

const benchmarks = [
  { name: 'MMLU', orion: '78.4%', competitor1: '75.2%', competitor2: '72.1%' },
  { name: 'HumanEval', orion: '72.8%', competitor1: '67.0%', competitor2: '65.3%' },
  { name: 'GSM8K', orion: '85.6%', competitor1: '80.1%', competitor2: '77.5%' },
  { name: 'ARC-C', orion: '68.2%', competitor1: '64.7%', competitor2: '61.9%' },
  { name: 'HellaSwag', orion: '83.1%', competitor1: '79.6%', competitor2: '76.8%' },
];

const timeline = [
  {
    year: '2024',
    title: 'Research Begins',
    description: 'Our team of researchers began exploring novel transformer architectures with enhanced reasoning capabilities.',
  },
  {
    year: '2024 Q3',
    title: 'Architecture Breakthrough',
    description: 'Development of Orion\'s proprietary attention mechanism that dramatically improves long-context understanding.',
  },
  {
    year: '2025 Q1',
    title: 'Training at Scale',
    description: 'Orion v0.5 trained on curated, high-quality datasets spanning code, science, mathematics, and creative writing.',
  },
  {
    year: '2025 Q4',
    title: 'Orion v1.0 Launch',
    description: 'Public release of Orion v1.0, achieving state-of-the-art results on major benchmarks in its parameter class.',
  },
];

const values = [
  {
    icon: '🔬',
    title: 'Research Excellence',
    description: 'We push the boundaries of what small, efficient models can achieve through novel architectural innovations.',
  },
  {
    icon: '🌍',
    title: 'Open Access',
    description: 'We believe powerful AI should be accessible to everyone. Free API access ensures no developer is left behind.',
  },
  {
    icon: '🛡️',
    title: 'Safety & Ethics',
    description: 'Constitutional AI principles guide every aspect of Orion, from training data curation to deployment guardrails.',
  },
  {
    icon: '⚡',
    title: 'Efficiency First',
    description: 'Orion proves that smaller models can rival much larger ones through architectural innovation over brute scale.',
  },
];

export default function AboutPage() {
  return (
    <div className={styles.page} id="about-page">
      {/* Hero */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroContent}>
            <span className="badge badge-purple">About Orion</span>
            <h1 className={styles.title}>
              Intelligence through <span className="text-gradient">Innovation</span>
            </h1>
            <p className={styles.subtitle}>
              Orion is not just another language model. It&apos;s a paradigm shift in how we approach
              artificial intelligence — proving that architectural innovation can outperform
              brute-force scaling.
            </p>
          </div>
          <div className={styles.heroImage}>
            <div className={styles.heroImageGlow} />
            <Image
              src="/orion-logo.png"
              alt="Orion AI"
              width={250}
              height={250}
              className={styles.heroImg}
            />
          </div>
        </div>
      </section>

      {/* Architecture */}
      <section className="section" id="architecture">
        <div className="container">
          <div className="section-header">
            <span className="badge badge-primary">Architecture</span>
            <h2 style={{ marginTop: '16px' }}>
              Under the <span className="text-gradient">Hood</span>
            </h2>
            <p>A deep dive into what makes Orion uniquely powerful</p>
          </div>
          <div className={styles.archGrid}>
            <div className={`glass-card ${styles.archCard}`}>
              <div className={styles.archIcon}>🧬</div>
              <h3>Dense Transformer</h3>
              <p>3 billion parameter dense transformer architecture with proprietary attention mechanisms that enable superior reasoning at a fraction of the compute cost.</p>
            </div>
            <div className={`glass-card ${styles.archCard}`}>
              <div className={styles.archIcon}>🔄</div>
              <h3>Adaptive Context</h3>
              <p>128K token context window with dynamic attention scaling that maintains coherence across extremely long documents and code bases.</p>
            </div>
            <div className={`glass-card ${styles.archCard}`}>
              <div className={styles.archIcon}>🎯</div>
              <h3>Multi-Phase Training</h3>
              <p>Three-stage training pipeline: foundational pretraining, instruction tuning on curated datasets, and constitutional AI alignment.</p>
            </div>
            <div className={`glass-card ${styles.archCard}`}>
              <div className={styles.archIcon}>💎</div>
              <h3>Quality-First Data</h3>
              <p>Trained on carefully curated, deduplicated datasets emphasizing quality over quantity — spanning code, science, mathematics, and creative writing.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benchmarks */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-header">
            <span className="badge badge-gold">Performance</span>
            <h2 style={{ marginTop: '16px' }}>
              Benchmark <span className="text-gradient">Results</span>
            </h2>
            <p>Orion consistently outperforms models in its parameter class</p>
          </div>
          <div className={styles.benchmarkTable}>
            <table>
              <thead>
                <tr>
                  <th>Benchmark</th>
                  <th className={styles.thOrion}>Orion v1.0</th>
                  <th>Model A (3B)</th>
                  <th>Model B (3B)</th>
                </tr>
              </thead>
              <tbody>
                {benchmarks.map((b) => (
                  <tr key={b.name}>
                    <td className={styles.benchName}>{b.name}</td>
                    <td className={styles.benchOrion}>{b.orion}</td>
                    <td>{b.competitor1}</td>
                    <td>{b.competitor2}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-header">
            <h2>Our <span className="text-gradient">Journey</span></h2>
            <p>From research lab to production-ready AI</p>
          </div>
          <div className={styles.timeline}>
            {timeline.map((item, i) => (
              <div key={i} className={styles.timelineItem}>
                <div className={styles.timelineDot} />
                <div className={styles.timelineContent}>
                  <span className={styles.timelineYear}>{item.year}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-header">
            <h2>What We <span className="text-gradient">Believe</span></h2>
            <p>The principles that guide everything we build</p>
          </div>
          <div className={styles.valuesGrid}>
            {values.map((v) => (
              <div key={v.title} className={`glass-card ${styles.valueCard}`}>
                <div className={styles.valueIcon}>{v.icon}</div>
                <h3>{v.title}</h3>
                <p>{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
