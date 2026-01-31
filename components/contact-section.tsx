'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { 
  Mail, 
  Linkedin, 
  Github, 
  Twitter, 
  Send,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  service: string;
  message: string;
}

export function ContactSection() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    service: 'web-development',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const ref = useRef<HTMLDivElement>(null);

  // SAME HERO PARALLAX MAGIC
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const smoothY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const y = useTransform(smoothY, [0, 1], [-200, 200]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus('idle');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to send');

      setStatus('success');
      setFormData({ name: '', email: '', service: 'web-development', message: '' });
      setTimeout(() => setStatus('idle'), 6000);
    } catch (err) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 6000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section ref={ref} id="contact" className="relative bg-[#060608] overflow-hidden">
      {/* FLOATING ORBS — SAME AS HERO */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div
          animate={{ x: [-400, 400], y: [-300, 300] }}
          transition={{ duration: 70, repeat: Infinity, repeatType: "reverse" }}
          className="absolute top-40 -left-96 w-[800px] h-[800px] bg-purple-900/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [400, -400], y: [300, -300] }}
          transition={{ duration: 75, repeat: Infinity, repeatType: "reverse" }}
          className="absolute bottom-40 -right-96 w-[800px] h-[800px] bg-yellow-600/20 rounded-full blur-3xl"
        />
      </div>

      <motion.div style={{ y }} className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-32 lg:py-48">
        {/* HERO-STYLE TITLE */}
        <motion.div
          initial={{ opacity: 0, y: 120 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-40"
        >
          <h2 className="text-7xl md:text-9xl lg:text-[12rem] xl:text-[14rem] font-black leading-[0.8] tracking-tighter">
            LET'S
            <br />
            <span className="bg-gradient-to-r from-yellow-500 via-purple-500 to-yellow-500 bg-clip-text text-transparent animate-gradient-x">
              BUILD
            </span>
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1.4 }}
            className="text-2xl md:text-3xl text-slate-400 mt-16 font-light tracking-wide max-w-5xl mx-auto"
          >
            Your vision deserves to be <span className="text-yellow-500 font-bold">legendary</span>. Let's make it happen.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* LEFT — CONNECT & SOCIALS */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, delay: 0.4 }}
            className="space-y-16"
          >
            {/* EMAIL */}
            <motion.div
              whileHover={{ x: 20 }}
              className="group flex items-center gap-8 p-8 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 hover:border-yellow-500/50 transition-all duration-500"
            >
              <div className="p-6 bg-yellow-500/10 rounded-2xl">
                <Mail className="w-12 h-12 text-yellow-500" />
              </div>
              <div>
                <p className="text-sm text-slate-500 uppercase tracking-wider">Email me directly</p>
                <a href="mailto:hello@vikkymedia.com" className="text-3xl font-black text-white group-hover:text-yellow-500 transition-colors">
                  hello@vikkymedia.com
                </a>
              </div>
            </motion.div>

            {/* SOCIALS */}
            <div>
              <h3 className="text-4xl font-black text-white mb-12">Connect With Me</h3>
              <div className="flex gap-8">
                {[
                  { icon: Github, href: 'https://github.com/vikkymedia', label: 'GitHub' },
                  { icon: Linkedin, href: 'https://linkedin.com/in/vikkymedia', label: 'LinkedIn' },
                  { icon: Twitter, href: 'https://twitter.com/vikkymedia', label: 'Twitter' },
                ].map((social, i) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.15 + 0.6 }}
                      whileHover={{ y: -20, rotate: 360 }}
                      className="p-8 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 hover:border-yellow-500 hover:bg-yellow-500/10 transition-all duration-500"
                    >
                      <Icon className="w-12 h-12 text-white/70 group-hover:text-yellow-500 transition-colors" />
                    </motion.a>
                  );
                })}
              </div>
            </div>

            {/* AVAILABILITY */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="p-10 bg-gradient-to-r from-yellow-500/10 to-purple-500/10 backdrop-blur-xl rounded-3xl border border-white/10"
            >
              <Sparkles className="w-16 h-16 text-yellow-500 mb-6" />
              <p className="text-3xl font-black text-white mb-4">Currently Available</p>
              <p className="text-xl text-slate-300">
                Taking on <span className="text-yellow-500 font-bold">2 major projects</span> and <span className="text-yellow-500 font-bold">mentorship clients</span> in 2025.
              </p>
            </motion.div>
          </motion.div>

          {/* RIGHT — CONTACT FORM */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, delay: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div whileHover={{ y: -5 }}>
                  <label className="text-sm font-bold text-slate-400 tracking-wider">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-3 w-full px-8 py-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 text-white text-lg focus:outline-none focus:border-yellow-500 transition-all duration-300"
                    placeholder="John Doe"
                  />
                </motion.div>

                <motion.div whileHover={{ y: -5 }}>
                  <label className="text-sm font-bold text-slate-400 tracking-wider">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-3 w-full px-8 py-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 text-white text-lg focus:outline-none focus:border-yellow-500 transition-all duration-300"
                    placeholder="john@example.com"
                  />
                </motion.div>
              </div>

              <motion.div whileHover={{ y: -5 }}>
                <label className="text-sm font-bold text-slate-400 tracking-wider">Service Interested In</label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="mt-3 w-full px-8 py-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 text-white text-lg focus:outline-none focus:border-yellow-500 transition-all duration-300"
                >
                  <option value="web-development">Full-Stack Web Development</option>
                  <option value="ui-ux-design">UI/UX & Frontend Mastery</option>
                  <option value="performance">Performance Optimization</option>
                  <option value="mentorship">1-on-1 Mentorship</option>
                  <option value="other">Something Else Legendary</option>
                </select>
              </motion.div>

              <motion.div whileHover={{ y: -5 }}>
                <label className="text-sm font-bold text-slate-400 tracking-wider">Your Vision</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={8}
                  className="mt-3 w-full px-8 py-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 text-white text-lg focus:outline-none focus:border-yellow-500 transition-all duration-300 resize-none"
                  placeholder="Tell me about your project, your goals, your wildest dreams..."
                />
              </motion.div>

              {/* SUCCESS / ERROR */}
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-4 p-6 bg-green-500/10 border border-green-500/30 rounded-2xl"
                >
                  <CheckCircle2 className="w-10 h-10 text-green-400" />
                  <p className="text-xl text-green-300 font-bold">Message sent! I'll reply within 24 hours.</p>
                </motion.div>
              )}

              {/* SUBMIT BUTTON — GOD TIER */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={loading}
                className="w-full py-8 bg-yellow-500 text-black font-black text-3xl rounded-3xl hover:bg-yellow-400 transition-all duration-500 shadow-2xl hover:shadow-yellow-500/50 flex items-center justify-center gap-6 disabled:opacity-50"
              >
                {loading ? 'SENDING...' : 'SEND MESSAGE'}
                <Send className="w-10 h-10" />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </motion.div>

      <style jsx global>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% auto;
          animation: gradient-x 6s ease infinite;
        }
      `}</style>
    </section>
  );
}