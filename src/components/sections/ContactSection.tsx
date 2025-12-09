"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import siteConfig from "@/config/siteConfig";

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
    // Simulate generic submission
    setTimeout(() => {
      setSubmitStatus("success");
      setIsSubmitting(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" className="py-32 relative bg-white dark:bg-black">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">

          {/* Left Column: CTA */}
          <div>
            <div className="flex justify-between items-start mb-8">
              <span className="text-blue-500 font-semibold tracking-wider uppercase block mt-1">Contact</span>
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white mb-8 tracking-tight"
            >
              Let's work <br /> <span className="text-slate-400 dark:text-slate-600">together.</span>
            </motion.h2>

            <div className="space-y-8 mt-12">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-xl">
                  📧
                </div>
                <div>
                  <span className="block text-sm text-slate-500 uppercase tracking-wider mb-1">Email</span>
                  <a href={`mailto:${personalInfo.email}`} className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white hover:text-blue-600 transition-colors">
                    {personalInfo.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-xl">
                  📍
                </div>
                <div>
                  <span className="block text-sm text-slate-500 uppercase tracking-wider mb-1">Studio</span>
                  <span className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
                    {personalInfo.location}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Minimal Form */}
          <div className="relative">
            {/* Chapter Number Absolute for Grid layout */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="absolute -top-20 right-0 hidden lg:block text-right"
            >
              <span className="block text-6xl font-bold text-slate-200 dark:text-slate-800">05</span>
              <span className="text-sm font-medium uppercase tracking-widest text-slate-400">Get in Touch</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
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
                  className="w-full py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-lg rounded-xl hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                >
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
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
