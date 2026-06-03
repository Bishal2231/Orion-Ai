import Link from 'next/link';
import Footer from '@/components/Footer';
import styles from './pricing.module.css';

const plans = [
  {
    name: 'Explorer',
    price: 'Free',
    period: '',
    description: 'Perfect for getting started and experimenting with Orion.',
    features: [
      '100 requests per day',
      'Orion v1.0 model access',
      '4K token context',
      'Community support',
      'Rate limited',
      'Standard latency',
    ],
    cta: 'Get Started Free',
    href: '/api-keys',
    popular: false,
    badge: null,
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/month',
    description: 'For developers and teams building production applications.',
    features: [
      'Unlimited requests',
      'Orion v1.0 + v1.0-turbo',
      '128K token context',
      'Priority support',
      'No rate limits',
      'Low latency',
      'Function calling',
      'Fine-tuning access',
    ],
    cta: 'Start Pro Trial',
    href: '/api-keys',
    popular: true,
    badge: 'Most Popular',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For organizations requiring dedicated infrastructure and SLAs.',
    features: [
      'Everything in Pro',
      'Dedicated infrastructure',
      '99.9% SLA guarantee',
      'Custom model fine-tuning',
      'On-premise deployment',
      'Dedicated account manager',
      'SSO & SAML',
      'Priority queue',
    ],
    cta: 'Contact Sales',
    href: '/about',
    popular: false,
    badge: 'Enterprise',
  },
];

export default function PricingPage() {
  return (
    <div className={styles.page} id="pricing-page">
      <section className={styles.hero}>
        <div className="container">
          <span className="badge badge-gold">Pricing</span>
          <h1 className={styles.title}>
            Simple, transparent <span className="text-gradient">pricing</span>
          </h1>
          <p className={styles.subtitle}>
            Start for free, scale as you grow. No hidden fees, no surprises.
          </p>
        </div>
      </section>

      <section className={styles.plansSection}>
        <div className="container">
          <div className={styles.plansGrid}>
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`${styles.planCard} ${plan.popular ? styles.planPopular : ''}`}
              >
                {plan.badge && (
                  <div className={`${styles.planBadge} ${plan.popular ? styles.planBadgePopular : ''}`}>
                    {plan.badge}
                  </div>
                )}
                <h3 className={styles.planName}>{plan.name}</h3>
                <div className={styles.planPrice}>
                  <span className={styles.priceValue}>{plan.price}</span>
                  {plan.period && <span className={styles.pricePeriod}>{plan.period}</span>}
                </div>
                <p className={styles.planDesc}>{plan.description}</p>
                <ul className={styles.planFeatures}>
                  {plan.features.map((f) => (
                    <li key={f} className={styles.planFeature}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={plan.href}
                  className={`btn ${plan.popular ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ width: '100%', marginTop: 'auto' }}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>Feature Comparison</h2>
            <p>See exactly what you get with each plan</p>
          </div>
          <div className={styles.tableWrapper}>
            <table className={styles.comparisonTable}>
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Explorer</th>
                  <th className={styles.thHighlight}>Pro</th>
                  <th>Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Requests / day', '100', 'Unlimited', 'Unlimited'],
                  ['Context window', '4K tokens', '128K tokens', '128K tokens'],
                  ['Models', 'v1.0', 'v1.0, v1.0-turbo', 'All + Custom'],
                  ['Latency', 'Standard', 'Low', 'Ultra-low'],
                  ['Function calling', '—', '✓', '✓'],
                  ['Fine-tuning', '—', '✓', '✓'],
                  ['Embeddings API', '—', '✓', '✓'],
                  ['SLA', '—', '99.5%', '99.9%'],
                  ['Support', 'Community', 'Priority', 'Dedicated'],
                  ['On-premise', '—', '—', '✓'],
                ].map(([feature, explorer, pro, enterprise]) => (
                  <tr key={feature}>
                    <td>{feature}</td>
                    <td>{explorer}</td>
                    <td className={styles.tdHighlight}>{pro}</td>
                    <td>{enterprise}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
