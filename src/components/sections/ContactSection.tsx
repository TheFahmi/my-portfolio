"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import siteConfig from "@/config/siteConfig";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const ContactSection = () => {
  const { personalInfo } = siteConfig;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" className="py-32 relative bg-[#F5F1E8] dark:bg-[#2C2416]">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">

          {/* Left Column: CTA */}
          <div>
            <ScrollReveal variant="slideUp" className="flex justify-between items-start mb-8">
              <span className="text-blue-500 font-semibold tracking-wider uppercase block mt-1">Contact</span>
            </ScrollReveal>

            <ScrollReveal
              variant="slideUp"
              delay={0.1}
              className="text-4xl md:text-7xl font-bold text-slate-900 dark:text-white mb-8 tracking-tight"
            >
              Let's work <br /> <span className="text-slate-400 dark:text-slate-600">together.</span>
            </ScrollReveal>

            <div className="space-y-8 mt-12">
              <ScrollReveal variant="slideLeft" delay={0.2} className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-xl">
                  📧
                </div>
                <div>
                  <span className="block text-sm text-slate-500 uppercase tracking-wider mb-1">Email</span>
                  <a href={`mailto:${personalInfo.email}`} className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white hover:text-blue-600 transition-colors">
                    {personalInfo.email}
                  </a>
                </div>
              </ScrollReveal>

              <ScrollReveal variant="slideLeft" delay={0.3} className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-xl">
                  📍
                </div>
                <div>
                  <span className="block text-sm text-slate-500 uppercase tracking-wider mb-1">Studio</span>
                  <span className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
                    {personalInfo.location}
                  </span>
                </div>
              </ScrollReveal>

              <ScrollReveal variant="slideLeft" delay={0.4} className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-xl">
                  🌏
                </div>
                <div>
                  <span className="block text-sm text-slate-500 uppercase tracking-wider mb-1">Socials</span>
                  <div className="flex gap-4 mt-1">
                    {Object.entries(siteConfig.social).map(([key, url]) => {
                      if (key === 'email') return null;
                      return (
                        <a
                          key={key}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-lg font-bold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors capitalize"
                        >
                          {key}
                        </a>
                      );
                    })}
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>

          {/* Right Column: Minimal Form */}
          <div className="relative">
            {/* Chapter Number Absolute for Grid layout */}
            <ScrollReveal
              variant="fade"
              delay={0.5}
              className="absolute -top-20 right-0 hidden lg:block text-right"
            >
              <span className="block text-6xl font-bold text-slate-200 dark:text-slate-800">05</span>
              <span className="text-sm font-medium uppercase tracking-widest text-slate-400">Get in Touch</span>
            </ScrollReveal>

            <ScrollReveal
              variant="slideUp"
              delay={0.2}
              className="bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-12"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-bold text-slate-900 dark:text-white ml-1">NAME</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-6 py-4 rounded-xl bg-white dark:bg-slate-950 border-2 border-transparent focus:border-blue-500 outline-none transition-all placeholder:text-slate-400"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-bold text-slate-900 dark:text-white ml-1">EMAIL</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-6 py-4 rounded-xl bg-white dark:bg-slate-950 border-2 border-transparent focus:border-blue-500 outline-none transition-all placeholder:text-slate-400"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-bold text-slate-900 dark:text-white ml-1">SUBJECT</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-6 py-4 rounded-xl bg-white dark:bg-slate-950 border-2 border-transparent focus:border-blue-500 outline-none transition-all placeholder:text-slate-400"
                    placeholder="Project Inquiry"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-bold text-slate-900 dark:text-white ml-1">MESSAGE</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-6 py-4 rounded-xl bg-white dark:bg-slate-950 border-2 border-transparent focus:border-blue-500 outline-none transition-all resize-none placeholder:text-slate-400"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-lg rounded-xl hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {isSubmitting && (
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  )}
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>

                {submitStatus === "success" && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-green-600 dark:text-green-400 text-center font-bold mt-4"
                  >
                    Message sent successfully! I'll be in touch soon.
                  </motion.p>
                )}
                {submitStatus === "error" && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-600 dark:text-red-400 text-center font-bold mt-4"
                  >
                    Something went wrong. Please try again later.
                  </motion.p>
                )}
              </form>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
