'use client';

import { Github, Linkedin, Twitter, Mail, Heart } from 'lucide-react';
import { Link } from '../../../i18n/navigation';
import { useTranslations } from 'next-intl';
import siteConfig from '@/config/siteConfig';

const socialLinks = [
  { href: siteConfig.social.github, icon: Github, label: 'GitHub' },
  { href: siteConfig.social.linkedin, icon: Linkedin, label: 'LinkedIn' },
  { href: siteConfig.social.twitter, icon: Twitter, label: 'Twitter' },
  { href: siteConfig.social.email, icon: Mail, label: 'Email' },
];

export default function Footer() {
  const t = useTranslations('navigation');
  const tFooter = useTranslations('footer');
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { href: '/' as const, label: t('home') },
    { href: '/about' as const, label: t('about') },
    { href: '/work' as const, label: t('projects') },
    { href: '/contact' as const, label: t('contact') },
  ];

  return (
    <footer className="relative z-10 border-t border-white/[0.06] bg-[#030014]">
      <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
        {/* Top section */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-12">
          {/* Brand */}
          <div className="flex flex-col gap-2">
            <Link href="/" className="text-white font-bold text-lg tracking-tight">
              <span className="text-gray-400">{'</>'}</span>{' '}MFH
            </Link>
            <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
              {tFooter('tagline')}
            </p>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-gray-400 hover:text-white transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/[0.06] mb-8" />

        {/* Bottom section */}
        <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-gray-600 text-xs flex items-center gap-1">
            © {currentYear} M Fahmi Hassan. {tFooter('madeWith')}{' '}
            <Heart className="w-3 h-3 text-red-500/60 fill-red-500/60 inline" />
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              const isExternal = social.href.startsWith('http') || social.href.startsWith('mailto');

              return isExternal ? (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith('mailto') ? undefined : '_blank'}
                  rel={social.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                  className="p-2 rounded-full text-gray-500 hover:text-white hover:bg-white/[0.06] transition-all duration-300"
                  aria-label={social.label}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ) : (
                <Link
                  key={social.label}
                  href={social.href as '/'}
                  className="p-2 rounded-full text-gray-500 hover:text-white hover:bg-white/[0.06] transition-all duration-300"
                  aria-label={social.label}
                >
                  <Icon className="w-4 h-4" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
