"use client";

import Link from "next/link";
import siteConfig from "@/config/siteConfig";

const Footer = () => {
  return (
    <footer className="bg-slate-50 dark:!bg-[#020617] border-t border-slate-200 dark:border-slate-800 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="inline-block font-bold text-2xl tracking-tight text-slate-900 dark:text-white mb-4">
              Fahmi<span className="text-blue-500">Hassan</span>
            </Link>
            <p className="text-slate-600 dark:text-slate-200 max-w-sm mb-6 leading-relaxed">
              Based in Jakarta, Indonesia. I build accessible, pixel-perfect, and performant web experiences.
            </p>
            <div className="flex gap-4">
              {Object.entries(siteConfig.social).map(([key, url]) => (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-200 hover:bg-blue-500 hover:text-white dark:hover:bg-blue-600 transition-all duration-300"
                  aria-label={key}
                >
                  <i className={`fab fa-${key === 'email' ? 'envelope' : key} text-lg`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-6">Navigation</h3>
            <ul className="space-y-4">
              {['Home', 'About', 'Projects', 'Contact'].map((item) => (
                <li key={item}>
                  <Link href={`#${item.toLowerCase()}`} className="text-slate-600 dark:text-slate-200 hover:text-blue-500 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-6">Contact</h3>
            <ul className="space-y-4 text-slate-600 dark:text-slate-200">
              <li>
                <a href={`mailto:${siteConfig.personalInfo.email}`} className="hover:text-blue-500 transition-colors">
                  {siteConfig.personalInfo.email}
                </a>
              </li>
              <li>{siteConfig.personalInfo.location}</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            © {new Date().getFullYear()} M Fahmi Hassan. All rights reserved.
          </p>
          <div className="text-slate-500 dark:text-slate-400 text-sm">
            Designed & Built with <span className="text-red-500">♥</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
