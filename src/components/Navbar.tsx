'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import styles from './Navbar.module.css';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/chat', label: 'Chat' },
  { href: '/api-keys', label: 'API' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/about', label: 'About' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className={styles.navbar} id="navbar">
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <div className={styles.logoIcon}>
            <Image
              src="/orion-logo.png"
              alt="Orion AI"
              width={36}
              height={36}
              className={styles.logoImage}
            />
          </div>
          <span className={styles.logoText}>Orion</span>
          <span className={styles.logoBadge}>AI</span>
        </Link>

        <div className={styles.navLinks}>
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={styles.navLink}>
              {link.label}
            </Link>
          ))}
        </div>

        <div className={styles.navActions}>
          <Link href="/chat" className="btn btn-primary" style={{ padding: '10px 24px', fontSize: '0.875rem' }}>
            Try Orion
          </Link>
        </div>

        <button
          className={styles.hamburger}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          id="mobile-menu-toggle"
        >
          <span className={`${styles.bar} ${mobileOpen ? styles.barOpen : ''}`} />
          <span className={`${styles.bar} ${mobileOpen ? styles.barOpen : ''}`} />
          <span className={`${styles.bar} ${mobileOpen ? styles.barOpen : ''}`} />
        </button>
      </div>

      {mobileOpen && (
        <div className={styles.mobileMenu} id="mobile-menu">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={styles.mobileLink}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/chat"
            className="btn btn-primary"
            style={{ marginTop: '8px', width: '100%' }}
            onClick={() => setMobileOpen(false)}
          >
            Try Orion
          </Link>
        </div>
      )}
    </nav>
  );
}
