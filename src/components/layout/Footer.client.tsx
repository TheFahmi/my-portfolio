"use client";

import Link from "next/link";
import siteConfig from "@/config/siteConfig";
import { useState, useEffect } from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    setTime(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Jakarta' }));
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Jakarta' }));
    }, 1000 * 60);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="bg-slate-50 dark:bg-slate-950 py-12 px-4 md:px-8 border-t border-slate-200 dark:border-slate-800">
      <div className="container mx-auto max-w-7xl">

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6 mb-8">

          {/* Brand Block - Large */}
          <div className="col-span-1 md:col-span-6 lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 flex flex-col justify-between h-full">
            <div>
              <Link href="/" className="inline-block font-bold text-3xl tracking-tight text-slate-900 dark:text-white mb-4">
                Fahmi<span className="text-slate-400">Hassan</span>
              </Link>
              <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed max-w-md">
                Architecting accessible, pixel-perfect, and performant web experiences. Based in Jakarta, Indonesia.
              </p>
            </div>
            <div className="mt-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-medium text-slate-600 dark:text-slate-300">Available for new projects</span>
              </div>
            </div>
          </div>

          {/* Navigation Block */}
          <div className="col-span-1 md:col-span-3 lg:col-span-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-slate-400"></span>
              Explore
            </h3>
            <nav className="flex flex-col space-y-3">
              {['Home', 'Projects', 'Skills', 'About', 'Contact'].map((item) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:translate-x-1 transition-all duration-200 font-medium"
                >
                  {item}
                </Link>
              ))}
            </nav>
          </div>

          {/* Connect / Social Block */}
          <div className="col-span-1 md:col-span-3 lg:col-span-4 flex flex-col gap-6">

            {/* Email Card */}
            <a
              href={`mailto:${siteConfig.personalInfo.email}`}
              className="group bg-slate-900 dark:bg-white rounded-3xl p-6 flex items-center justify-between hover:scale-[1.02] transition-transform duration-300"
            >
              <div>
                <p className="text-slate-400 dark:text-slate-500 text-sm font-medium mb-1">Drop me a line</p>
                <p className="text-white dark:text-slate-900 font-bold text-lg md:text-xl break-all">
                  hello.fahmihassan@gmail.com
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/10 dark:bg-slate-200 flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                <svg className="w-5 h-5 text-white dark:text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </a>

            {/* Social Grid */}
            <div className="grid grid-cols-3 gap-4 grow">
              {Object.entries(siteConfig.social).filter(([k]) => k !== 'email').map(([key, url]) => (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-300 h-24"
                  aria-label={key}
                >
                  <i className={`fab fa-${key} text-2xl`}></i>
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
            &copy; {currentYear} M Fahmi Hassan
          </p>
          <div className="flex items-center gap-6">
            <div className="text-slate-500 dark:text-slate-400 text-sm">
              Jakarta, Indonesia <span className="mx-2">•</span> {time} WIB
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
